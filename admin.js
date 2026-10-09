const loginPanel = document.getElementById('loginPanel');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const dashboardMessage = document.getElementById('dashboardMessage');
const logoutBtn = document.getElementById('logoutBtn');
const categoryList = document.getElementById('categoryList');

let categories = [];
let items = [];
let searchTerm = '';


function esc(value = '') {
  return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}
function setMessage(el, text, type = '') { el.textContent = text; el.className = `message ${type}`; }
function money(n) { return new Intl.NumberFormat('en-ET', { maximumFractionDigits: 2 }).format(Number(n)) + ' ETB'; }
function openModal(id) { document.getElementById(id).hidden = false; }
function closeModal(id) { document.getElementById(id).hidden = true; }

document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeModal(button.dataset.close)));
document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; }));

function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'image';
}

async function uploadImage(file, folder, nameBase) {
  if (!file) return null;
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) throw new Error('Image must be 5 MB or smaller.');

  const extension = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${folder}/${slugify(nameBase)}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseClient.storage.from('menu-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  const { data } = supabaseClient.storage.from('menu-images').getPublicUrl(path);
  return data.publicUrl;
}

async function deleteStoredImage(publicUrl) {
  if (!publicUrl || !publicUrl.includes('/storage/v1/object/public/menu-images/')) return;
  const marker = '/storage/v1/object/public/menu-images/';
  const path = decodeURIComponent(publicUrl.split(marker)[1] || '');
  if (!path) return;
  const { error } = await supabaseClient.storage.from('menu-images').remove([path]);
  if (error) console.warn('Could not remove old image:', error.message);
}

function previewFile(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const file = input.files?.[0];
  if (!file) { preview.hidden = true; preview.removeAttribute('src'); return; }
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
}

document.getElementById('categoryImageFile').addEventListener('change', () => previewFile('categoryImageFile', 'categoryImagePreview'));
document.getElementById('itemImageFile').addEventListener('change', () => previewFile('itemImageFile', 'itemImagePreview'));

async function checkSession() {
  if (!isSupabaseConfigured()) {
    setMessage(loginMessage, 'Configure config.js first.', 'error');
    loginForm.querySelector('button').disabled = true;
    return;
  }
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) await showDashboard(session);
}

async function showDashboard(session) {
  const { data: manager, error } = await supabaseClient.from('manager_profiles').select('user_id, role').eq('user_id', session.user.id).maybeSingle();
  if (error || !manager) {
    await supabaseClient.auth.signOut();
    setMessage(loginMessage, 'This account is not registered as a Nilus manager.', 'error');
    return;
  }
  loginPanel.hidden = true;
  dashboard.hidden = false;
  logoutBtn.hidden = false;
  await loadDashboardData();
}

async function loadDashboardData() {
  setMessage(dashboardMessage, 'Loading menu...');
  const [catResult, itemResult] = await Promise.all([
    supabaseClient.from('categories').select('*').order('display_order').order('name'),
    supabaseClient.from('menu_items').select('*').order('display_order').order('name')
  ]);
  if (catResult.error || itemResult.error) {
    setMessage(dashboardMessage, 'Could not load the menu. Check your database/RLS setup.', 'error');
    console.error(catResult.error || itemResult.error);
    return;
  }
  categories = catResult.data || [];
  items = itemResult.data || [];
  renderCategories();
  setMessage(dashboardMessage, `${categories.length} categories and ${items.length} food items.`, 'success');
}

function updateStats() {
  document.getElementById('categoryCount').textContent = categories.length;
  document.getElementById('itemCount').textContent = items.length;
  document.getElementById('availableCount').textContent = items.filter(i => i.available).length;
  document.getElementById('hiddenCount').textContent = items.filter(i => !i.available).length;
}

