/* ========== CART STORAGE HELPERS ========== */
const CART_KEY = 'myStoreCart';

function getCart(){
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// product: { id, name, price, image, size (optional) }
function addToCart(product){
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function updateQty(id, delta){
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  if(!item) return;

  item.qty += delta;
  if(item.qty <= 0){
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* ========== NAV CART COUNT (updates on every page) ========== */
function updateCartCount(){
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartBadgeEl = document.getElementById('cartBadge');
  if(cartBadgeEl){
    cartBadgeEl.textContent = totalItems;
    cartBadgeEl.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

/* ========== CART PAGE RENDERING (cart.html only) ========== */
// ==========================================================
// CURRENCY
// Change this one value to switch currency everywhere prices
// are displayed — every card pulls from this single constant.
// ==========================================================
const CURRENCY_SYMBOL = 'KES ';

function formatKSh(amount){
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US')}`; /* Add your country's internationally used initials to format numbers as they do in your country.*/
}

function renderCart(){
  const cartItemsEl = document.getElementById('cartItems');
  const cartLayoutEl = document.getElementById('cartLayout');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const mobileBarEl = document.getElementById('mobileCheckoutBar');

  if(!cartItemsEl) return; // not on cart.html

  const cart = getCart();

  if(cart.length === 0){
    if(cartLayoutEl) cartLayoutEl.hidden = true;
    if(cartEmptyEl) cartEmptyEl.hidden = false;
    if(mobileBarEl) mobileBarEl.style.display = 'none';
    return;
  }

  if(cartLayoutEl) cartLayoutEl.hidden = false;
  if(cartEmptyEl) cartEmptyEl.hidden = true;
  if(mobileBarEl) mobileBarEl.style.display = 'flex';

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-item-id="${item.id}">
      <img class="cart-item-thumb" src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.size ? `SIZE ${item.size}` : 'NO SIZE'}</p>
        <div class="qty-stepper">
          <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
          <span class="qty-value" data-qty="${item.qty}">${item.qty}</span>
          <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-side">
        <button class="remove-btn" data-action="remove" aria-label="Remove item">&times;</button>
        <p class="cart-item-price">${formatKSh(item.price)}</p>
      </div>
    </div>
  `).join('');

  updateSummary(cart);
}

function updateSummary(cart){
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal; // shipping is free, no VAT line in this template

  const subtotalText = formatKSh(subtotal);
  const totalText = formatKSh(total);

  const summarySubtotalEl = document.getElementById('summarySubtotal');
  if(summarySubtotalEl) summarySubtotalEl.textContent = subtotalText;

  const summaryShippingEl = document.getElementById('summaryShipping');
  if(summaryShippingEl) summaryShippingEl.textContent = 'FREE';

  const summaryTotalEl = document.getElementById('summaryTotal');
  if(summaryTotalEl) summaryTotalEl.textContent = totalText;

  const mobileSummaryTotalEl = document.getElementById('mobileSummaryTotal');
  if(mobileSummaryTotalEl) mobileSummaryTotalEl.textContent = totalText;
}

/* ========== EVENT DELEGATION FOR CART PAGE CONTROLS ========== */
document.addEventListener('click', (e) => {
  const target = e.target;

  const qtyBtn = target.closest('.qty-btn');
  if(qtyBtn){
    const itemEl = qtyBtn.closest('.cart-item');
    if(!itemEl) return;
    const id = itemEl.dataset.itemId;
    const action = qtyBtn.dataset.action;
    updateQty(id, action === 'increase' ? 1 : -1);
    return;
  }

  const removeBtn = target.closest('.remove-btn');
  if(removeBtn){
    const itemEl = removeBtn.closest('.cart-item');
    if(!itemEl) return;
    removeFromCart(itemEl.dataset.itemId);
  }
});

/* ========== CHECKOUT BUTTONS (desktop + mobile) ========== */
function goToCheckout(){
  const cart = getCart();
  if(cart.length === 0) return;
  // Redirect to your checkout flow here
  alert('Proceeding to checkout — hook this up to your actual checkout page.');
}

const checkoutBtn = document.getElementById('checkoutBtn');
if(checkoutBtn){
  checkoutBtn.addEventListener('click', goToCheckout);
}

const mobileCheckoutBtn = document.getElementById('mobileCheckoutBtn');
if(mobileCheckoutBtn){
  mobileCheckoutBtn.addEventListener('click', goToCheckout);
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});