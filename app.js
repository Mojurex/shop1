// ===== Simple Shop App (multi-page, localStorage) =====

const LS_KEYS = {
  USER: "shop_user",
  CART: "shop_cart",
  PRODUCTS: "shop_products",
  USERS: "shop_users",
  WISHLIST: "shop_wishlist",
  ORDERS: "shop_orders"
};

const DEFAULT_PRODUCTS = [
  { id: "p1", name: "Wireless Headset", price: 129000, category: "Аксессуар", image: "https://picsum.photos/seed/headset/600/400" },
  { id: "p2", name: "Smart Watch", price: 159000, category: "Цаг", image: "https://picsum.photos/seed/watch/600/400" },
  { id: "p3", name: "Bluetooth Speaker", price: 99000, category: "Аудио", image: "https://picsum.photos/seed/speaker/600/400" },
  { id: "p4", name: "USB-C Hub", price: 69000, category: "Компьютер", image: "https://picsum.photos/seed/hub/600/400" },
  { id: "p5", name: "Gaming Mouse", price: 79000, category: "Компьютер", image: "https://picsum.photos/seed/mouse/600/400" },
  { id: "p6", name: "Phone Case", price: 29000, category: "Аксессуар", image: "https://picsum.photos/seed/phonecase/600/400" },
  { id: "p7", name: "Mechanical Keyboard", price: 189000, category: "Компьютер", image: "https://picsum.photos/seed/keyboard/600/400" },
  { id: "p8", name: "Laptop Stand", price: 74000, category: "Оффис", image: "https://picsum.photos/seed/stand/600/400" },
  { id: "p9", name: "27-inch Monitor", price: 599000, category: "Компьютер", image: "https://picsum.photos/seed/monitor/600/400" },
  { id: "p10", name: "Noise Canceling Earbuds", price: 219000, category: "Аудио", image: "https://picsum.photos/seed/earbuds/600/400" },
  { id: "p11", name: "Portable SSD 1TB", price: 329000, category: "Компьютер", image: "https://picsum.photos/seed/ssd/600/400" },
  { id: "p12", name: "Web Camera 1080p", price: 159000, category: "Оффис", image: "https://picsum.photos/seed/webcam/600/400" },
  { id: "p13", name: "Studio Microphone", price: 269000, category: "Аудио", image: "https://picsum.photos/seed/microphone/600/400" },
  { id: "p14", name: "RGB Light Strip", price: 68000, category: "Гэрэл", image: "https://picsum.photos/seed/lightstrip/600/400" },
  { id: "p15", name: "Desk Lamp", price: 89000, category: "Гэрэл", image: "https://picsum.photos/seed/desklamp/600/400" },
  { id: "p16", name: "Power Bank 20000mAh", price: 119000, category: "Аялал", image: "https://picsum.photos/seed/powerbank/600/400" },
  { id: "p17", name: "Fitness Tracker", price: 149000, category: "Цаг", image: "https://picsum.photos/seed/tracker/600/400" },
  { id: "p18", name: "Smart Bulb", price: 45000, category: "Ухаалаг гэр", image: "https://picsum.photos/seed/bulb/600/400" },
  { id: "p19", name: "WiFi Router AX1800", price: 189000, category: "Сүлжээ", image: "https://picsum.photos/seed/router/600/400" },
  { id: "p20", name: "Bluetooth Keyboard", price: 99000, category: "Компьютер", image: "https://picsum.photos/seed/btkeyboard/600/400" },
  { id: "p21", name: "Tablet Sleeve", price: 45000, category: "Аксессуар", image: "https://picsum.photos/seed/sleeve/600/400" },
  { id: "p22", name: "HDMI Cable 2m", price: 22000, category: "Кабель", image: "https://picsum.photos/seed/hdmi/600/400" },
  { id: "p23", name: "USB-C Cable 1m", price: 18000, category: "Кабель", image: "https://picsum.photos/seed/usbc/600/400" },
  { id: "p24", name: "Wireless Charger", price: 69000, category: "Аксессуар", image: "https://picsum.photos/seed/charger/600/400" },
  { id: "p25", name: "Game Controller", price: 149000, category: "Тоглоом", image: "https://picsum.photos/seed/controller/600/400" },
  { id: "p26", name: "VR Headset Lite", price: 399000, category: "Тоглоом", image: "https://picsum.photos/seed/vr/600/400" },
  { id: "p27", name: "Smart Plug", price: 52000, category: "Ухаалаг гэр", image: "https://picsum.photos/seed/plug/600/400" },
  { id: "p28", name: "Electric Kettle", price: 99000, category: "Гэр ахуй", image: "https://picsum.photos/seed/kettle/600/400" },
  { id: "p29", name: "Air Purifier Mini", price: 249000, category: "Гэр ахуй", image: "https://picsum.photos/seed/airpurifier/600/400" },
  { id: "p30", name: "Coffee Maker", price: 279000, category: "Гэр ахуй", image: "https://picsum.photos/seed/coffee/600/400" },
  { id: "p31", name: "Robot Vacuum", price: 699000, category: "Гэр ахуй", image: "https://picsum.photos/seed/vacuum/600/400" },
  { id: "p32", name: "Hair Dryer", price: 129000, category: "Гэр ахуй", image: "https://picsum.photos/seed/hairdryer/600/400" },
  { id: "p33", name: "Mini Drone", price: 459000, category: "Аялал", image: "https://picsum.photos/seed/drone/600/400" },
  { id: "p34", name: "Action Camera", price: 369000, category: "Камер", image: "https://picsum.photos/seed/actioncam/600/400" },
  { id: "p35", name: "Tripod", price: 69000, category: "Камер", image: "https://picsum.photos/seed/tripod/600/400" },
  { id: "p36", name: "Photo Light", price: 179000, category: "Камер", image: "https://picsum.photos/seed/photolight/600/400" },
  { id: "p37", name: "Ergonomic Chair", price: 599000, category: "Оффис", image: "https://picsum.photos/seed/chair/600/400" },
  { id: "p38", name: "Standing Desk", price: 899000, category: "Оффис", image: "https://picsum.photos/seed/standingdesk/600/400" },
  { id: "p39", name: "Graphic Tablet", price: 219000, category: "Дизайн", image: "https://picsum.photos/seed/graphictablet/600/400" },
  { id: "p40", name: "All-in-One Printer", price: 329000, category: "Оффис", image: "https://picsum.photos/seed/printer/600/400" },
  { id: "p41", name: "Smart Speaker", price: 159000, category: "Аудио", image: "https://picsum.photos/seed/smartspeaker/600/400" },
  { id: "p42", name: "Security Camera", price: 189000, category: "Хяналт", image: "https://picsum.photos/seed/securitycam/600/400" },
  { id: "p43", name: "Doorbell Camera", price: 209000, category: "Хяналт", image: "https://picsum.photos/seed/doorbell/600/400" },
  { id: "p44", name: "Electric Scooter", price: 1199000, category: "Тээвэр", image: "https://picsum.photos/seed/scooter/600/400" },
  { id: "p45", name: "TV Stick", price: 149000, category: "ТВ", image: "https://picsum.photos/seed/tvstick/600/400" },
  { id: "p46", name: "Game Console Mini", price: 899000, category: "Тоглоом", image: "https://picsum.photos/seed/console/600/400" }
];

