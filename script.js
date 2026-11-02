
/* =========================================================
   BETTALUXE | PREMIUM BETTA FISH STORE
   Product Catalog, Search, Filter, Cart & WhatsApp
========================================================= */


/* =========================================================
   01. STORE CONFIGURATION
========================================================= */

const STORE = {
    name: "BETTALUXE",
    whatsapp: "6281234567890"
};


/* =========================================================
   02. PRODUCT DATABASE
========================================================= */

// Foto produk menggunakan file lokal di assets/products/.
// Sesuaikan nama file dengan foto ikan milikmu.

const products = [
    {
        id: 1,
        code: "BT-HMPK-001",
        name: "Red Dragon HMPK",
        category: "HMPK",
        price: 150000,
        stock: 3,
        size: "M",
        color: "Red Dragon",
        gender: "Jantan",
        image: "assets/products/red-dragon-hmpk.jpg",
        description: "HMPK dengan dominasi warna merah dan karakter dragon."
    },
    {
        id: 2,
        code: "BT-HMPK-002",
        name: "Blue Rim HMPK",
        category: "HMPK",
        price: 175000,
        stock: 2,
        size: "M",
        color: "Blue Rim",
        gender: "Jantan",
        image: "assets/products/blue-rim-hmpk.jpg",
        description: "HMPK dengan warna biru dan tepian sirip yang kontras."
    },
    {
        id: 3,
        code: "BT-HMPK-003",
        name: "Koi Galaxy HMPK",
        category: "HMPK",
        price: 180000,
        stock: 2,
        size: "M",
        color: "Koi Galaxy",
        gender: "Jantan",
        image: "assets/products/koi-galaxy-hmpk.jpg",
        description: "Corak koi galaxy dengan kombinasi warna yang menarik."
    },
    {
        id: 4,
        code: "BT-HMPK-004",
        name: "Black Copper HMPK",
        category: "HMPK",
        price: 200000,
        stock: 1,
        size: "M",
        color: "Black Copper",
        gender: "Jantan",
        image: "assets/products/black-copper-hmpk.jpg",
        description: "HMPK bernuansa gelap dengan kilau copper."
    },
    {
        id: 5,
        code: "BT-PLK-001",
        name: "Fancy Plakat",
        category: "Plakat",
        price: 85000,
        stock: 4,
        size: "M",
        color: "Fancy",
        gender: "Jantan",
        image: "assets/products/fancy-plakat.jpg",
        description: "Plakat dengan perpaduan warna fancy yang menawan."
    },
    {
        id: 6,
        code: "BT-PLK-002",
        name: "Nemo Plakat",
        category: "Plakat",
        price: 100000,
        stock: 3,
        size: "M",
        color: "Nemo",
        gender: "Jantan",
        image: "assets/products/nemo-plakat.jpg",
        description: "Plakat dengan kombinasi warna bergaya nemo."
    },
    {
        id: 7,
        code: "BT-PLK-003",
        name: "Avatar Plakat",
        category: "Plakat",
        price: 125000,
        stock: 2,
        size: "M",
        color: "Avatar",
        gender: "Jantan",
        image: "assets/products/avatar-plakat.jpg",
        description: "Plakat dengan nuansa warna avatar yang khas."
    },
    {
        id: 8,
        code: "BT-PLK-004",
        name: "Super Red Plakat",
        category: "Plakat",
        price: 110000,
        stock: 0,
        size: "M",
        color: "Super Red",
        gender: "Jantan",
        image: "assets/products/super-red-plakat.jpg",
        description: "Plakat dengan warna merah dominan."
    },
    {
        id: 9,
        code: "BT-GNT-001",
        name: "Giant Multicolor",
        category: "Giant",
        price: 200000,
        stock: 2,
        size: "Giant",
        color: "Multicolor",
        gender: "Jantan",
        image: "assets/products/giant-multicolor.jpg",
        description: "Cupang giant dengan perpaduan beberapa warna."
    },
    {
        id: 10,
        code: "BT-GNT-002",
        name: "Giant Super Red",
        category: "Giant",
        price: 225000,
        stock: 1,
        size: "Giant",
        color: "Super Red",
        gender: "Jantan",
        image: "assets/products/giant-super-red.jpg",
        description: "Giant dengan warna merah yang dominan."
    },
    {
        id: 11,
        code: "BT-GNT-003",
        name: "Giant Blue",
        category: "Giant",
        price: 210000,
        stock: 2,
        size: "Giant",
        color: "Blue",
        gender: "Jantan",
        image: "assets/products/giant-blue.jpg",
        description: "Giant dengan tampilan warna biru yang elegan."
    },
    {
        id: 12,
        code: "BT-GNT-004",
        name: "Giant Fancy",
        category: "Giant",
        price: 250000,
        stock: 1,
        size: "Giant",
        color: "Fancy",
        gender: "Jantan",
        image: "assets/products/giant-fancy.jpg",
        description: "Giant fancy dengan kombinasi warna menarik."
    }
];


