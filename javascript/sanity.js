// =========================================================
// SANITY CONFIG
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
// LOAD SITE SETTINGS (navbar + footer)
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
  const hero = await sanityFetch(`*[_type == "heroContent"][0]`);
  if(!hero) return;

  document.querySelector('.eyebrow').textContent = hero.eyebrow;

  document.querySelector('.headline').innerHTML = `
    ${hero.headlineLine1}<br>
    <span class="accent">${hero.headlineAccent}</span><br>
    <span class="outline">${hero.headlineOutline}</span>
  `;

  document.querySelector('.sub').textContent = hero.subtext;

  const ctaBtn = document.querySelector('.cta-row .btn-primary');
  if(ctaBtn){
    // only replace the text node, keep the SVG arrow icon intact
    ctaBtn.childNodes[0].textContent = hero.ctaLabel + ' ';
  }
}

// =========================================================
// ========= Marquee Schema Code ===========================
// =========================================================
async function loadMarquee(){
  const settings = await sanityFetch(`*[_type == "siteSettings"][0]{marqueeItems}`);
  const items = settings?.marqueeItems;
  if(!items || items.length === 0) return;

  const track = document.querySelector('.marquee-track');
  if(!track) return;

  const repeated = Array(3).fill(items).flat();
  track.innerHTML = repeated.map(text => `<span>${text}</span>`).join('');
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
document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  loadMarquee();
  loadHero();
  loadFooter();
  loadFooterLogo();
});