// Demo credentials (as user requested)
const DEMO_USER = { username: "mojuh", password: "admin123", role: "admin" };

// ---------- State helpers ----------
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function formatMNT(amount) {
  // 129000 -> "129,000 ₮"
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₮";
}
function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString("mn-MN");
  } catch {
    return "";
  }
}
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}
function setQueryParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  });
  window.history.replaceState(null, "", url.toString());
}
function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeUsername(name) {
  return (name || "").trim().toLowerCase();
}

function isUsernameTaken(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return false;
  return state.users.some((u) => normalizeUsername(u.username) === normalized);
}

function findUser(username, password) {
  const normalized = normalizeUsername(username);
  if (!normalized) return null;

  const match = state.users.find(
    (u) => normalizeUsername(u.username) === normalized && u.password === password
  );

  return match ? { username: match.username, role: match.role || "user" } : null;
}

function getUserRecord(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return null;
  return state.users.find((u) => normalizeUsername(u.username) === normalized) || null;
}


const state = {
  user: null,
  cart: {},       // { productId: qty }
  products: [],
  users: [],
  wishlist: [],
  orders: [],
  productIndex: new Map()
};

function initState() {
  state.user = loadJSON(LS_KEYS.USER, null);
  state.cart = loadJSON(LS_KEYS.CART, {});
  const storedProducts = loadJSON(LS_KEYS.PRODUCTS, null);
  const defaultProducts = DEFAULT_PRODUCTS.slice();

  if (Array.isArray(storedProducts)) {
    const byId = new Map(storedProducts.map((p) => [p.id, p]));
    defaultProducts.forEach((p) => {
      const existing = byId.get(p.id);
      if (existing) {
        if (!existing.image) existing.image = p.image;
      } else {
        storedProducts.push(p);
      }
    });
    state.products = storedProducts;
  } else {
    state.products = defaultProducts;
  }

  const categoryAliases = {
    "Аялах": "Аялал"
  };

  state.products.forEach((p) => {
    const alias = categoryAliases[p.category];
    if (alias) p.category = alias;
  });

  const storedUsers = loadJSON(LS_KEYS.USERS, []);
  state.users = Array.isArray(storedUsers) ? storedUsers : [];

  if (!state.users.some((u) => normalizeUsername(u.username) === normalizeUsername(DEMO_USER.username))) {
    state.users.unshift({
      username: DEMO_USER.username,
      password: DEMO_USER.password,
      role: "admin",
      profile: {}
    });
  }

  const storedWishlist = loadJSON(LS_KEYS.WISHLIST, []);
  state.wishlist = Array.isArray(storedWishlist) ? storedWishlist : [];

  const storedOrders = loadJSON(LS_KEYS.ORDERS, []);
  state.orders = Array.isArray(storedOrders) ? storedOrders : [];

  if (state.user) {
    const record = getUserRecord(state.user.username);
    if (record && !state.user.role) {
      state.user.role = record.role || "user";
      saveJSON(LS_KEYS.USER, state.user);
    }
  }

  state.wishlist = Array.from(new Set(state.wishlist));
  state.wishlist = state.wishlist.filter((id) => state.products.some((p) => p.id === id));

  buildProductIndex();
  saveJSON(LS_KEYS.USERS, state.users);
  saveJSON(LS_KEYS.PRODUCTS, state.products); // ensure stored once
}

function setUser(userObjOrNull) {
  state.user = userObjOrNull;
  saveJSON(LS_KEYS.USER, state.user);
  renderAuthArea();
}

function setCart(cartObj) {
  state.cart = cartObj;
  saveJSON(LS_KEYS.CART, state.cart);
  renderCartBadge();
  renderCartDrawer();
}

function buildProductIndex() {
  state.productIndex = new Map(state.products.map((p) => [p.id, p]));
}

function getProductById(id) {
  if (!state.productIndex || state.productIndex.size === 0) buildProductIndex();
  return state.productIndex.get(id) || null;
}

function setWishlist(list) {
  state.wishlist = list;
  saveJSON(LS_KEYS.WISHLIST, state.wishlist);
  renderWishlistBadge();
  renderWishlistDrawer();

  const page = document.body.dataset.page;
  if (page === "main") renderProductSection();
  if (page === "profile") renderProfileWishlist();
}

function isWishlisted(pid) {
  return state.wishlist.includes(pid);
}

function toggleWishlist(pid) {
  const next = state.wishlist.includes(pid)
    ? state.wishlist.filter((id) => id !== pid)
    : [pid, ...state.wishlist];
  setWishlist(next);
}

function setOrders(list) {
  state.orders = list;
  saveJSON(LS_KEYS.ORDERS, state.orders);
}

function addOrder(order) {
  const next = [order, ...state.orders];
  setOrders(next);
}

