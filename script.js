const app = document.getElementById('app');
const money = n => new Intl.NumberFormat('en-ET', { maximumFractionDigits: 2 }).format(Number(n)) + ' ETB';

const fallbackCategoryImages = {
  'Breakfast': 'breakfast.svg',
  'Burgers': 'burgers.svg',
  'Pizza': 'pizza.svg',
  'Juices (Smoothie)': 'juices.svg',
  'Hot Drinks': 'hot-drinks.svg',
  'Soft Drinks': 'soft-drinks.svg',
  'Traditional Food': 'traditional-food.svg'
};

const fallbackDescriptions = {
  'Breakfast': 'Start your day with fresh, comforting breakfast favorites.',
  'Burgers': 'Juicy, satisfying burgers made for a delicious meal.',
  'Pizza': 'Freshly baked pizzas with classic and flavorful toppings.',
  'Juices (Smoothie)': 'Fresh, fruity and refreshing smoothies and juices.',
  'Hot Drinks': 'Coffee and warm drinks for every moment.',
  'Soft Drinks': 'Cold and refreshing drinks to accompany your meal.',
  'Traditional Food': 'A taste of Ethiopian tradition, served with warmth.'
};

let categories = [];
let menuItems = [];

function categoryImage(category) {
  return category.image_url || `images/categories/${fallbackCategoryImages[category.name] || 'breakfast.svg'}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function loadMenu() {
  if (!isSupabaseConfigured()) {
    showSetupMessage();
    return;
  }

  const [categoriesResult, itemsResult] = await Promise.all([
    supabaseClient.from('categories').select('*').eq('active', true).order('display_order').order('name'),
    supabaseClient.from('menu_items').select('*').eq('available', true).order('display_order').order('name')
  ]);

  if (categoriesResult.error) {
    showError('Could not load categories. Check your Supabase setup and RLS policies.');
    console.error(categoriesResult.error);
    return;
  }

  if (itemsResult.error) {
    showError('Could not load food items. Check your Supabase setup and RLS policies.');
    console.error(itemsResult.error);
    return;
  }

  categories = categoriesResult.data || [];
  menuItems = itemsResult.data || [];
  route();
}

function showSetupMessage() {
  app.innerHTML = `
    <section class="setup-message">
      <span class="kicker">NILUS RESTAURANT</span>
      <h1>Supabase connection is not configured yet.</h1>
      <p>Open <b>config.js</b>, add your Supabase project URL and publishable key, then reload the page.</p>
    </section>`;
}

function showError(message) {
  app.innerHTML = `<section class="setup-message"><h1>Something went wrong</h1><p>${escapeHtml(message)}</p></section>`;
}

function showHome() {
  app.innerHTML = `
    <section class="hero">
      <div>
        <span class="kicker">NILUS RESTAURANT</span>
        <h1>Fresh food.<br><em>Beautiful moments.</em></h1>
        <p>Choose a category and explore our menu.</p>
        <a href="#menu">VIEW OUR MENU ↓</a>
      </div>
    </section>
    <section class="section" id="menu">
      <span class="kicker">OUR MENU</span>
      <h2>Choose a category</h2>
      <p>Tap a category to open its own menu view.</p>
      <div class="category-grid">
        ${categories.map(c => `
          <a class="category-card" href="#category/${encodeURIComponent(c.name)}">
            <img src="${escapeHtml(categoryImage(c))}" alt="${escapeHtml(c.name)}">
            <h3>${escapeHtml(c.name)}</h3>
            <span>VIEW MENU →</span>
          </a>`).join('')}
      </div>
      ${categories.length === 0 ? '<p class="empty">The menu is empty. A manager can add categories from the Manager Dashboard.</p>' : ''}
    </section>
    <section class="about" id="about">
      <span class="kicker">WELCOME TO NILUS</span>
      <h2>Good food, made to be enjoyed.</h2>
      <p>Comforting favorites, fresh drinks and traditional flavors in one welcoming place.</p>
    </section>`;
}

function showCategory(catName) {
  const category = categories.find(c => c.name === catName);
  if (!category) {
    showHome();
    return;
  }

  const items = menuItems.filter(item => item.category_id === category.id);
  const image = categoryImage(category);
  const description = category.description || fallbackDescriptions[category.name] || 'Freshly prepared favorites from Nilus Restaurant.';

  app.innerHTML = `
    <section class="category-page">
      <button class="back" onclick="location.hash='menu'">← BACK TO CATEGORIES</button>
      <div class="category-hero">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(category.name)}">
        <div>
          <span class="kicker">NILUS MENU</span>
          <h2>${escapeHtml(category.name)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
      </div>
      <div class="food-grid">
        ${items.map(item => `
          <article class="food-card">
            <img src="${escapeHtml(item.image_url || image)}" alt="${escapeHtml(item.name)}">
            <div class="food-content">
              <div class="food-top">
                <h3 class="food-name">${escapeHtml(item.name)}</h3>
                <span class="price">${money(item.price)}</span>
              </div>
              <p class="desc">${escapeHtml(item.description || '')}</p>
            </div>
          </article>`).join('')}
      </div>
      ${items.length === 0 ? '<p class="empty">There are no available food items in this category yet.</p>' : ''}
    </section>`;
  window.scrollTo(0, 0);
}

function route() {
  const hash = decodeURIComponent(location.hash || '#home');
  if (hash.startsWith('#category/')) {
    showCategory(hash.slice('#category/'.length));
  } else {
    showHome();
  }
}

window.addEventListener('hashchange', route);
document.getElementById('printMenu').onclick = () => window.print();
document.getElementById('year').textContent = new Date().getFullYear();
loadMenu();