function renderCategories() {
  const q = searchTerm.trim().toLowerCase();
  const filtered = categories.map(category => {
    const categoryItems = items.filter(item => item.category_id === category.id);
    return { category, categoryItems: q ? categoryItems.filter(item => `${item.name} ${item.description || ''}`.toLowerCase().includes(q)) : categoryItems };
  }).filter(({category, categoryItems}) => !q || `${category.name} ${category.description || ''}`.toLowerCase().includes(q) || categoryItems.length);

  categoryList.innerHTML = filtered.map(({category, categoryItems}) => {
    return `<article class="category-admin-card ${category.active ? '' : 'inactive'}">
      <div class="category-admin-head">
        <div class="category-title-wrap">
          ${category.image_url ? `<img class="admin-thumb" src="${esc(category.image_url)}" alt="">` : ''}
          <div><span class="status ${category.active ? 'on' : 'off'}">${category.active ? 'ACTIVE' : 'HIDDEN'}</span>
          <h2>${esc(category.name)}</h2><p>${esc(category.description || 'No description')}</p></div>
        </div>
        <div class="row-actions"><button class="secondary small" onclick="editCategory(${category.id})">Edit</button><button class="danger small" onclick="deleteCategory(${category.id})">Delete</button><button class="primary small" onclick="newItem(${category.id})">+ Add Food</button></div>
      </div>
      <div class="items-table">${categoryItems.length ? categoryItems.map(item => `<div class="item-row ${item.available ? '' : 'unavailable'}">
        <div class="item-title-wrap">${item.image_url ? `<img class="item-thumb" src="${esc(item.image_url)}" alt="">` : ''}<div><strong>${esc(item.name)}</strong><small>${esc(item.description || 'No description')}</small></div></div>
        <span>${money(item.price)}</span><span class="availability">${item.available ? 'Available' : 'Hidden'}</span>
        <div class="row-actions"><button class="secondary small" onclick="editItem(${item.id})">Edit</button><button class="danger small" onclick="deleteItem(${item.id})">Delete</button></div>
      </div>`).join('') : '<div class="empty-row">No food items in this category yet. Click <b>+ Add Food</b>.</div>'}</div>
    </article>`;
  }).join('');
  if (!filtered.length) categoryList.innerHTML = '<div class="empty-search">No categories or food items match your search.</div>';
  updateStats();
}

function resetImageInput(inputId, previewId) { document.getElementById(inputId).value = ''; const p = document.getElementById(previewId); p.hidden = true; p.removeAttribute('src'); }

function prepareNewCategory() {
  document.getElementById('categoryModalTitle').textContent = 'New Category';
  document.getElementById('categoryId').value = '';
  document.getElementById('categoryName').value = '';
  document.getElementById('categoryDescription').value = '';
  document.getElementById('categoryOrder').value = categories.length + 1;
  document.getElementById('categoryActive').checked = true;
  resetImageInput('categoryImageFile', 'categoryImagePreview');
  openModal('categoryModal');
}
document.getElementById('newCategoryBtn').onclick = prepareNewCategory;
document.getElementById('refreshBtn').onclick = loadDashboardData;
document.getElementById('menuSearch').addEventListener('input', e => { searchTerm = e.target.value; renderCategories(); });

window.editCategory = function(id) {
  const c = categories.find(x => x.id === id); if (!c) return;
  document.getElementById('categoryModalTitle').textContent = 'Edit Category';
  document.getElementById('categoryId').value = c.id;
  document.getElementById('categoryName').value = c.name;
  document.getElementById('categoryDescription').value = c.description || '';
  document.getElementById('categoryOrder').value = c.display_order;
  document.getElementById('categoryActive').checked = c.active;
  resetImageInput('categoryImageFile', 'categoryImagePreview');
  const current = document.getElementById('categoryCurrentImage');
  current.src = c.image_url || '';
  current.hidden = !c.image_url;
  openModal('categoryModal');
};

document.getElementById('categoryForm').onsubmit = async e => {
  e.preventDefault();
  const button = e.submitter;
  button.disabled = true;
  try {
    const id = document.getElementById('categoryId').value;
    const old = id ? categories.find(c => c.id === Number(id)) : null;
    let imageUrl = old?.image_url || null;
    const file = document.getElementById('categoryImageFile').files?.[0];
    if (file) {
      setMessage(dashboardMessage, 'Uploading category image...');
      imageUrl = await uploadImage(file, 'categories', document.getElementById('categoryName').value);
    }
    const payload = {
      name: document.getElementById('categoryName').value.trim(),
      description: document.getElementById('categoryDescription').value.trim() || null,
      image_url: imageUrl,
      display_order: Number(document.getElementById('categoryOrder').value) || 0,
      active: document.getElementById('categoryActive').checked
    };
    if (!payload.name) throw new Error('Category name is required.');
    const result = id ? await supabaseClient.from('categories').update(payload).eq('id', id) : await supabaseClient.from('categories').insert(payload);
    if (result.error) throw result.error;
    if (file && old?.image_url) await deleteStoredImage(old.image_url);
    closeModal('categoryModal');
    await loadDashboardData();
  } catch (err) { alert(err.message || 'Could not save category.'); }
  finally { button.disabled = false; }
};