// ---------- Cart ----------
function cartCount() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}
function cartTotal() {
  let total = 0;
  for (const [pid, qty] of Object.entries(state.cart)) {
    const p = getProductById(pid);
    if (p) total += p.price * qty;
  }
  return total;
}
function addToCart(pid, qty = 1) {
  const next = { ...state.cart };
  next[pid] = (next[pid] || 0) + qty;
  if (next[pid] <= 0) delete next[pid];
  setCart(next);
}
function setQty(pid, qty) {
  const next = { ...state.cart };
  if (qty <= 0) delete next[pid];
  else next[pid] = qty;
  setCart(next);
}

// ---------- UI: Header auth + dropdown ----------
function renderAuthArea() {
  const wrap = document.querySelector("#authArea");
  if (!wrap) return;

  // Clear
  wrap.innerHTML = "";

  if (!state.user) {
    const login = document.createElement("a");
    login.className = "btn primary";
    login.href = "login.html";
    login.textContent = "Нэвтрэх";

    const register = document.createElement("a");
    register.className = "btn";
    register.href = "register.html";
    register.textContent = "Бүртгүүлэх";

    wrap.appendChild(login);
    wrap.appendChild(register);
    return;
  }

  const userWrap = document.createElement("div");
  userWrap.className = "user-wrap";

  const userBtn = document.createElement("button");
  userBtn.className = "btn";
  userBtn.type = "button";
  userBtn.id = "userBtn";
  userBtn.textContent = state.user.username;

  const dd = document.createElement("div");
  dd.className = "dropdown";
  dd.id = "userDropdown";

  const info = document.createElement("div");
  info.style.padding = "8px 10px";
  const roleLabel = state.user.role === "admin" ? "Админ" : "Хэрэглэгч";
  info.innerHTML = `<div style="font-weight:700">${state.user.username}</div><div class="small">${roleLabel}</div>`;
  dd.appendChild(info);

  const profileLink = document.createElement("a");
  profileLink.href = "profile.html";
  profileLink.textContent = "Профайл";
  dd.appendChild(profileLink);

  const logoutBtn = document.createElement("button");
  logoutBtn.type = "button";
  logoutBtn.textContent = "Logout";
  logoutBtn.addEventListener("click", () => {
    setUser(null);
    const page = document.body.dataset.page;
    if (page === "admin" || page === "profile") {
      window.location.href = "login.html";
    }
  });
  dd.appendChild(logoutBtn);

  userBtn.addEventListener("click", () => {
    dd.classList.toggle("show");
  });

  // outside click close
  document.addEventListener("click", (e) => {
    if (!userWrap.contains(e.target)) dd.classList.remove("show");
  });

  userWrap.appendChild(userBtn);
  userWrap.appendChild(dd);

  wrap.appendChild(userWrap);
}

function renderCartBadge() {
  const badge = document.querySelector("#cartBadge");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

function renderWishlistBadge() {
  const badge = document.querySelector("#wishBadge");
  if (!badge) return;
  const count = state.wishlist.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

function setupSearch() {
  const form = document.querySelector("#searchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#searchInput");
    const q = (input?.value || "").trim();
    // хайлт үргэлж үндсэн (бараа) хуудас руу
    window.location.href = `main.html?q=${encodeURIComponent(q)}&page=1#products`;
  });
}

