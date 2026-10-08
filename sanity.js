// =========================================================
// ======= SANITY CONFIG ===================================
// =========================================================
const SANITY_PROJECT_ID = 'la5zc8cr';
const SANITY_DATASET = 'production';
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

function sanityImageUrl(imageField, width = 800){
  if(!imageField?.asset?._ref) return '';
  const ref = imageField.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}?w=${width}`;
}

async function sanityFetch(query){
  const res = await fetch(`${SANITY_URL}?query=${encodeURIComponent(query)}`);
  const { result } = await res.json();
  return result;
}

// =========================================================
// ===== LOAD SITE SETTINGS (navbar + footer) ==============
// =========================================================
async function loadSiteSettings(){
  const settings = await sanityFetch(`*[_type == "siteSettings"][0]`);
  if(!settings) return;
  document.querySelectorAll('.brand-name').forEach(el => el.textContent = settings.storeName);
  // add footer fields here once you're ready, e.g.:
  // const footerEmail = document.querySelector('.footer-contact li:nth-child(2)');
  // if(footerEmail) footerEmail.textContent = settings.footerEmail;
}


// =================================================
// ========= Hero Section Schema Code ==============
// =================================================
async function loadHero(){
  const hero = await sanityFetch(`*[_type == "hero"][0]`);
  if(!hero) return;

  // Product image — show real photo if uploaded, otherwise keep the SVG placeholder
  const productImg = document.querySelector('.hero-product-img');
  const placeholderSvg = document.querySelector('.placeholder-art');
  if(hero.heroProductImage?.asset){
    const imgUrl = sanityImageUrl(hero.heroProductImage, 600);
    if(productImg && imgUrl){
      productImg.src = imgUrl;
      productImg.alt = hero.headlineLine1 || 'Featured product';
      productImg.style.display = 'block';
      if(placeholderSvg) placeholderSvg.style.display = 'none';
    }
  }

  if(hero.marqueeItems?.length){
    const track = document.querySelector('.marquee-track');
    if(track){
      const repeated = Array(3).fill(hero.marqueeItems).flat();
      track.innerHTML = repeated.map(text => `<span>${text}</span>`).join('');
    }
  }

  const eyebrowEl = document.querySelector('.eyebrow');
  if(eyebrowEl && hero.eyebrow) eyebrowEl.textContent = hero.eyebrow;

  const headlineEl = document.querySelector('.headline');
  if(headlineEl && (hero.headlineLine1 || hero.headlineAccent || hero.headlineOutline)){
    headlineEl.innerHTML = `
      ${hero.headlineLine1 || ''}<br>
      <span class="accent">${hero.headlineAccent || ''}</span><br>
      <span class="outline">${hero.headlineOutline || ''}</span>
    `;
  }

  const subEl = document.querySelector('.sub');
  if(subEl && hero.subtext) subEl.textContent = hero.subtext;

  const ctaBtn = document.querySelector('.cta-row .btn-primary');
  if(ctaBtn && hero.ctaLabel) ctaBtn.childNodes[0].textContent = hero.ctaLabel + ' ';

  const tags = document.querySelectorAll('.tag');
  if(tags[0]){
    const label = tags[0].querySelector('.tag-label');
    const price = tags[0].querySelector('.tag-price');
    if(label && hero.tag1Label) label.textContent = hero.tag1Label;
    if(price && (hero.tag1WasPrice || hero.tag1Price)){
      price.innerHTML = `<span class="was">${hero.tag1WasPrice || ''}</span>${hero.tag1Price || ''}`;
    }
  }
  if(tags[1]){
    const label = tags[1].querySelector('.tag-label');
    const price = tags[1].querySelector('.tag-price');
    if(label && hero.tag2Label) label.textContent = hero.tag2Label;
    if(price && hero.tag2Price) price.textContent = hero.tag2Price;
  }

  const stockPill = document.querySelector('.stock-pill');
  if(stockPill && hero.stockPillText){
    stockPill.innerHTML = `<span class="dot"></span> ${hero.stockPillText}`;
  }
}


// =========================================================
// === Currency Selection Logic ============================
// =========================================================
window.SITE_CURRENCY = 'USD';

async function loadCurrency(){
  const settings = await sanityFetch(`*[_type == "siteSettings"][0]{currencyCode}`);
  if(settings?.currencyCode) window.SITE_CURRENCY = settings.currencyCode;
}

function formatPrice(amount){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: window.SITE_CURRENCY || 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}


// =========================================================
// === FETCH PRODUCTS BY SECTION ===========================
// =========================================================
async function loadProducts(sectionKey){
  const products = await sanityFetch(
    `*[_type == "product" && "${sectionKey}" in section]{
      "id": _id,
      name,
      price,
      desc,
      stockStatus,
      image
    }`
  );

  return (products || []).map(p => ({
    ...p,
    image: sanityImageUrl(p.image)
  }));
}


// =========================================================
// ===== Product Rendering Logic Fetching From Sanity ======
// =========================================================
async function loadAndRenderProducts(){
  const featuredGrid = document.querySelector('#products-section .card-grid');
  const offerGrid = document.querySelector('#offer-section .card-grid');

  // Skip entirely if this page has no product grids (e.g. cart.html, checkout.html)
  if(!featuredGrid && !offerGrid) return;

  if(typeof renderProductCards !== 'function'){
    console.warn('renderProductCards() not available on this page — skipping product render.');
    return;
  }

  const featuredItems = await loadProducts('products');
  const offerItems = await loadProducts('offers');

  window.featuredProducts = [...featuredItems, ...offerItems];

  if(featuredGrid) renderProductCards(featuredItems, featuredGrid);
  if(offerGrid) renderProductCards(offerItems, offerGrid);

  if(typeof syncAddToCartButtons === 'function') syncAddToCartButtons();
}


// =========================================================
// ===== Footer Schema Code ================================
// =========================================================
async function loadFooter(){
  const footer = await sanityFetch(`*[_type == "footer"][0]`);
  if(!footer) return;

  const footerDesc = document.querySelector('.footer-brand p');
  if(footerDesc) footerDesc.textContent = footer.footerDescription;

  const contactItems = document.querySelectorAll('.footer-contact li');
  if(contactItems[0]) contactItems[0].textContent = footer.address;
  if(contactItems[1]) contactItems[1].textContent = footer.website;
  if(contactItems[2]) contactItems[2].textContent = footer.phone;

  const socialLinks = document.querySelectorAll('.footer-social a');
  if(socialLinks[0] && footer.instagramUrl) socialLinks[0].href = footer.instagramUrl;
  if(socialLinks[1] && footer.facebookUrl) socialLinks[1].href = footer.facebookUrl;
  if(socialLinks[2] && footer.twitterUrl) socialLinks[2].href = footer.twitterUrl;

  const copyright = document.querySelector('.footer-bottom p');
  if(copyright && footer.copyrightText) copyright.textContent = footer.copyrightText;
}

// =========================================================
// FOOTER LOGO — driven by storeName from siteSettings
// =========================================================
async function loadFooterLogo(){
  const settings = await sanityFetch(`*[_type == "siteSettings"][0]{storeName}`);
  if(!settings?.storeName) return;

  const logo = document.querySelector('.footer-brand .logo');
  if(!logo) return;

  const words = settings.storeName.trim().split(' ');
  const last = words.pop();
  logo.innerHTML = words.length
    ? `${words.join(' ')} <span>${last}</span>`
    : `<span>${last}</span>`;
}

// =================================================
// ========= Loaders ===================
// =================================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadCurrency();
  loadSiteSettings();
  loadHero();
  loadFooter();
  loadFooterLogo();
  loadAndRenderProducts();
});
