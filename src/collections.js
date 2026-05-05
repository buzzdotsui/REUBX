import './style.css';
import './collections.css';
import { PRODUCTS } from './products.js';

// ── Read URL params (e.g. ?cat=sneakers) ──
const urlParams = new URLSearchParams(window.location.search);
const paramCat = urlParams.get('cat');

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }));
}

// ── WhatsApp helper ──
const WA_NUMBER = '2348104699214';

// ── State ──
const VALID_CATS = ['sneakers','jewelry','unisex','underwear'];
let currentCat = (paramCat && VALID_CATS.includes(paramCat)) ? paramCat : 'all';
let currentSearch = '';
let currentSort = 'default';
let currentPrice = 'all';

// ── DOM refs ──
const grid = document.getElementById('shopGrid');
const noResults = document.getElementById('noResults');
const countNum = document.getElementById('countNum');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const filterTabs = document.getElementById('filterTabs');
const sortSelect = document.getElementById('sortSelect');
const priceSelect = document.getElementById('priceSelect');
const resetBtn = document.getElementById('resetBtn');

// ── Filter footer links ──
document.querySelectorAll('[data-filter]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    currentCat = a.dataset.filter;
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === currentCat);
    });
    renderProducts();
    document.getElementById('searchFilterBar').scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Filter Tabs ──
filterTabs.addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  currentCat = tab.dataset.cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t === tab));
  renderProducts();
});

// ── Search ──
searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim().toLowerCase();
  searchClear.style.display = currentSearch ? '' : 'none';
  renderProducts();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  searchClear.style.display = 'none';
  renderProducts();
  searchInput.focus();
});

// ── Sort ──
sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderProducts();
});

// ── Price ──
priceSelect.addEventListener('change', () => {
  currentPrice = priceSelect.value;
  renderProducts();
});

// ── Reset ──
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    currentCat = 'all';
    currentSearch = '';
    currentSort = 'default';
    currentPrice = 'all';
    searchInput.value = '';
    searchClear.style.display = 'none';
    sortSelect.value = 'default';
    priceSelect.value = 'all';
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
    renderProducts();
  });
}

// ── Cat labels ──
const CAT_LABELS = { sneakers: 'Sneakers', jewelry: 'Jewelry', unisex: 'Unisex Wears', underwear: 'Underwear' };

// ── Render ──
function renderProducts() {
  let list = [...PRODUCTS];

  if (currentCat !== 'all') list = list.filter(p => p.cat === currentCat);

  if (currentSearch) list = list.filter(p =>
    p.name.toLowerCase().includes(currentSearch) ||
    p.desc.toLowerCase().includes(currentSearch) ||
    CAT_LABELS[p.cat]?.toLowerCase().includes(currentSearch)
  );

  if (currentPrice !== 'all') {
    const [min, max] = currentPrice.split('-').map(Number);
    list = list.filter(p => p.price >= min && p.price <= max);
  }

  if (currentSort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));

  countNum.textContent = list.length;
  grid.innerHTML = '';

  if (!list.length) {
    noResults.style.display = '';
    return;
  }
  noResults.style.display = 'none';

  list.forEach((p, i) => {
    // WhatsApp auto-order message with product name, description and price
    const orderMsg = `Hi, I want to order the ${p.name}\n${p.desc}\n₦${p.price.toLocaleString()}`;
    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderMsg)}`;

    const badgeClass = p.badge === 'New' ? 'badge-new' : p.badge === 'Hot' ? 'badge-hot' : p.badge === 'Sale' ? 'badge-sale' : '';
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.style.animationDelay = (i * 40) + 'ms';
    card.id = `product-${p.id}`;
    card.innerHTML = `
      ${p.badge ? `<div class="shop-card-badge ${badgeClass}">${p.badge}</div>` : ''}
      <button class="shop-card-wish" aria-label="Wishlist" title="Save for later">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <div class="shop-card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400/111/D4AF37?text=REUBX'" />
      </div>
      <div class="shop-card-body">
        <p class="shop-card-cat">${CAT_LABELS[p.cat]}</p>
        <h3 class="shop-card-name">${p.name}</h3>
        <p class="shop-card-desc">${p.desc}</p>
        <div class="shop-card-footer">
          <span class="shop-card-price">₦${p.price.toLocaleString()}</span>
          <a href="${waLink}" class="shop-card-order" target="_blank" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.498-.794-6.222-2.126l-.436-.345-3.2 1.073 1.073-3.2-.345-.436A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Order
          </a>
        </div>
      </div>`;
    card.querySelector('.shop-card-wish').addEventListener('click', function() {
      this.classList.toggle('wished');
    });
    grid.appendChild(card);
  });
}
// ── Init: activate tab from URL param & first render ──
document.querySelectorAll('.filter-tab').forEach(t => {
  t.classList.toggle('active', t.dataset.cat === currentCat);
});
renderProducts();