window.deleteCategory = async function(id) {
  const c = categories.find(x => x.id === id); if (!c) return;
  if (!confirm(`Delete "${c.name}" and all food items inside it?`)) return;
  const categoryItems = items.filter(i => i.category_id === id);
  const { error } = await supabaseClient.from('categories').delete().eq('id', id);
  if (error) { alert(error.message); return; }
  for (const item of categoryItems) await deleteStoredImage(item.image_url);
  await deleteStoredImage(c.image_url);
  await loadDashboardData();
};

window.newItem = function(categoryId) {
  const c = categories.find(x => x.id === categoryId); if (!c) return;
  document.getElementById('itemModalTitle').textContent = `Add Food to ${c.name}`;
  document.getElementById('itemId').value = '';
  document.getElementById('itemCategoryId').value = categoryId;
  document.getElementById('itemName').value = '';
  document.getElementById('itemDescription').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemOrder').value = items.filter(i => i.category_id === categoryId).length + 1;
  document.getElementById('itemAvailable').checked = true;
  resetImageInput('itemImageFile', 'itemImagePreview');
  document.getElementById('itemCurrentImage').hidden = true;
  openModal('itemModal');
};

window.editItem = function(id) {
  const item = items.find(x => x.id === id); if (!item) return;
  const c = categories.find(x => x.id === item.category_id);
  document.getElementById('itemModalTitle').textContent = `Edit ${item.name}`;
  document.getElementById('itemId').value = item.id;
  document.getElementById('itemCategoryId').value = item.category_id;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemDescription').value = item.description || '';
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemOrder').value = item.display_order;
  document.getElementById('itemAvailable').checked = item.available;
  resetImageInput('itemImageFile', 'itemImagePreview');
  const current = document.getElementById('itemCurrentImage');
  current.src = item.image_url || '';
  current.hidden = !item.image_url;
  openModal('itemModal');
};

document.getElementById('itemForm').onsubmit = async e => {
  e.preventDefault();
  const button = e.submitter; button.disabled = true;
  try {
    const id = document.getElementById('itemId').value;
    const old = id ? items.find(i => i.id === Number(id)) : null;
    let imageUrl = old?.image_url || null;
    const file = document.getElementById('itemImageFile').files?.[0];
    if (file) {
      setMessage(dashboardMessage, 'Uploading food image...');
      imageUrl = await uploadImage(file, 'food', document.getElementById('itemName').value);
    }
    const payload = {
      category_id: Number(document.getElementById('itemCategoryId').value),
      name: document.getElementById('itemName').value.trim(),
      description: document.getElementById('itemDescription').value.trim() || null,
      price: Number(document.getElementById('itemPrice').value),
      image_url: imageUrl,
      display_order: Number(document.getElementById('itemOrder').value) || 0,
      available: document.getElementById('itemAvailable').checked
    };
    if (!payload.name) throw new Error('Food name is required.');
    if (!Number.isFinite(payload.price) || payload.price < 0) throw new Error('Enter a valid price.');
    const result = id ? await supabaseClient.from('menu_items').update(payload).eq('id', id) : await supabaseClient.from('menu_items').insert(payload);
    if (result.error) throw result.error;
    if (file && old?.image_url) await deleteStoredImage(old.image_url);
    closeModal('itemModal');
    await loadDashboardData();
  } catch (err) { alert(err.message || 'Could not save food item.'); }
  finally { button.disabled = false; }
};

window.deleteItem = async function(id) {
  const item = items.find(x => x.id === id); if (!item) return;
  if (!confirm(`Delete "${item.name}"?`)) return;
  const { error } = await supabaseClient.from('menu_items').delete().eq('id', id);
  if (error) { alert(error.message); return; }
  await deleteStoredImage(item.image_url);
  await loadDashboardData();
};

loginForm.onsubmit = async e => {
  e.preventDefault();
  setMessage(loginMessage, 'Signing in...');
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value
  });
  if (error) { setMessage(loginMessage, error.message, 'error'); return; }
  await showDashboard(data.session);
};

logoutBtn.onclick = async () => { await supabaseClient.auth.signOut(); dashboard.hidden = true; loginPanel.hidden = false; logoutBtn.hidden = true; setMessage(loginMessage, 'You have been logged out.', 'success'); };
checkSession();
