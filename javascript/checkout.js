// =========================================================
// CHECKOUT — order summary + form validation
// Payment processing itself needs a backend (Phase 3) —
// this collects and validates everything up to that point.
// =========================================================

let selectedPaymentMethod = null;

async function loadPaymentMethods(){
  const settings = await sanityFetch(`*[_type == "paymentSettings"][0]`);
  const container = document.getElementById('paymentMethods');
  if(!container) return;

  const methods = [];
  if(settings?.enableStripe) methods.push({ id: 'stripe', label: 'Card (Stripe)' });
  if(settings?.enablePaypal) methods.push({ id: 'paypal', label: 'PayPal' });

  if(methods.length === 0){
    container.innerHTML = `<p class="payment-unavailable">No payment methods are set up yet. Contact the store to complete your order.</p>`;
    return;
  }

  container.innerHTML = methods.map((m, i) => `
    <label class="payment-method" data-method="${m.id}">
      <input type="radio" name="paymentMethod" value="${m.id}" ${i === 0 ? '' : ''}>
      <span class="payment-method-label">${m.label}</span>
      <span class="payment-method-note">Secure checkout</span>
    </label>
  `).join('');

  container.querySelectorAll('.payment-method').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.payment-method').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      el.querySelector('input[type="radio"]').checked = true;
      selectedPaymentMethod = el.dataset.method;
      clearFieldError('paymentMethod');
    });
  });
}

function renderCheckoutSummary(){
  const cart = getCart();
  const summaryEl = document.getElementById('checkoutSummary');
  if(!summaryEl) return;

  if(cart.length === 0){
    summaryEl.innerHTML = `<p class="checkout-summary-label">YOUR BAG IS EMPTY</p><a href="../html/index.html" class="btn-place-order" style="text-decoration:none;">Continue Shopping</a>`;
    document.getElementById('checkoutForm').style.display = 'none';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  summaryEl.innerHTML = `
    <p class="checkout-summary-label">ORDER SUMMARY</p>
    ${cart.map(item => `
      <div class="summary-item">
        <img class="summary-item-thumb" src="${item.image}" alt="${item.name}">
        <div class="summary-item-info">
          <p class="summary-item-name">${item.name}</p>
          <p class="summary-item-qty">QTY ${item.qty}</p>
        </div>
        <p class="summary-item-price">${formatPrice(item.price * item.qty)}</p>
      </div>
    `).join('')}
    <div class="checkout-divider"></div>
    <div class="order-row"><span>SUBTOTAL</span><span>${formatPrice(subtotal)}</span></div>
    <div class="order-row"><span>SHIPPING</span><span>FREE</span></div>
    <div class="order-row order-total"><span>TOTAL</span><span>${formatPrice(subtotal)}</span></div>
    <button type="submit" class="btn-place-order" id="placeOrderBtn">
      Place Order
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
}

// =========================================================
// VALIDATION
// =========================================================
function showFieldError(name){
  const errorEl = document.querySelector(`[data-error-for="${name}"]`);
  const inputEl = document.getElementById(name);
  if(errorEl) errorEl.classList.add('visible');
  if(inputEl) inputEl.classList.add('invalid');
}

function clearFieldError(name){
  const errorEl = document.querySelector(`[data-error-for="${name}"]`);
  const inputEl = document.getElementById(name);
  if(errorEl) errorEl.classList.remove('visible');
  if(inputEl) inputEl.classList.remove('invalid');
}

function validateForm(){
  let valid = true;
  const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country'];

  requiredFields.forEach(name => {
    const el = document.getElementById(name);
    clearFieldError(name);
    if(!el.value.trim()){
      showFieldError(name);
      valid = false;
    }
  });

  const email = document.getElementById('email');
  if(email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
    showFieldError('email');
    valid = false;
  }

  if(!selectedPaymentMethod){
    showFieldError('paymentMethod');
    valid = false;
  } else {
    clearFieldError('paymentMethod');
  }

  return valid;
}

// =========================================================
// SUBMIT
// =========================================================
document.addEventListener('submit', (e) => {
  if(e.target.id !== 'checkoutForm') return;
  e.preventDefault();

  if(!validateForm()) return;

  const formData = {
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    address: document.getElementById('address').value.trim(),
    city: document.getElementById('city').value.trim(),
    postalCode: document.getElementById('postalCode').value.trim(),
    country: document.getElementById('country').value.trim(),
    paymentMethod: selectedPaymentMethod,
    cart: getCart()
  };

  // TODO Phase 3: send formData to a serverless function that creates
  // a Stripe Checkout Session or PayPal order using SECRET keys server-side,
  // then redirect the customer to the returned payment URL.
  console.log('Ready to send to backend:', formData);
  alert('Form valid — this is where we\'ll connect to Stripe/PayPal once the backend is set up.');
});

// =========================================================
// INIT
// =========================================================
document.addEventListener('DOMContentLoaded', async () => {
  if(typeof loadCurrency === 'function') await loadCurrency();
  renderCheckoutSummary();
  await loadPaymentMethods();
});