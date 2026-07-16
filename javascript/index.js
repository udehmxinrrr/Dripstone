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



// example: hook this up to your existing cart.js render function
function updateCartBadge(count) {
  document.getElementById('cartBadge').textContent = count;
}
// updateCartBadge(getCartCount()); // call with your real cart.js logic




// Wire up "Add to Cart" buttons. Swap the console.log line for
// your real cart.js function (e.g. addToCart(name, price)).
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger any click handler on the card itself

    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    // TODO: replace with your existing cart.js logic, e.g.:
    // addToCart({ name, price, qty: 1 });

    console.log(`Added to cart: ${name} - KES ${price}`);

    // quick visual confirmation
    const originalText = btn.textContent;
    btn.textContent = 'Added ✓';
    setTimeout(() => { btn.textContent = originalText; }, 1200);
  });
});



// Search icon functionality //
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
// Hamburger menu ============================
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
// ==========================================================
const featuredProducts = [
  {
    id: 'heritage-leather-backpack',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=800&fit=crop',
    name: 'Heritage Leather Backpack',
    price: 8500,
    desc: 'Full-grain leather, brass hardware, and a padded 15" laptop sleeve built to age well.',
    stockStatus: 'In stock'
  },
  {
    id: 'runner-low-sneakers',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=500&fit=crop',
    name: 'Runner Low Sneakers',
    price: 4200,
    desc: 'Lightweight knit upper with a responsive foam sole, made for all-day wear.',
    stockStatus: 'In stock'
  },
  {
    id: 'classic-steel-watch',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&h=800&fit=crop',
    name: 'Classic Steel Watch',
    price: 12900,
    desc: 'Stainless steel case, sapphire crystal, and a hand-stitched leather strap.',
    stockStatus: '3 left'
  }
];

// ==========================================================
// CARD RENDERER
// Renders the .product-card template. CURRENCY_SYMBOL/formatKSh
// come from cart.js (loaded before this file).
// ==========================================================
function formatPrice(amount){
  return typeof formatKSh === 'function'
    ? formatKSh(amount)
    : `${amount.toLocaleString('en-US')}`;
}

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

const featuredGrid = document.querySelector('#products-section .card-grid');
renderProductCards(featuredProducts, featuredGrid);

// =========================================================
// Add to Cart — wired to the real cart.js
// (requires cart.js to be loaded BEFORE this script)
// Uses event delegation so it keeps working if cards are
// re-rendered later (e.g. search/filter results).
// =========================================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if(!btn) return;

  e.stopPropagation(); // don't trigger any click handler on the card itself

  const productId = btn.dataset.productId;
  const product = featuredProducts.find(item => item.id === productId);
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

  // quick visual confirmation
  const originalText = btn.textContent;
  btn.textContent = 'Added ✓';
  setTimeout(() => { btn.textContent = originalText; }, 1200);
});

// =========================================================
// Init cart badge on load (uses cart.js's updateCartCount)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  if(typeof updateCartCount === 'function'){
    updateCartCount();
  }
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