// ---------- Cart Drawer ----------
function setupCartDrawer() {
  const openBtn = document.querySelector("#openCart");
  const closeBtn = document.querySelector("#closeCart");
  const backdrop = document.querySelector("#drawerBackdrop");
  const drawer = document.querySelector("#cartDrawer");

  if (!openBtn || !closeBtn || !backdrop || !drawer) return;

  function open() {
    backdrop.classList.add("show");
    drawer.classList.add("open");
    renderCartDrawer();
  }
  function close() {
    backdrop.classList.remove("show");
    drawer.classList.remove("open");
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  renderCartDrawer();
}

function ensureWishlistDrawer() {
  if (document.querySelector("#wishlistDrawer")) return;

  const backdrop = document.createElement("div");
  backdrop.id = "wishBackdrop";
  backdrop.className = "drawer-backdrop";
  backdrop.setAttribute("aria-hidden", "true");

  const drawer = document.createElement("aside");
  drawer.id = "wishlistDrawer";
  drawer.className = "drawer";
  drawer.setAttribute("aria-label", "Wishlist");

  drawer.innerHTML = `
    <div class="drawer-head">
      <b>Wishlist</b>
      <button id="closeWishlist" class="btn" type="button">Хаах ✕</button>
    </div>
    <div class="drawer-body">
      <div id="wishList"></div>
    </div>
    <div class="drawer-foot">
      <div class="total-row">
        <span>Нийт</span>
        <b id="wishTotal">0</b>
      </div>
      <a class="btn primary" href="profile.html">Профайл руу очих</a>
    </div>
  `;

  document.body.append(backdrop, drawer);
}

function setupWishlistDrawer() {
  const openBtn = document.querySelector("#openWishlist");
  const closeBtn = document.querySelector("#closeWishlist");
  const backdrop = document.querySelector("#wishBackdrop");
  const drawer = document.querySelector("#wishlistDrawer");

  if (!openBtn || !closeBtn || !backdrop || !drawer) return;

  function open() {
    backdrop.classList.add("show");
    drawer.classList.add("open");
    renderWishlistDrawer();
  }
  function close() {
    backdrop.classList.remove("show");
    drawer.classList.remove("open");
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  renderWishlistDrawer();
}

function renderCartDrawer() {
  const list = document.querySelector("#cartList");
  const totalEl = document.querySelector("#cartTotal");
  const checkoutBtn = document.querySelector("#checkoutBtn");
  if (!list || !totalEl) return;

  const items = Object.entries(state.cart);

  if (items.length === 0) {
    list.innerHTML = `<div class="muted">Сагс хоосон байна.</div>`;
    totalEl.textContent = formatMNT(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  list.innerHTML = "";

  for (const [pid, qty] of items) {
    const p = getProductById(pid);
    if (!p) continue;

    const row = document.createElement("div");
    row.className = "cart-item";

    const thumb = document.createElement("div");
    thumb.className = "cart-thumb";
    if (p.image) {
      thumb.style.setProperty("--img", `url('${encodeURI(p.image)}')`);
    }

    const info = document.createElement("div");
    info.className = "cart-info";
    info.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="sub">${formatMNT(p.price)} • ${p.category}</div>
    `;

    const qtyWrap = document.createElement("div");
    qtyWrap.className = "qty";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.addEventListener("click", () => setQty(pid, qty - 1));

    const q = document.createElement("span");
    q.textContent = qty;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.addEventListener("click", () => setQty(pid, qty + 1));

    qtyWrap.appendChild(minus);
    qtyWrap.appendChild(q);
    qtyWrap.appendChild(plus);

    row.appendChild(thumb);
    row.appendChild(info);
    row.appendChild(qtyWrap);

    list.appendChild(row);
  }

  totalEl.textContent = formatMNT(cartTotal());
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function renderWishlistDrawer() {
  const list = document.querySelector("#wishList");
  const totalEl = document.querySelector("#wishTotal");
  if (!list || !totalEl) return;

  if (state.wishlist.length === 0) {
    list.innerHTML = `<div class="muted">Wishlist хоосон байна.</div>`;
    totalEl.textContent = "0";
    return;
  }

  list.innerHTML = "";
  const items = state.wishlist.map((id) => getProductById(id)).filter(Boolean);
  totalEl.textContent = items.length;

  items.forEach((p) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const thumb = document.createElement("div");
    thumb.className = "cart-thumb";
    if (p.image) {
      thumb.style.setProperty("--img", `url('${encodeURI(p.image)}')`);
    }

    const info = document.createElement("div");
    info.className = "cart-info";
    info.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="sub">${formatMNT(p.price)} • ${p.category}</div>
    `;

    const actions = document.createElement("div");
    actions.className = "qty";

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.textContent = "+";
    addBtn.title = "Сагсанд нэмэх";
    addBtn.addEventListener("click", () => addToCart(p.id, 1));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "✕";
    removeBtn.title = "Хасах";
    removeBtn.addEventListener("click", () => toggleWishlist(p.id));

    actions.appendChild(addBtn);
    actions.appendChild(removeBtn);

    row.appendChild(thumb);
    row.appendChild(info);
    row.appendChild(actions);

    list.appendChild(row);
  });
}

function ensureCheckoutModal() {
  if (document.querySelector("#checkoutModal")) return;

  const backdrop = document.createElement("div");
  backdrop.id = "checkoutBackdrop";
  backdrop.className = "modal-backdrop";

  const modal = document.createElement("div");
  modal.id = "checkoutModal";
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  modal.innerHTML = `
    <div class="modal-head">
      <b>Захиалга баталгаажуулах</b>
      <button id="closeCheckout" class="btn" type="button">Хаах ✕</button>
    </div>
    <div class="modal-body">
      <form id="checkoutForm" class="form">
        <div class="field">
          <label for="checkoutName">Нэр</label>
          <input id="checkoutName" required />
        </div>
        <div class="field">
          <label for="checkoutPhone">Утас</label>
          <input id="checkoutPhone" required />
        </div>
        <div class="field">
          <label for="checkoutAddress">Хаяг</label>
          <input id="checkoutAddress" required />
        </div>
        <div class="checkout-summary">
          <div id="checkoutItems" class="summary-list"></div>
          <div class="total-row">
            <span>Нийт</span>
            <b id="checkoutTotal">0 ₮</b>
          </div>
        </div>
        <button class="btn primary" type="submit">Захиалах</button>
        <p id="checkoutMsg" class="small" style="margin-top:10px"></p>
      </form>
    </div>
  `;

  document.body.append(backdrop, modal);
}

function setupCheckoutModal() {
  const checkoutBtn = document.querySelector("#checkoutBtn");
  const modal = document.querySelector("#checkoutModal");
  const backdrop = document.querySelector("#checkoutBackdrop");
  const closeBtn = document.querySelector("#closeCheckout");
  const form = document.querySelector("#checkoutForm");
  const msg = document.querySelector("#checkoutMsg");

  if (!checkoutBtn || !modal || !backdrop || !closeBtn || !form) return;

  function open() {
    if (cartCount() === 0) return;
    const record = state.user ? getUserRecord(state.user.username) : null;
    if (record && record.profile) {
      document.querySelector("#checkoutName").value = record.profile.name || "";
      document.querySelector("#checkoutPhone").value = record.profile.phone || "";
      document.querySelector("#checkoutAddress").value = record.profile.address || "";
    }
    renderCheckoutSummary();
    backdrop.classList.add("show");
    modal.classList.add("show");
  }
  function close() {
    backdrop.classList.remove("show");
    modal.classList.remove("show");
  }

  checkoutBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msg) {
      msg.textContent = "";
      msg.style.color = "";
    }

    const name = document.querySelector("#checkoutName").value.trim();
    const phone = document.querySelector("#checkoutPhone").value.trim();
    const address = document.querySelector("#checkoutAddress").value.trim();

    if (!name || !phone || !address) {
      if (msg) {
        msg.textContent = "Нэр, утас, хаягийг бөглөнө үү.";
        msg.style.color = "var(--bad)";
      }
      return;
    }

    const items = Object.entries(state.cart).map(([id, qty]) => {
      const p = getProductById(id);
      return {
        id,
        name: p ? p.name : id,
        price: p ? p.price : 0,
        qty
      };
    });

    const order = {
      id: "o" + Date.now(),
      createdAt: Date.now(),
      items,
      total: cartTotal(),
      shipping: { name, phone, address },
      status: "Хүлээгдэж байна"
    };

    addOrder(order);
    setCart({});
    close();
    alert("Захиалга амжилттай! (Demo)");

    if (document.body.dataset.page === "profile") {
      renderOrderList();
    }
  });
}

