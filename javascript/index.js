// =========================================================
// Hamburger menu
// =========================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  navbar.classList.toggle('menu-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// close menu when a link is tapped (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    navbar.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// =========================================================
// PRODUCT DATA
// Add, remove, or edit entries here — cards render automatically.
// Each product needs a unique id (used for the card and the cart).
// =========================================================



// =========================================================
// CARD RENDERER
// =========================================================
function renderProductCards(items, container){
  if(!container) return;
  container.innerHTML = items.map(item => `
    <div class="product-card" data-product-id="${item.id}">
      <div class="image-zone">
        <img class="image-bg" src="${item.image}" alt="">
        <img class="image-fg" src="${item.image}" alt="${item.name}">
      </div>
      <div class="blur-transition"></div>
      <div class="info-panel">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-desc">${item.desc}</p>
        <p class="stock-status">${item.stockStatus || 'In stock'}</p>
        <div class="card-actions">
          <span class="price-pill">${formatPrice(item.price)}</span>
          <button class="add-to-cart" data-product-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}


// =========================================================
// Sync "Add to Cart" buttons with current cart state
// Any button for a product already in the cart shows "Added ✓"
// and stays that way until the item is removed from the cart.
// =========================================================
function syncAddToCartButtons(){
  if(typeof getCart !== 'function') return;
  const cart = getCart();
  const cartIds = new Set(cart.map(item => item.id));

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    const id = btn.dataset.productId;
    if(cartIds.has(id)){
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
    } else {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }
  });
}

// =========================================================
// Add to Cart — wired to the real cart.js
// =========================================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if(!btn) return;

  e.stopPropagation();

  const productId = btn.dataset.productId;
  const product = window.featuredProducts.find(item => item.id === productId);
  if(!product) return;

  if(typeof addToCart !== 'function'){
    console.error('addToCart() is not defined — make sure cart.js is loaded before index.js.');
    return;
  }

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  });

  syncAddToCartButtons();
});


// =========================================================
// Search icon functionality
// =========================================================
const searchBox = document.getElementById('searchBox');
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

searchToggle.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.innerWidth <= 590) {
    const isExpanded = searchBox.classList.toggle('expanded');
    searchToggle.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      searchInput.focus();
    }
  }
});

// X button: clear text, and if empty, close the search box
searchClear.addEventListener('click', (e) => {
  e.stopPropagation(); // don't let the outside-click listener fire first
  if (searchInput.value.length > 0) {
    searchInput.value = '';
    searchInput.focus();
    searchClear.classList.remove('visible');
  } else if (window.innerWidth <= 590) {
    searchBox.classList.remove('expanded');
    searchToggle.setAttribute('aria-expanded', false);
  }
});

// show/hide the X based on whether there's text typed
searchInput.addEventListener('input', () => {
  searchClear.classList.toggle('visible', searchInput.value.length > 0);
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 590 && !searchBox.contains(e.target)) {
    searchBox.classList.remove('expanded');
    searchToggle.setAttribute('aria-expanded', false);
  }
});

// =========================================================
// Live search — filters the actual product cards in both
// sections in real time, eliminating non-matches as you type
// =========================================================
function filterProductCards(query){
  const q = query.trim().toLowerCase();
  const allCards = document.querySelectorAll('.product-card');

  let anyVisible = false;

  allCards.forEach(card => {
    const productId = card.dataset.productId;
    const product = window.featuredProducts.find(item => item.id === productId);
    if(!product){
      card.style.display = '';
      return;
    }

    const matches = q.length === 0 ||
      product.name.toLowerCase().includes(q);

    card.style.display = matches ? '' : 'none';
    if(matches) anyVisible = true;
  });

  // toggle a per-section "no results" message
  document.querySelectorAll('.card-grid').forEach(grid => {
    const visibleInGrid = [...grid.querySelectorAll('.product-card')]
      .some(card => card.style.display !== 'none');

    let msg = grid.querySelector('.no-results-msg');
    if(!visibleInGrid && q.length > 0){
      if(!msg){
        msg = document.createElement('p');
        msg.className = 'no-results-msg';
        msg.textContent = 'No products match your search.';
        grid.appendChild(msg);
      }
    } else if(msg){
      msg.remove();
    }
  });
}

searchInput.addEventListener('input', () => {
  searchClear.classList.toggle('visible', searchInput.value.length > 0);
  filterProductCards(searchInput.value);
});

searchClear.addEventListener('click', () => {
  filterProductCards('');
});


// =========================================================
// Subscribe form
// TODO: replace the fetch() call with your real email
// marketing provider's API (Mailchimp, Klaviyo, etc.)
// =========================================================
const subscribeForm = document.getElementById('subscribeForm');
const subscribeMsg = document.getElementById('subscribeMsg');

subscribeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('subscribeEmail').value.trim();

  if (!email) return;

  const submitBtn = subscribeForm.querySelector('.btn-subscribe');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Joining…';

  try {
    // TODO: swap for your actual endpoint, e.g.:
    // await fetch('/api/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });

    console.log(`Subscribed: ${email}`);

    subscribeMsg.textContent = "You're on the list. Watch your inbox.";
    subscribeMsg.classList.remove('error');
    subscribeMsg.hidden = false;
    subscribeForm.reset();
  } catch (err) {
    subscribeMsg.textContent = 'Something went wrong — try again.';
    subscribeMsg.classList.add('error');
    subscribeMsg.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});


// =========================================================
// ==== Email Collection Logic =============================
// =========================================================
const form = document.getElementById('subscribeForm');
const emailInput = document.getElementById('subscribeEmail');
const messageEl = document.getElementById('subscribeMsg');
const button = form.querySelector('.btn-subscribe');
const btnLabel = button.childNodes[0]; // the "Subscribe" text node before the svg

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  if (!email) return;

  button.disabled = true;
  btnLabel.textContent = 'Subscribing...';
  messageEl.hidden = true;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Something went wrong');

    messageEl.textContent = "You're in! Check your inbox to confirm.";
    messageEl.className = 'subscribe-msg success';
    messageEl.hidden = false;
    form.reset();
  } catch (err) {
    messageEl.textContent = err.message || 'Failed to subscribe. Try again.';
    messageEl.className = 'subscribe-msg error';
    messageEl.hidden = false;
  } finally {
    button.disabled = false;
    btnLabel.textContent = 'Subscribe';
  }
});