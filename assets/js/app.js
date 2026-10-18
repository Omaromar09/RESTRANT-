// Main JavaScript Application for "مطعم المحترف"

// State Management
const state = {
  cart: JSON.parse(localStorage.getItem('mohtaref_cart') || '[]'),
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  currentMenuPage: 1,
  selectedDish: null,
  theme: localStorage.getItem('mohtaref_theme') || 'dark'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategories();
  renderMenuItems();
  renderCustomerReviews();
  renderMenuScansCarousel();
  updateCartUI();
  setupEventListeners();
  setupLucideIcons();
});

// Setup Lucide icons fallback / renderer
function setupLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Theme handling
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = state.theme === 'dark' 
      ? '<i data-lucide="sun" class="w-5 h-5 text-yellow-400"></i>' 
      : '<i data-lucide="moon" class="w-5 h-5 text-gray-700"></i>';
    setupLucideIcons();
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mohtaref_theme', state.theme);
  initTheme();
}

// Render Categories
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = window.CATEGORIES.map(cat => {
    const isActive = state.activeCategory === cat.id;
    return `
      <button 
        onclick="setCategory('${cat.id}')"
        class="category-btn flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm md:text-base font-bold transition-all duration-300 ${
          isActive 
            ? 'btn-fire text-white shadow-lg' 
            : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white border border-slate-700'
        }"
      >
        <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
  setupLucideIcons();
}

function setCategory(catId) {
  state.activeCategory = catId;
  renderCategories();
  renderMenuItems();
}

// Filter and Sort Menu Items
function getFilteredItems() {
  let items = [...window.MENU_ITEMS];

  // Category filter
  if (state.activeCategory !== 'all') {
    items = items.filter(item => item.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (state.sortBy === 'price-asc') {
    items.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    items.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'popular') {
    items.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }

  return items;
}

// Render Menu Items
function renderMenuItems() {
  const container = document.getElementById('menu-items-grid');
  const countBadge = document.getElementById('items-count-badge');
  if (!container) return;

  const items = getFilteredItems();

  if (countBadge) {
    countBadge.textContent = `${items.length} صنف متاح`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center text-orange-500">
          <i data-lucide="search-x" class="w-10 h-10"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-200 mb-2">لم نعثر على أصناف تطابق بحثك</h3>
        <p class="text-gray-400 mb-6">جرب البحث بكلمات أخرى مثل "كبدة"، "سجق"، "كريب"، أو "حواوشي".</p>
        <button onclick="resetFilters()" class="btn-fire px-6 py-2 rounded-xl text-sm font-bold">
          عرض جميع الأصناف
        </button>
      </div>
    `;
    setupLucideIcons();
    return;
  }

  container.innerHTML = items.map(item => {
    return `
      <div class="group relative bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden card-hover flex flex-col justify-between">
        <!-- Image & Badges -->
        <div class="relative h-48 overflow-hidden bg-slate-950">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onerror="this.src='assets/images/dish-kebda.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          
          <!-- Badges -->
          <div class="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            ${item.badge ? `
              <span class="px-3 py-1 rounded-full text-xs font-black bg-orange-600/90 text-white shadow-md backdrop-blur-sm animate-flame">
                ${item.badge}
              </span>
            ` : ''}
            ${item.spiceLevel ? `
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/80 text-red-300 border border-red-700/50 backdrop-blur-sm">
                🌶️ ${item.spiceLevel}
              </span>
            ` : ''}
          </div>

          <!-- Quick view button -->
          <button 
            onclick="openDishModal(${item.id})"
            class="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-lg backdrop-blur-sm"
            title="تفاصيل الصنف"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                ${item.name}
              </h3>
            </div>
            <p class="text-xs md:text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <!-- Price & Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-xl md:text-2xl font-black text-amber-400">${item.price}</span>
                <span class="text-xs font-bold text-gray-400">ج.م</span>
              </div>
              ${item.oldPrice ? `
                <span class="text-xs text-gray-500 line-through">${item.oldPrice} ج.م</span>
              ` : ''}
            </div>

            <div class="flex items-center gap-2">
              <button 
                onclick="quickAddToCart(${item.id})"
                class="btn-fire px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
                title="أضف للطلب"
              >
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>اطلب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  setupLucideIcons();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'default';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'default';
  renderCategories();
  renderMenuItems();
}

// Modal Dish Details & Customization
function openDishModal(dishId) {
  const dish = window.MENU_ITEMS.find(i => i.id === dishId);
  if (!dish) return;

  state.selectedDish = {
    ...dish,
    quantity: 1,
    selectedOption: dish.options ? dish.options[0] : null,
    selectedExtras: []
  };

  const modal = document.getElementById('dish-modal');
  const container = document.getElementById('dish-modal-content');
  if (!modal || !container) return;

  renderDishModalContent();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function renderDishModalContent() {
  const container = document.getElementById('dish-modal-content');
  const dish = state.selectedDish;
  if (!container || !dish) return;

  // Calculate current total
  const extrasTotal = dish.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const currentItemPrice = (dish.price + extrasTotal) * dish.quantity;

  container.innerHTML = `
    <!-- Header Image -->
    <div class="relative h-56 md:h-64 bg-slate-950">
      <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      <button 
        onclick="closeDishModal()" 
        class="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      ${dish.badge ? `
        <span class="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white">
          ${dish.badge}
        </span>
      ` : ''}
    </div>

    <!-- Details -->
    <div class="p-6 overflow-y-auto max-h-[60vh]">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-2xl font-black text-white">${dish.name}</h2>
        <span class="text-2xl font-black text-amber-400">${dish.price} <span class="text-sm font-normal text-gray-400">ج.م</span></span>
      </div>
      <p class="text-gray-300 text-sm mb-6 leading-relaxed">${dish.description}</p>

      <!-- Options (e.g. Bread type) -->
      ${dish.options && dish.options.length ? `
        <div class="mb-5 pb-5 border-b border-slate-800">
          <label class="block text-sm font-bold text-gray-300 mb-3">اختر نوع الخبز / التقديم:</label>
          <div class="grid grid-cols-2 gap-2">
            ${dish.options.map(opt => `
              <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                dish.selectedOption === opt 
                  ? 'border-orange-500 bg-orange-500/10 text-white font-bold' 
                  : 'border-slate-800 bg-slate-800/50 text-gray-400 hover:border-slate-700'
              }">
                <span>${opt}</span>
                <input 
                  type="radio" 
                  name="dish-option" 
                  value="${opt}" 
                  ${dish.selectedOption === opt ? 'checked' : ''}
                  onchange="updateDishOption('${opt}')" 
                  class="accent-orange-500"
                />
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Extras -->
      ${dish.extras && dish.extras.length ? `
        <div class="mb-5 pb-5 border-b border-slate-800">
          <label class="block text-sm font-bold text-gray-300 mb-3">إضافات ودلع الصنف (اختياري):</label>
          <div class="space-y-2">
            ${dish.extras.map(extra => {
              const isChecked = dish.selectedExtras.some(e => e.name === extra.name);
              return `
                <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-amber-500 bg-amber-500/10 text-white font-bold' 
                    : 'border-slate-800 bg-slate-800/50 text-gray-400 hover:border-slate-700'
                }">
                  <span class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      ${isChecked ? 'checked' : ''}
                      onchange="toggleDishExtra('${extra.name}', ${extra.price})"
                      class="accent-orange-500 w-4 h-4 rounded"
                    />
                    <span>${extra.name}</span>
                  </span>
                  <span class="text-sm font-bold text-amber-400">+${extra.price} ج.م</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Notes input -->
      <div class="mb-6">
        <label class="block text-sm font-bold text-gray-300 mb-2">ملاحظات خاصة للطلب:</label>
        <input 
          type="text" 
          id="dish-special-notes"
          placeholder="مثال: شطة زيادة / بدون بصل / طحينة برة..." 
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      <!-- Quantity & Submit -->
      <div class="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div class="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-800">
          <button 
            onclick="updateDishQty(-1)" 
            class="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <i data-lucide="minus" class="w-4 h-4"></i>
          </button>
          <span class="w-12 text-center font-black text-white text-base">${dish.quantity}</span>
          <button 
            onclick="updateDishQty(1)" 
            class="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>

        <button 
          onclick="addCustomizedDishToCart()" 
          class="btn-fire flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-between"
        >
          <span>إضافة للسلة</span>
          <span class="text-lg font-black">${currentItemPrice} ج.م</span>
        </button>
      </div>
    </div>
  `;

  setupLucideIcons();
}

function updateDishOption(opt) {
  if (state.selectedDish) {
    state.selectedDish.selectedOption = opt;
    renderDishModalContent();
  }
}

function toggleDishExtra(name, price) {
  if (!state.selectedDish) return;
  const existingIndex = state.selectedDish.selectedExtras.findIndex(e => e.name === name);
  if (existingIndex >= 0) {
    state.selectedDish.selectedExtras.splice(existingIndex, 1);
  } else {
    state.selectedDish.selectedExtras.push({ name, price });
  }
  renderDishModalContent();
}

function updateDishQty(delta) {
  if (!state.selectedDish) return;
  const newQty = state.selectedDish.quantity + delta;
  if (newQty >= 1 && newQty <= 50) {
    state.selectedDish.quantity = newQty;
    renderDishModalContent();
  }
}

function closeDishModal() {
  const modal = document.getElementById('dish-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
  state.selectedDish = null;
}

function addCustomizedDishToCart() {
  const dish = state.selectedDish;
  if (!dish) return;

  const notesInput = document.getElementById('dish-special-notes');
  const note = notesInput ? notesInput.value.trim() : '';

  const extrasTotal = dish.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const singlePrice = dish.price + extrasTotal;

  addToCart({
    id: dish.id,
    name: dish.name,
    image: dish.image,
    singlePrice: singlePrice,
    quantity: dish.quantity,
    option: dish.selectedOption,
    extras: dish.selectedExtras,
    note: note
  });

  closeDishModal();
}

// Quick add button on card
function quickAddToCart(dishId) {
  const dish = window.MENU_ITEMS.find(i => i.id === dishId);
  if (!dish) return;

  addToCart({
    id: dish.id,
    name: dish.name,
    image: dish.image,
    singlePrice: dish.price,
    quantity: 1,
    option: dish.options ? dish.options[0] : null,
    extras: [],
    note: ''
  });
}

// Cart Core Operations
function addToCart(item) {
  // Check if identical item (same id, same option, same extras, same note) exists
  const existing = state.cart.find(c => 
    c.id === item.id && 
    c.option === item.option && 
    JSON.stringify(c.extras) === JSON.stringify(item.extras) &&
    c.note === item.note
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    state.cart.push({ ...item, cartId: Date.now() + Math.random() });
  }

  saveCart();
  updateCartUI();
  showToast(`تمت إضافة "${item.name}" إلى سلة الطلبات!`);
}

function updateCartItemQty(cartId, delta) {
  const item = state.cart.find(c => c.cartId === cartId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(c => c.cartId !== cartId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(cartId) {
  state.cart = state.cart.filter(c => c.cartId !== cartId);
  saveCart();
  updateCartUI();
  showToast("تم حذف الصنف من السلة");
}

function clearCart() {
  if (state.cart.length === 0) return;
  if (confirm("هل أنت متأكد من تفريغ سلة الطلبات؟")) {
    state.cart = [];
    saveCart();
    updateCartUI();
    showToast("تم تفريغ السلة");
  }
}

function saveCart() {
  localStorage.setItem('mohtaref_cart', JSON.stringify(state.cart));
}

function getCartTotals() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.singlePrice * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 15 : 0; // standard Shubra delivery estimate
  const grandTotal = subtotal + deliveryFee;
  return { totalCount, subtotal, deliveryFee, grandTotal };
}

// Update Cart Badge & Drawer UI
function updateCartUI() {
  const { totalCount, subtotal, deliveryFee, grandTotal } = getCartTotals();

  // Badges
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  // Floating Cart Button
  const floatBtn = document.getElementById('floating-cart-btn');
  if (floatBtn) {
    if (totalCount > 0) {
      floatBtn.classList.remove('translate-y-28');
      floatBtn.classList.add('translate-y-0');
    } else {
      floatBtn.classList.remove('translate-y-0');
      floatBtn.classList.add('translate-y-28');
    }
  }

  // Floating total text
  const floatTotal = document.getElementById('floating-cart-total');
  if (floatTotal) {
    floatTotal.textContent = `${subtotal} ج.م`;
  }

  // Drawer Content
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footer = document.getElementById('cart-footer');

  if (!container) return;

  if (state.cart.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (footer) footer.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (footer) footer.classList.remove('hidden');

  container.innerHTML = state.cart.map(item => `
    <div class="flex items-start gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl mb-3">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover bg-slate-950 flex-shrink-0">
      
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-1 mb-1">
          <h4 class="font-bold text-white text-sm line-clamp-1">${item.name}</h4>
          <button onclick="removeCartItem(${item.cartId})" class="text-gray-500 hover:text-red-400 p-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        ${item.option ? `<p class="text-xs text-orange-400 font-semibold mb-1">الخبز: ${item.option}</p>` : ''}
        ${item.extras && item.extras.length ? `
          <p class="text-xs text-gray-400 mb-1">إضافات: ${item.extras.map(e => e.name).join('، ')}</p>
        ` : ''}
        ${item.note ? `<p class="text-xs italic text-gray-400 mb-1">ملاحظة: ${item.note}</p>` : ''}

        <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/50">
          <div class="flex items-center gap-1 text-sm font-black text-amber-400">
            <span>${item.singlePrice * item.quantity}</span>
            <span class="text-xs text-gray-400 font-normal">ج.م</span>
          </div>

          <div class="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-800">
            <button onclick="updateCartItemQty(${item.cartId}, -1)" class="w-7 h-7 flex items-center justify-center text-gray-300 hover:bg-slate-700">
              <i data-lucide="minus" class="w-3 h-3"></i>
            </button>
            <span class="w-8 text-center text-xs font-bold text-white">${item.quantity}</span>
            <button onclick="updateCartItemQty(${item.cartId}, 1)" class="w-7 h-7 flex items-center justify-center text-gray-300 hover:bg-slate-700">
              <i data-lucide="plus" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Update summary numbers
  const subtotalEl = document.getElementById('cart-subtotal');
  const deliveryEl = document.getElementById('cart-delivery');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (subtotalEl) subtotalEl.textContent = `${subtotal} ج.م`;
  if (deliveryEl) deliveryEl.textContent = `${deliveryFee} ج.م`;
  if (grandTotalEl) grandTotalEl.textContent = `${grandTotal} ج.م`;

  setupLucideIcons();
}

function openCartDrawer() {
  const container = document.getElementById('cart-drawer-container');
  if (container) {
    container.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const container = document.getElementById('cart-drawer-container');
  if (container) {
    container.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openMobileNav() {
  const container = document.getElementById('mobile-nav-container');
  if (container) {
    container.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const container = document.getElementById('mobile-nav-container');
  if (container) {
    container.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Generate formatted WhatsApp Order
function sendOrderViaWhatsApp() {
  if (state.cart.length === 0) {
    showToast("سلة طلباتك فارغة!");
    return;
  }

  const nameInput = document.getElementById('order-customer-name');
  const phoneInput = document.getElementById('order-customer-phone');
  const addressInput = document.getElementById('order-customer-address');
  const notesInput = document.getElementById('order-general-notes');

  const customerName = nameInput ? nameInput.value.trim() : '';
  const customerPhone = phoneInput ? phoneInput.value.trim() : '';
  const customerAddress = addressInput ? addressInput.value.trim() : '';
  const generalNotes = notesInput ? notesInput.value.trim() : '';

  if (!customerName || !customerPhone || !customerAddress) {
    alert("برجاء إدخال الاسم ورقم الهاتف والعنوان بالتفصيل لإتمام الطلب!");
    return;
  }

  const { subtotal, deliveryFee, grandTotal } = getCartTotals();

  let msg = `🔥 *طلب جديد من الموقع الإلكتروني - مطعم المحترف* 🔥\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *العميل:* ${customerName}\n`;
  msg += `📱 *الهاتف:* ${customerPhone}\n`;
  msg += `📍 *العنوان:* ${customerAddress}\n`;
  if (generalNotes) {
    msg += `📝 *ملاحظات:* ${generalNotes}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *تفاصيل الأصناف:*\n`;

  state.cart.forEach((item, index) => {
    msg += `\n${index + 1}. *${item.name}* (العدد: ${item.quantity})\n`;
    if (item.option) msg += `   • نوع الخبز: ${item.option}\n`;
    if (item.extras && item.extras.length) {
      msg += `   • الإضافات: ${item.extras.map(e => e.name).join(' + ')}\n`;
    }
    if (item.note) msg += `   • ملاحظة: ${item.note}\n`;
    msg += `   • السعر: ${item.singlePrice * item.quantity} ج.م\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *إجمالي الأصناف:* ${subtotal} ج.م\n`;
  msg += `🛵 *خدمة التوصيل المقدرة:* ${deliveryFee} ج.م\n`;
  msg += `⭐ *الإجمالي الكلي المطلوب:* ${grandTotal} ج.م\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🕒 التوقيت: ${new Date().toLocaleTimeString('ar-EG')} - برجاء التأكيد والبدء في التحضير فوراً.`;

  const encodedMsg = encodeURIComponent(msg);
  const targetPhone = window.RESTAURANT_INFO.whatsappNumber; // 201200006408
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');

  showToast("تم فتح واتساب لإرسال تفاصيل طلبك للمطعم!");
}

// Scanned Menu Viewer (The 10 pages from Menu Egypt)
function renderMenuScansCarousel() {
  const container = document.getElementById('menu-scans-thumbnails');
  if (!container) return;

  container.innerHTML = window.MENU_PAGES.map(p => `
    <button 
      onclick="openMenuScanViewer(${p.page})"
      class="group relative rounded-xl overflow-hidden border-2 transition-all duration-300 text-right ${
        state.currentMenuPage === p.page 
          ? 'border-orange-500 scale-105 shadow-xl' 
          : 'border-slate-800 hover:border-slate-700'
      }"
    >
      <div class="h-40 md:h-52 bg-slate-900 overflow-hidden">
        <img 
          src="${p.img}" 
          alt="${p.title}" 
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div class="p-2.5 bg-slate-900/95 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black text-orange-400">صفحة ${p.page}</span>
          <i data-lucide="maximize-2" class="w-3.5 h-3.5 text-gray-400 group-hover:text-white"></i>
        </div>
        <p class="text-xs text-gray-300 font-semibold truncate mt-0.5">${p.title}</p>
      </div>
    </button>
  `).join('');

  setupLucideIcons();
}

function openMenuScanViewer(pageNumber) {
  state.currentMenuPage = pageNumber;
  const modal = document.getElementById('menu-scan-modal');
  const img = document.getElementById('scan-modal-img');
  const title = document.getElementById('scan-modal-title');
  const pageBadge = document.getElementById('scan-modal-page-num');

  const pageData = window.MENU_PAGES.find(p => p.page === pageNumber) || window.MENU_PAGES[0];

  if (img) img.src = pageData.img;
  if (title) title.textContent = pageData.title;
  if (pageBadge) pageBadge.textContent = `صفحة ${pageData.page} من 10`;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function changeMenuScanPage(delta) {
  let newPage = state.currentMenuPage + delta;
  if (newPage < 1) newPage = 10;
  if (newPage > 10) newPage = 1;
  openMenuScanViewer(newPage);
}

function closeMenuScanViewer() {
  const modal = document.getElementById('menu-scan-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Customer Reviews
function renderCustomerReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  container.innerHTML = window.CUSTOMER_REVIEWS.map(r => `
    <div class="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl relative card-hover">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-base shadow-md">
            ${r.name.charAt(0)}
          </div>
          <div>
            <h4 class="font-bold text-white text-base">${r.name}</h4>
            <span class="text-xs text-orange-400 font-medium">${r.branch}</span>
          </div>
        </div>
        <span class="text-xs text-gray-500">${r.date}</span>
      </div>

      <!-- Rating stars -->
      <div class="flex items-center gap-1 mb-3 text-amber-400">
        ${Array(r.rating).fill(0).map(() => '<i data-lucide="star" class="w-4 h-4 fill-current"></i>').join('')}
      </div>

      <p class="text-sm text-gray-300 leading-relaxed italic">
        "${r.comment}"
      </p>
    </div>
  `).join('');

  setupLucideIcons();
}

function handleAddReview(e) {
  e.preventDefault();
  const name = document.getElementById('review-name').value.trim();
  const comment = document.getElementById('review-comment').value.trim();
  const branch = document.getElementById('review-branch').value;
  const rating = parseInt(document.getElementById('review-rating').value || 5);

  if (!name || !comment) {
    alert("برجاء كتابة الاسم والتعليق!");
    return;
  }

  window.CUSTOMER_REVIEWS.unshift({
    id: Date.now(),
    name,
    comment,
    branch,
    rating,
    date: "الآن"
  });

  renderCustomerReviews();
  document.getElementById('review-form').reset();
  showToast("شكراً لك! تم إضافة تقييمك بنجاح ❤️");
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-6 left-6 z-50 bg-slate-900 border border-orange-500/60 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 toast-enter max-w-sm';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-orange-600/30 text-orange-400 flex items-center justify-center flex-shrink-0">
      <i data-lucide="check" class="w-4 h-4"></i>
    </div>
    <span class="text-sm font-bold text-gray-100">${message}</span>
  `;
  setupLucideIcons();

  toast.style.display = 'flex';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Search input with debounce
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenuItems();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderMenuItems();
    });
  }

  // Review form
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleAddReview);
  }

  // Mobile menu drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileNav);
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Keyboard navigation & closing modals with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeMobileNav();
      closeDishModal();
      closeMenuScanViewer();
    }

    const scanModal = document.getElementById('menu-scan-modal');
    if (scanModal && !scanModal.classList.contains('hidden')) {
      if (e.key === 'ArrowRight') changeMenuScanPage(-1); // RTL previous
      if (e.key === 'ArrowLeft') changeMenuScanPage(1);   // RTL next
    }
  });
}