function renderCheckoutSummary() {
  const itemsWrap = document.querySelector("#checkoutItems");
  const totalEl = document.querySelector("#checkoutTotal");
  if (!itemsWrap || !totalEl) return;

  itemsWrap.innerHTML = "";
  const items = Object.entries(state.cart).map(([id, qty]) => {
    const p = getProductById(id);
    return {
      id,
      qty,
      name: p ? p.name : id,
      price: p ? p.price : 0
    };
  });

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "summary-item";
    row.innerHTML = `<span>${item.name} × ${item.qty}</span><b>${formatMNT(item.price * item.qty)}</b>`;
    itemsWrap.appendChild(row);
  });

  totalEl.textContent = formatMNT(cartTotal());
}

// ---------- Pages ----------
function initHomePage() {
  // nothing special
}

const MAIN_DEFAULTS = {
  q: "",
  category: "",
  sort: "new",
  page: 1,
  pageSize: 12,
  minPrice: null,
  maxPrice: null,
  onlyWishlist: false
};

let mainFilters = { ...MAIN_DEFAULTS };

function loadMainFilters() {
  mainFilters = { ...MAIN_DEFAULTS };
  const q = getQueryParam("q").trim();
  const category = getQueryParam("cat");
  const sort = getQueryParam("sort");
  const page = toNumber(getQueryParam("page"));
  const pageSize = toNumber(getQueryParam("ps"));
  const minPrice = toNumber(getQueryParam("min"));
  const maxPrice = toNumber(getQueryParam("max"));
  const onlyWishlist = getQueryParam("wish") === "1";

  mainFilters.q = q;
  mainFilters.category = category;
  if (sort) mainFilters.sort = sort;
  if (page && page > 0) mainFilters.page = page;
  if (pageSize && pageSize > 0) mainFilters.pageSize = pageSize;
  mainFilters.minPrice = minPrice;
  mainFilters.maxPrice = maxPrice;
  mainFilters.onlyWishlist = onlyWishlist;
}

function syncFilterInputs() {
  const sortSelect = document.querySelector("#sortSelect");
  const pageSize = document.querySelector("#pageSize");
  const minInput = document.querySelector("#minPrice");
  const maxInput = document.querySelector("#maxPrice");
  const wishSelect = document.querySelector("#onlyWishlist");

  if (sortSelect) sortSelect.value = mainFilters.sort;
  if (pageSize) pageSize.value = String(mainFilters.pageSize);
  if (minInput) minInput.value = mainFilters.minPrice ?? "";
  if (maxInput) maxInput.value = mainFilters.maxPrice ?? "";
  if (wishSelect) wishSelect.value = mainFilters.onlyWishlist ? "only" : "all";
}

function updateQueryFromFilters() {
  setQueryParams({
    q: mainFilters.q || "",
    cat: mainFilters.category || "",
    sort: mainFilters.sort || "",
    page: mainFilters.page || 1,
    ps: mainFilters.pageSize || 12,
    min: mainFilters.minPrice ?? "",
    max: mainFilters.maxPrice ?? "",
    wish: mainFilters.onlyWishlist ? "1" : ""
  });
}

function getFilteredProducts() {
  const q = mainFilters.q.toLowerCase();
  return state.products.filter((p) => {
    const matchesQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchesCat = !mainFilters.category || p.category === mainFilters.category;
    const matchesMin = mainFilters.minPrice === null || p.price >= mainFilters.minPrice;
    const matchesMax = mainFilters.maxPrice === null || p.price <= mainFilters.maxPrice;
    const matchesWish = !mainFilters.onlyWishlist || isWishlisted(p.id);
    return matchesQ && matchesCat && matchesMin && matchesMax && matchesWish;
  });
}

function sortProducts(list) {
  const sorted = list.slice();
  if (mainFilters.sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (mainFilters.sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (mainFilters.sort === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "mn"));
  }
  return sorted;
}

function renderPagination(total, pageSize, page) {
  const wrap = document.querySelector("#pagination");
  if (!wrap) return;
  wrap.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return;

  function addBtn(label, target, disabled, active) {
    const btn = document.createElement("button");
    btn.className = "btn" + (active ? " active" : "");
    btn.type = "button";
    btn.textContent = label;
    if (disabled) btn.disabled = true;
    btn.addEventListener("click", () => {
      if (disabled) return;
      mainFilters.page = target;
      updateQueryFromFilters();
      renderProductSection();
    });
    wrap.appendChild(btn);
  }

  addBtn("←", Math.max(1, page - 1), page === 1, false);

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i += 1) {
    addBtn(String(i), i, false, i === page);
  }

  addBtn("→", Math.min(totalPages, page + 1), page === totalPages, false);
}

function renderCategoryChips() {
  const catWrap = document.querySelector("#categoryChips");
  if (!catWrap) return;

  const cats = Array.from(new Set(state.products.map(p => p.category))).sort(
    (a, b) => a.localeCompare(b, "mn")
  );

  if (mainFilters.category && !cats.includes(mainFilters.category)) {
    mainFilters.category = "";
    updateQueryFromFilters();
  }

  catWrap.innerHTML = "";

  const all = document.createElement("button");
  all.className = "btn" + (mainFilters.category ? "" : " active");
  all.type = "button";
  all.textContent = "Бүгд";
  all.addEventListener("click", () => {
    mainFilters.category = "";
    mainFilters.page = 1;
    updateQueryFromFilters();
    renderCategoryChips();
    renderProductSection();
  });
  catWrap.appendChild(all);

  cats.forEach(c => {
    const b = document.createElement("button");
    b.className = "btn" + (mainFilters.category === c ? " active" : "");
    b.type = "button";
    b.textContent = c;
    b.addEventListener("click", () => {
      mainFilters.category = c;
      mainFilters.page = 1;
      updateQueryFromFilters();
      renderCategoryChips();
      renderProductSection();
    });
    catWrap.appendChild(b);
  });
}

