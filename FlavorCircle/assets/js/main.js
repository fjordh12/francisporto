/**
 * FLAVORCIRCLE — Core Interactive Engine
 * Handles Cart Management, Search Autocomplete, Location Switcher, Modals, and Micro-interactions.
 */

// Food database for instant search suggestions & autocomplete
const FC_CATALOG = [
  { name: "Classic Cheese Burger", category: "Burger", price: 25000, page: "burger.html", img: "assets/images/burger.jpeg" },
  { name: "Spicy Jalapeño Burger", category: "Burger", price: 68000, page: "burger.html", img: "assets/images/b1.jpeg" },
  { name: "Mushroom Swiss Burger", category: "Burger", price: 72000, page: "burger.html", img: "assets/images/b2.jpeg" },
  { name: "BBQ Chicken Burger", category: "Burger", price: 39000, page: "burger.html", img: "assets/images/b4.jpg" },
  { name: "Avocado Burger", category: "Burger", price: 81000, page: "burger.html", img: "assets/images/b5.jpeg" },
  { name: "Pepperoni Pizza", category: "Pizza", price: 250000, page: "pizza.html", img: "assets/images/pizza.jpeg" },
  { name: "BBQ Chicken Pizza", category: "Pizza", price: 530000, page: "pizza.html", img: "assets/images/p1.jpg" },
  { name: "Meat Lovers Pizza", category: "Pizza", price: 320000, page: "pizza.html", img: "assets/images/p3.jpg" },
  { name: "Truffle Pizza", category: "Pizza", price: 480000, page: "pizza.html", img: "assets/images/p4.jpeg" },
  { name: "Spicy Ramen", category: "Noodles", price: 60000, page: "noodles.html", img: "assets/images/n1.jpg" },
  { name: "Seafood Udon", category: "Noodles", price: 50000, page: "noodles.html", img: "assets/images/n2.jpg" },
  { name: "Pad Thai Special", category: "Noodles", price: 45000, page: "noodles.html", img: "assets/images/n3.jpg" },
  { name: "Chicken Chow Mein", category: "Noodles", price: 65000, page: "noodles.html", img: "assets/images/n4.jpeg" },
  { name: "Classic Rib Eye Steak", category: "Steak", price: 200000, page: "steak.html", img: "assets/images/st1.jpeg" },
  { name: "Premium T-Bone Steak", category: "Steak", price: 750000, page: "steak.html", img: "assets/images/st3.jpeg" },
  { name: "Wagyu Tenderloin", category: "Steak", price: 1500000, page: "steak.html", img: "assets/images/st2.jpeg" },
  { name: "Luxury Tomahawk Steak", category: "Steak", price: 2000000, page: "steak.html", img: "assets/images/st4.jpeg" },
  { name: "California Roll", category: "Sushi", price: 27000, page: "sushi.html", img: "assets/images/sushi.jpeg" },
  { name: "Spicy Tuna Roll", category: "Sushi", price: 35000, page: "sushi.html", img: "assets/images/s1.jpeg" },
  { name: "Salmon Nigiri", category: "Sushi", price: 40000, page: "sushi.html", img: "assets/images/s2.jpeg" },
  { name: "Ebi Nigiri", category: "Sushi", price: 22000, page: "sushi.html", img: "assets/images/s3.jpeg" },
  { name: "Dragon Roll", category: "Sushi", price: 38000, page: "sushi.html", img: "assets/images/s4.jpg" }
];

// Cart State (stored in localStorage)
let cart = [];

function initCart() {
  try {
    const saved = localStorage.getItem('fc_cart');
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
  updateCartBadge();
  renderCartDrawer();
}

function saveCart() {
  localStorage.setItem('fc_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(item) {
  const existingIndex = cart.findIndex(c => c.name === item.name);
  if (existingIndex > -1) {
    cart[existingIndex].qty += (item.qty || 1);
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      img: item.img || 'assets/images/burger.jpeg',
      category: item.category || 'Food',
      qty: item.qty || 1
    });
  }
  saveCart();
  showToast(`"${item.name}" ditambahkan ke pesanan!`, 'bx-check-circle');
}

function updateCartQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }
}

function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString('id-ID');
}

