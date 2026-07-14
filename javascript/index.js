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