function renderProductSection() {
  const grid = document.querySelector("#productGrid");
  const hint = document.querySelector("#filterHint");
  if (!grid) return;

  const filtered = sortProducts(getFilteredProducts());
  const totalPages = Math.max(1, Math.ceil(filtered.length / mainFilters.pageSize));
  if (mainFilters.page > totalPages) {
    mainFilters.page = totalPages;
    updateQueryFromFilters();
  }

  const start = (mainFilters.page - 1) * mainFilters.pageSize;
  const pageItems = filtered.slice(start, start + mainFilters.pageSize);

  grid.innerHTML = "";

  if (pageItems.length === 0) {
    grid.innerHTML = `<div class="muted">Бараа олдсонгүй.</div>`;
  } else {
    pageItems.forEach((p) => grid.appendChild(createProductCard(p)));
    bindProductActions(grid);
  }

  if (hint) {
    const parts = [];
    if (mainFilters.q) parts.push(`Хайлт: "${mainFilters.q}"`);
    if (mainFilters.category) parts.push(`Ангилал: ${mainFilters.category}`);
    if (mainFilters.minPrice !== null || mainFilters.maxPrice !== null) {
      parts.push(`Үнэ: ${mainFilters.minPrice ?? 0} - ${mainFilters.maxPrice ?? "∞"}`);
    }
    if (mainFilters.onlyWishlist) parts.push("Wishlist");
    hint.textContent = parts.length ? parts.join(" • ") : "Бүх бараа";
  }

  renderPagination(filtered.length, mainFilters.pageSize, mainFilters.page);
}

function setupFilters() {
  const sortSelect = document.querySelector("#sortSelect");
  const pageSize = document.querySelector("#pageSize");
  const minInput = document.querySelector("#minPrice");
  const maxInput = document.querySelector("#maxPrice");
  const wishSelect = document.querySelector("#onlyWishlist");
  const clearBtn = document.querySelector("#clearFilters");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      mainFilters.sort = sortSelect.value;
      mainFilters.page = 1;
      updateQueryFromFilters();
      renderProductSection();
    });
  }

  if (pageSize) {
    pageSize.addEventListener("change", () => {
      mainFilters.pageSize = Number(pageSize.value) || MAIN_DEFAULTS.pageSize;
      mainFilters.page = 1;
      updateQueryFromFilters();
      renderProductSection();
    });
  }

  function applyPriceFilters() {
    mainFilters.minPrice = toNumber(minInput?.value);
    mainFilters.maxPrice = toNumber(maxInput?.value);
    mainFilters.page = 1;
    updateQueryFromFilters();
    renderProductSection();
  }

  if (minInput) {
    minInput.addEventListener("change", applyPriceFilters);
  }
  if (maxInput) {
    maxInput.addEventListener("change", applyPriceFilters);
  }

  if (wishSelect) {
    wishSelect.addEventListener("change", () => {
      mainFilters.onlyWishlist = wishSelect.value === "only";
      mainFilters.page = 1;
      updateQueryFromFilters();
      renderProductSection();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      mainFilters = { ...MAIN_DEFAULTS };
      updateQueryFromFilters();
      syncFilterInputs();
      renderCategoryChips();
      renderProductSection();

      const searchInput = document.querySelector("#searchInput");
      if (searchInput) searchInput.value = "";
    });
  }
}

function createProductCard(p, options = {}) {
  const compact = options.compact || false;
  const showActions = options.showActions !== false;
  const showBuy = !compact;
  const showId = !compact;

  const img = p.image ? encodeURI(p.image) : "";
  const imgStyle = img ? ` style="--img: url('${img}');"` : "";
  const wishActive = isWishlisted(p.id);
  const wishLabel = wishActive ? "❤" : "♡";

  const card = document.createElement("div");
  card.className = compact ? "card compact" : "card";

  const actions = showActions
    ? `<div class="actions">
        <button class="btn primary" data-add="${p.id}">${compact ? "Сагсанд" : "Сагсанд нэмэх"}</button>
        ${showBuy ? `<button class="btn" data-buy="${p.id}">Шууд авах</button>` : ""}
      </div>`
    : "";

  card.innerHTML = `
    <div class="img"${imgStyle}>
      <button class="wish-btn${wishActive ? " active" : ""}" data-wish="${p.id}" type="button" aria-label="Wishlist">${wishLabel}</button>
    </div>
    <div class="body">
      <div class="meta">
        <h3>${p.name}</h3>
        <span class="pill">${p.category}</span>
      </div>
      <div class="meta" style="margin-top:6px">
        <div class="price">${formatMNT(p.price)}</div>
        ${showId ? `<div class="muted">ID: ${p.id}</div>` : ""}
      </div>
      ${actions}
    </div>
  `;

  return card;
}

function bindProductActions(container) {
  container.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add, 1));
  });
  container.querySelectorAll("[data-buy]").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.buy, 1);
      document.querySelector("#openCart")?.click();
    });
  });
  container.querySelectorAll("[data-wish]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.wish;
      toggleWishlist(id);
      const active = isWishlisted(id);
      btn.classList.toggle("active", active);
      btn.textContent = active ? "❤" : "♡";
    });
  });
}

function renderFeatured() {
  const wrap = document.querySelector("#featuredGrid");
  if (!wrap) return;
  const list = [...state.products].sort((a, b) => b.price - a.price).slice(0, 4);
  wrap.innerHTML = "";
  list.forEach((p) => wrap.appendChild(createProductCard(p, { compact: true })));
  bindProductActions(wrap);
}

function renderRecommend() {
  const wrap = document.querySelector("#recommendGrid");
  if (!wrap) return;
  const featuredIds = new Set([...state.products].sort((a, b) => b.price - a.price).slice(0, 4).map((p) => p.id));
  const list = state.products.filter((p) => !featuredIds.has(p.id)).slice(0, 4);
  wrap.innerHTML = "";
  list.forEach((p) => wrap.appendChild(createProductCard(p, { compact: true })));
  bindProductActions(wrap);
}

function renderHeroPick() {
  const nameEl = document.querySelector("#heroPickName");
  const metaEl = document.querySelector("#heroPickMeta");
  const btn = document.querySelector("#heroPickBtn");
  if (!nameEl || !metaEl || !btn) return;

  const pick = [...state.products].sort((a, b) => b.price - a.price)[0];
  if (!pick) return;

  nameEl.textContent = pick.name;
  metaEl.textContent = `${pick.category} • ${formatMNT(pick.price)}`;

  const thumb = document.querySelector(".hero-thumb");
  if (thumb && pick.image) {
    thumb.style.setProperty("--img", `url('${encodeURI(pick.image)}')`);
  }

  btn.addEventListener("click", () => {
    addToCart(pick.id, 1);
    document.querySelector("#openCart")?.click();
  });
}