function updateCartBadge() {
  const count = cart.reduce((total, item) => total + item.qty, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = count;
  });
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderCartDrawer() {
  const listEl = document.getElementById('cartDrawerList');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');
  const totalEl = document.getElementById('cartDrawerTotal');
  const countTitleEl = document.getElementById('cartDrawerCount');

  if (!listEl) return;

  const totalCount = cart.reduce((total, item) => total + item.qty, 0);
  if (countTitleEl) countTitleEl.textContent = `(${totalCount})`;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty-state">
        <i class='bx bx-shopping-bag'></i>
        <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Keranjang Masih Kosong</h4>
        <p style="font-size: 0.85rem;">Pilih hidangan favoritmu dan nikmati hidangan lezat sekarang.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "Rp 0";
    if (totalEl) totalEl.textContent = "Rp 0";
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = cart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='assets/images/burger.jpeg'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatRupiah(item.price)}</div>
        </div>
        <div class="qty-stepper">
          <button class="qty-btn" onclick="updateCartQty(${idx}, -1)" aria-label="Kurang">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${idx}, 1)" aria-label="Tambah">+</button>
        </div>
      </div>
    `;
  }).join('');

  const deliveryFee = 8000;
  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (totalEl) totalEl.textContent = formatRupiah(subtotal + deliveryFee);
}

// Proceed to payment from drawer
function goToCheckout() {
  if (cart.length === 0) {
    showToast("Keranjang kosong. Pilih makanan terlebih dahulu!", "bx-info-circle");
    return;
  }
  window.location.href = "payment.html";
}

// Toast notification helper
function showToast(message, icon = 'bx-check') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class='bx ${icon}' style="font-size: 1.25rem; color: #ff9d76;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Location Modal Switcher
function openLocationModal() {
  const modal = document.getElementById('locationModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLocationModal() {
  const modal = document.getElementById('locationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function selectLocation(locName) {
  localStorage.setItem('fc_location', locName);
  const locDisplays = document.querySelectorAll('.current-location-text');
  locDisplays.forEach(el => el.textContent = locName);
  closeLocationModal();
  showToast(`Lokasi diantar ke: ${locName}`, 'bx-map');
}

// Search autocomplete
function initSearch() {
  const input = document.getElementById('heroSearchInput');
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    const matches = FC_CATALOG.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <ul>
          <li style="color: var(--text-muted); cursor: default;">Tidak ada hidangan yang cocok dengan "${query}"</li>
        </ul>
      `;
    } else {
      dropdown.innerHTML = `
        <ul>
          ${matches.map(m => `
            <li onclick="window.location.href='${m.page}'">
              <div class="search-result-name">
                <i class='bx bx-dish' style="color: var(--primary);"></i>
                <span>${m.name}</span>
              </div>
              <span class="search-result-tag">${m.category} • ${formatRupiah(m.price)}</span>
            </li>
          `).join('')}
        </ul>
      `;
    }
    dropdown.classList.add('active');
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Search button click
  const searchBtn = document.getElementById('heroSearchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = input.value.trim().toLowerCase();
      if (!val) {
        showToast("Ketik nama makanan atau kategori untuk mencari!", "bx-search");
        return;
      }
      if (val.includes("burger")) window.location.href = "burger.html";
      else if (val.includes("pizza")) window.location.href = "pizza.html";
      else if (val.includes("sushi")) window.location.href = "sushi.html";
      else if (val.includes("steak") || val.includes("daging")) window.location.href = "steak.html";
      else if (val.includes("noodle") || val.includes("mie") || val.includes("ramen")) window.location.href = "noodles.html";
      else if (val.includes("resto") || val.includes("restoran")) window.location.href = "restaurant.html";
      else {
        // Find best match
        const found = FC_CATALOG.find(i => i.name.toLowerCase().includes(val));
        if (found) {
          window.location.href = found.page;
        } else {
          showToast(`Pencarian untuk "${input.value}" tidak ditemukan. Mencoba rekomendasi terdekat.`, "bx-info-circle");
          setTimeout(() => { window.location.href = "burger.html"; }, 800);
        }
      }
    });
  }
}

// Navbar scroll spy
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Newsletter subscription handler
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value) {
    showToast("Terima kasih! Kamu telah berlangganan promo mingguan FlavorCircle.", "bx-envelope");
    input.value = "";
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initSearch();

  // Load saved location
  const savedLoc = localStorage.getItem('fc_location') || "Binus University, Syahdan (Kemanggisan)";
  const locDisplays = document.querySelectorAll('.current-location-text');
  locDisplays.forEach(el => el.textContent = savedLoc);

  // Cart Drawer Triggers
  const cartTriggers = document.querySelectorAll('.open-cart-trigger');
  cartTriggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    openCartDrawer();
  }));

  const cartCloses = document.querySelectorAll('.close-cart-trigger');
  cartCloses.forEach(c => c.addEventListener('click', closeCartDrawer));

  // Location Modal Triggers
  const locTriggers = document.querySelectorAll('.open-loc-modal');
  locTriggers.forEach(t => t.addEventListener('click', openLocationModal));

  const locCloses = document.querySelectorAll('.close-loc-modal');
  locCloses.forEach(c => c.addEventListener('click', closeLocationModal));

  // Newsletter forms
  const newsForms = document.querySelectorAll('.newsletter-form');
  newsForms.forEach(f => f.addEventListener('submit', handleNewsletter));
});