/* =========================================================
   03. DOM ELEMENTS
========================================================= */

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");


/* =========================================================
   04. CART STORAGE
========================================================= */

const CART_STORAGE_KEY = "bettaluxe_cart";

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        );

        if (!Array.isArray(savedCart)) return [];

        return savedCart
            .map(item => {
                const product = products.find(
                    product => product.id === Number(item.id)
                );

                if (!product) return null;

                const quantity = Math.min(
                    Math.max(1, Number(item.quantity) || 1),
                    product.stock
                );

                if (product.stock < 1) return null;

                return {
                    ...product,
                    quantity
                };
            })
            .filter(Boolean);

    } catch (error) {
        return [];
    }
}

let cart = loadCart();

function saveCart() {
    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
            cart.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
        )
    );
}


/* =========================================================
   05. FORMAT RUPIAH
========================================================= */

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}


/* =========================================================
   06. PRODUCT CATALOG
========================================================= */

function displayProducts() {
    if (!productList) return;

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;
    const selectedSort = sortFilter.value;

    let filteredProducts = products.filter(product => {

        const searchableText = [
            product.name,
            product.code,
            product.category,
            product.color,
            product.description
        ].join(" ").toLowerCase();

        const matchSearch = searchableText.includes(keyword);

        const matchCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchSearch && matchCategory;
    });


    // Sorting harga

    if (selectedSort === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }


    // Jika produk tidak ditemukan

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <div class="no-products">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Produk Tidak Ditemukan</h3>
                <p>Coba kata kunci atau kategori lainnya.</p>
            </div>
        `;

        return;
    }


    // Render katalog

    productList.innerHTML = filteredProducts.map(product => {

        const isAvailable = product.stock > 0;

        return `
            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <span class="product-stock ${isAvailable ? "" : "out"}">
                        ${isAvailable
                            ? `Stok: ${product.stock}`
                            : "Sold Out"
                        }
                    </span>

                </div>


                <div class="product-info">

                    <div class="product-meta">
                        <span class="product-code">
                            ${product.code}
                        </span>
                    </div>

                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-specs">
                        <span>${product.color}</span>
                        <span>${product.size}</span>
                        <span>${product.gender}</span>
                    </div>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${formatRupiah(product.price)}
                        </span>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})"
                            ${isAvailable ? "" : "disabled"}
                        >
                            <i class="fa-solid fa-bag-shopping"></i>
                            ${isAvailable ? "Tambah" : "Habis"}
                        </button>

                    </div>

                </div>

            </article>
        `;
    }).join("");
}


/* =========================================================
   07. CATEGORY FILTER
========================================================= */

function filterCategory(category) {
    categoryFilter.value = category;
    displayProducts();
}


/* =========================================================
   08. ADD TO CART
========================================================= */

function addToCart(productId) {
    const product = products.find(
        item => item.id === productId
    );

    if (!product || product.stock <= 0) {
        showNotification("Maaf, produk sedang tidak tersedia.");
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        if (existingItem.quantity >= product.stock) {
            showNotification("Jumlah melebihi stok yang tersedia.");
            return;
        }

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();
    showNotification(`${product.name} ditambahkan ke keranjang.`);
}


/* =========================================================
   09. CHANGE QUANTITY
========================================================= */

function changeQuantity(productId, amount) {
    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    const product = products.find(
        product => product.id === productId
    );

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > product.stock) {
        showNotification("Jumlah melebihi stok yang tersedia.");
        return;
    }

    item.quantity = newQuantity;
    updateCart();
}


/* =========================================================
   10. REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {
    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();
    showNotification("Produk dihapus dari keranjang.");
}


/* =========================================================
   11. UPDATE CART
========================================================= */

function updateCart() {

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );


    // Update jumlah keranjang

    cartCount.textContent = totalQuantity;


    // Keranjang kosong

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <br>
                Keranjang belanja masih kosong.
            </p>
        `;

    } else {

        // Tampilkan isi keranjang

        cartItems.innerHTML = cart.map(item => `

            <div class="cart-item">

                <div>

                    <h4>${item.name}</h4>

                    <p>${formatRupiah(item.price)}</p>

                    <div class="cart-item-subtotal">
                        Subtotal:
                        ${formatRupiah(item.price * item.quantity)}
                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Hapus
                    </button>

                </div>


                <div class="cart-actions">

                    <button
                        class="quantity-button"
                        onclick="changeQuantity(${item.id}, -1)"
                        aria-label="Kurangi jumlah"
                    >
                        −
                    </button>

                    <span class="quantity-number">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-button"
                        onclick="changeQuantity(${item.id}, 1)"
                        aria-label="Tambah jumlah"
                    >
                        +
                    </button>

                </div>

            </div>

        `).join("");

    }


    // Update total

    cartTotal.textContent = formatRupiah(totalPrice);

    saveCart();
}