function initMainPage() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  loadMainFilters();
  syncFilterInputs();
  renderCategoryChips();
  setupFilters();

  const searchInput = document.querySelector("#searchInput");
  if (searchInput && mainFilters.q) searchInput.value = mainFilters.q;

  renderHeroPick();
  renderFeatured();
  renderRecommend();
  renderProductSection();
}

function initLoginPage() {
  const form = document.querySelector("#loginForm");
  const msg = document.querySelector("#loginMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.style.color = "";

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;

    const found = findUser(username, password);
    if (found) {
      setUser(found);
      // admin руу орох боломжтой
      window.location.href = "main.html";
      return;
    }

    msg.textContent = "Нэвтрэх нэр эсвэл нууц үг буруу байна.";
    msg.style.color = "var(--bad)";
  });
}

function initRegisterPage() {
  const form = document.querySelector("#registerForm");
  const msg = document.querySelector("#registerMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.style.color = "";

    const username = document.querySelector("#regUsername").value.trim();
    const password = document.querySelector("#regPassword").value;
    const confirm = document.querySelector("#regConfirm").value;
    const name = document.querySelector("#regName").value.trim();
    const email = document.querySelector("#regEmail").value.trim();

    if (username.length < 3) {
      msg.textContent = "Нэвтрэх нэр хамгийн багадаа 3 тэмдэгт байна.";
      msg.style.color = "var(--bad)";
      return;
    }

    if (password.length < 6) {
      msg.textContent = "Нууц үг хамгийн багадаа 6 тэмдэгт байна.";
      msg.style.color = "var(--bad)";
      return;
    }

    if (password !== confirm) {
      msg.textContent = "Нууц үг давталт таарахгүй байна.";
      msg.style.color = "var(--bad)";
      return;
    }

    if (isUsernameTaken(username)) {
      msg.textContent = "Энэ нэвтрэх нэр бүртгэлтэй байна.";
      msg.style.color = "var(--bad)";
      return;
    }

    state.users.push({
      username,
      password,
      role: "user",
      profile: { name, email, phone: "", address: "" }
    });
    saveJSON(LS_KEYS.USERS, state.users);

    setUser({ username, role: "user" });
    window.location.href = "main.html";
  });
}

function initProfilePage() {
  if (!state.user) {
    window.location.href = "login.html";
    return;
  }

  const usernameEl = document.querySelector("#profileUsername");
  const roleEl = document.querySelector("#profileRole");
  const form = document.querySelector("#profileForm");
  const msg = document.querySelector("#profileMsg");
  const wishlistGrid = document.querySelector("#wishlistGrid");

  const record = getUserRecord(state.user.username);
  if (!record) return;

  const roleLabel = record.role === "admin" ? "Админ" : "Хэрэглэгч";
  if (usernameEl) usernameEl.textContent = record.username;
  if (roleEl) roleEl.textContent = roleLabel;

  if (form) {
    form.querySelector("#profileName").value = record.profile?.name || "";
    form.querySelector("#profileEmail").value = record.profile?.email || "";
    form.querySelector("#profilePhone").value = record.profile?.phone || "";
    form.querySelector("#profileAddress").value = record.profile?.address || "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#profileName").value.trim();
      const email = form.querySelector("#profileEmail").value.trim();
      const phone = form.querySelector("#profilePhone").value.trim();
      const address = form.querySelector("#profileAddress").value.trim();

      record.profile = { name, email, phone, address };
      saveJSON(LS_KEYS.USERS, state.users);

      if (msg) {
        msg.textContent = "Хадгалагдлаа.";
        msg.style.color = "var(--good)";
      }
    });
  }

  renderProfileWishlist();

  renderOrderList();
  setupAdminPanel();
}

function renderProfileWishlist() {
  const wishlistGrid = document.querySelector("#wishlistGrid");
  if (!wishlistGrid) return;

  wishlistGrid.innerHTML = "";
  const items = state.wishlist.map((id) => getProductById(id)).filter(Boolean);
  if (items.length === 0) {
    wishlistGrid.innerHTML = `<div class="muted">Wishlist хоосон байна.</div>`;
    return;
  }

  items.forEach((p) => wishlistGrid.appendChild(createProductCard(p, { compact: true })));
  bindProductActions(wishlistGrid);
}

function renderOrderList() {
  const list = document.querySelector("#orderList");
  if (!list) return;

  if (!state.orders.length) {
    list.innerHTML = `<div class="muted">Захиалга алга.</div>`;
    return;
  }

  list.innerHTML = "";
  state.orders.forEach((order) => {
    const row = document.createElement("div");
    row.className = "order-item";
    row.innerHTML = `
      <div>
        <div style="font-weight:700">#${order.id}</div>
        <div class="small muted">${formatDate(order.createdAt)}</div>
        <div class="small muted">${order.items.length} нэр төрөл</div>
      </div>
      <div>
        <div style="font-weight:700">${formatMNT(order.total)}</div>
        <div class="small">${order.status || "Хүлээгдэж байна"}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

function setupAdminPanel() {
  const panel = document.querySelector("#adminPanel");
  const form = document.querySelector("#adminProductForm");
  const list = document.querySelector("#adminProductList");

  if (!panel || !form || !list) return;
  if (!state.user || state.user.role !== "admin") {
    panel.style.display = "none";
    return;
  }

  panel.style.display = "block";

  function renderAdminList() {
    list.innerHTML = "";
    state.products.forEach((p) => {
      const row = document.createElement("div");
      row.className = "card";
      row.style.padding = "14px";
      row.innerHTML = `
        <div class="meta">
          <div>
            <div style="font-weight:800">${p.name}</div>
            <div class="muted small">${p.category} • ${formatMNT(p.price)} • ${p.id}</div>
          </div>
          <div style="display:flex; gap:8px">
            <button class="btn" data-edit="${p.id}">Засах</button>
            <button class="btn danger" data-del="${p.id}">Устгах</button>
          </div>
        </div>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.del;
        state.products = state.products.filter((p) => p.id !== id);
        saveJSON(LS_KEYS.PRODUCTS, state.products);

        const nextCart = { ...state.cart };
        if (nextCart[id]) {
          delete nextCart[id];
          setCart(nextCart);
        }

        buildProductIndex();
        renderAdminList();
        if (document.body.dataset.page === "main") {
          renderCategoryChips();
          renderProductSection();
          renderFeatured();
          renderRecommend();
        }
      });
    });

    list.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.edit;
        const p = state.products.find((x) => x.id === id);
        if (!p) return;

        const newName = prompt("Барааны нэр:", p.name) ?? p.name;
        const newPriceRaw = prompt("Үнэ (тоо):", String(p.price)) ?? String(p.price);
        const newCat = prompt("Ангилал:", p.category) ?? p.category;
        const newImg = prompt("Зураг (URL):", p.image || "") ?? p.image;

        const newPrice = Number(newPriceRaw);
        if (!Number.isFinite(newPrice) || newPrice <= 0) {
          alert("Үнэ буруу байна.");
          return;
        }

        p.name = newName.trim() || p.name;
        p.price = newPrice;
        p.category = newCat.trim() || p.category;
        p.image = newImg?.trim() || p.image;

        saveJSON(LS_KEYS.PRODUCTS, state.products);
        buildProductIndex();
        renderAdminList();
        if (document.body.dataset.page === "main") {
          renderCategoryChips();
          renderProductSection();
          renderFeatured();
          renderRecommend();
        }
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#adminPName").value.trim();
    const price = Number(document.querySelector("#adminPPrice").value);
    const category = document.querySelector("#adminPCategory").value.trim();
    const image = document.querySelector("#adminPImage").value.trim();

    if (!name || !Number.isFinite(price) || price <= 0 || !category) {
      alert("Нэр, үнэ, ангиллыг зөв бөглөнө үү.");
      return;
    }

    const id = "p" + Math.random().toString(16).slice(2, 7);
    const img = image || `https://picsum.photos/seed/${id}/600/400`;
    state.products.unshift({ id, name, price, category, image: img });
    saveJSON(LS_KEYS.PRODUCTS, state.products);

    form.reset();
    buildProductIndex();
    renderAdminList();
    if (document.body.dataset.page === "main") {
      renderCategoryChips();
      renderProductSection();
      renderFeatured();
      renderRecommend();
    }
  });

  renderAdminList();
}

function initAdminPage() {
  // require login
  if (!state.user || state.user.role !== "admin") {
    window.location.href = "login.html";
    return;
  }

  const form = document.querySelector("#addProductForm");
  const list = document.querySelector("#adminProductList");
  if (!form || !list) return;

  function renderAdminList() {
    list.innerHTML = "";
    state.products.forEach(p => {
      const row = document.createElement("div");
      row.className = "card";
      row.style.padding = "14px";
      row.innerHTML = `
        <div class="meta">
          <div>
            <div style="font-weight:800">${p.name}</div>
            <div class="muted small">${p.category} • ${formatMNT(p.price)} • ${p.id}</div>
          </div>
          <div style="display:flex; gap:8px">
            <button class="btn" data-edit="${p.id}">Засах</button>
            <button class="btn danger" data-del="${p.id}">Устгах</button>
          </div>
        </div>
      `;
      list.appendChild(row);
    });

    // delete
    list.querySelectorAll("[data-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.del;
        state.products = state.products.filter(p => p.id !== id);
        saveJSON(LS_KEYS.PRODUCTS, state.products);
        buildProductIndex();

        // cart-аас устгах
        const nextCart = { ...state.cart };
        if (nextCart[id]) {
          delete nextCart[id];
          setCart(nextCart);
        }

        renderAdminList();
      });
    });

    // edit (simple: prompt)
    list.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.edit;
        const p = state.products.find(x => x.id === id);
        if (!p) return;

        const newName = prompt("Барааны нэр:", p.name) ?? p.name;
        const newPriceRaw = prompt("Үнэ (тоо):", String(p.price)) ?? String(p.price);
        const newCat = prompt("Ангилал:", p.category) ?? p.category;

        const newPrice = Number(newPriceRaw);
        if (!Number.isFinite(newPrice) || newPrice <= 0) {
          alert("Үнэ буруу байна.");
          return;
        }

        p.name = newName.trim() || p.name;
        p.price = newPrice;
        p.category = newCat.trim() || p.category;

        saveJSON(LS_KEYS.PRODUCTS, state.products);
        buildProductIndex();
        renderAdminList();
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#pName").value.trim();
    const price = Number(document.querySelector("#pPrice").value);
    const category = document.querySelector("#pCategory").value.trim();

    if (!name || !Number.isFinite(price) || price <= 0 || !category) {
      alert("Нэр, үнэ, ангиллыг зөв бөглөнө үү.");
      return;
    }

    const id = "p" + Math.random().toString(16).slice(2, 7);
    state.products.unshift({ id, name, price, category });
    saveJSON(LS_KEYS.PRODUCTS, state.products);
    buildProductIndex();

    form.reset();
    renderAdminList();
  });

  renderAdminList();
}

function initContactPage() {
  const form = document.querySelector("#contactForm");
  const msg = document.querySelector("#contactMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "Баярлалаа! Таны хүсэлтийг хүлээн авлаа. (Demo — сервергүй)";
    msg.style.color = "var(--good)";
    form.reset();
  });
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  initState();
  setupSearch();
  setupCartDrawer();
  ensureWishlistDrawer();
  setupWishlistDrawer();
  ensureCheckoutModal();
  setupCheckoutModal();

  renderAuthArea();
  renderCartBadge();
  renderWishlistBadge();

  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "main") initMainPage();
  if (page === "login") initLoginPage();
  if (page === "register") initRegisterPage();
  if (page === "profile") initProfilePage();
  if (page === "admin") initAdminPage();
  if (page === "contact") initContactPage();
});