/* =========================================================
   12. CART SIDEBAR
========================================================= */

function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("cart-open");
}

function closeCart() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("cart-open");
}

function toggleCart() {
    const isOpen = cartSidebar.classList.contains("active");

    if (isOpen) {
        closeCart();
    } else {
        openCart();
    }
}


/* =========================================================
   13. WHATSAPP CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {
        showNotification("Keranjang belanja masih kosong.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    let message = [
        `Halo ${STORE.name}, saya ingin melakukan pemesanan ikan cupang.`,
        "",
        "DETAIL PESANAN",
        "--------------------------------"
    ];

    cart.forEach((item, index) => {

        message.push(
            `${index + 1}. ${item.name}`,
            `Kode: ${item.code}`,
            `Kategori: ${item.category}`,
            `Jumlah: ${item.quantity}`,
            `Harga: ${formatRupiah(item.price)}`,
            `Subtotal: ${formatRupiah(item.price * item.quantity)}`,
            ""
        );

    });

    message.push(
        "--------------------------------",
        `TOTAL: ${formatRupiah(total)}`,
        "--------------------------------",
        "",
        "Mohon konfirmasi ketersediaan stok dan informasi pengiriman.",
        "Terima kasih."
    );

    const whatsappURL =
        `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message.join("\n"))}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   14. NOTIFICATION
========================================================= */

let notificationTimeout;

function showNotification(message) {

    let notification = document.getElementById(
        "betta-notification"
    );

    if (!notification) {

        notification = document.createElement("div");

        notification.id = "betta-notification";
        notification.className = "betta-notification";

        document.body.appendChild(notification);
    }

    notification.textContent = message;

    notification.classList.add("show");

    clearTimeout(notificationTimeout);

    notificationTimeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}


/* =========================================================
   15. EVENT LISTENERS
========================================================= */

if (searchInput) {
    searchInput.addEventListener("input", displayProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", displayProducts);
}

if (sortFilter) {
    sortFilter.addEventListener("change", displayProducts);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();
    }
});


/* =========================================================
   16. INITIALIZE
========================================================= */

function initializeStore() {
    displayProducts();
    updateCart();
}

initializeStore();
