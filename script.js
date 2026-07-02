// ================= BASE DE DADOS INICIAL (CARDÁPIO SEED) =================
const DEFAULT_PRODUCTS = [
    { id: 1, name: "X-Burger Gourmet", category: "Hambúrgueres", price: 26.90, desc: "Pão artesanal brioche, blend bovino 150g, queijo cheddar derretido e maionese da casa.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: true },
    { id: 2, name: "X-Salada Premium", category: "Hambúrgueres", price: 28.50, desc: "Blend 150g, queijo prato, alface americana, tomate fresco, cebola roxa e molho especial.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80", rating: 4, available: true, featured: false },
    { id: 3, name: "X-Bacon Defumado", category: "Hambúrgueres", price: 32.00, desc: "Muito bacon crocante, blend suculento 150g, queijo cheddar duplo e barbecue artesanal.", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: true },
    { id: 4, name: "Smash Burger Duplo", category: "Hambúrgueres", price: 24.00, desc: "Dois blends smash ultra prensados de 80g, crostinha perfeita, cheddar duplo e pão macio.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=80", rating: 4, available: true, featured: false },
    { id: 5, name: "Pizza Calabresa Especial", category: "Pizzas", price: 44.90, desc: "Molho de tomate artesanal, muçarela premium, calabresa defumada selecionada e cebola.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: true },
    { id: 6, name: "Pizza Portuguesa Tradicional", category: "Pizzas", price: 48.00, desc: "Presunto, ovos, cebola, ervilhas, muçarela e azeitonas pretas chilenas sobre massa fina.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80", rating: 4, available: true, featured: false },
    { id: 7, name: "Frango com Catupiry Original", category: "Pizzas", price: 46.90, desc: "Peito de frango desfiado temperado, coberto com o legítimo requijão Catupiry®.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: false },
    { id: 8, name: "Pizza Marguerita Clássica", category: "Pizzas", price: 42.00, desc: "Muçarela de búfala, rodelas de tomate fresco, manjericão orgânico e azeite extravirgem.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80", rating: 4, available: true, featured: false },
    { id: 9, name: "Coca-Cola Lata", category: "Bebidas", price: 6.50, desc: "Lata 350ml trincando de gelada.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: false },
    { id: 10, name: "Suco de Laranja Natural", category: "Bebidas", price: 9.00, desc: "Suco natural feito na hora da fruta pura, sem adição de conservantes. 400ml.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80", rating: 4, available: true, featured: false },
    { id: 11, name: "Pudim de Leite Condensado", category: "Sobremesas", price: 12.00, desc: "Textura super cremosa, sem furinhos, com calda de caramelo perfeita da vovó.", image: "pudim-min-3f2f6769-1920w.jpg", rating: 5, available: true, featured: true },
    { id: 12, name: "Brownie Splendor com Sorvete", category: "Sobremesas", price: 18.90, desc: "Brownie quentinho de chocolate nobre com nozes, acompanhado de uma bola de sorvete de creme.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=80", rating: 5, available: true, featured: true }
];

// ================= ESTADO GLOBAL DA APLICAÇÃO =================
let products = JSON.parse(localStorage.getItem('restaurant_products')) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('restaurant_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('restaurant_favorites')) || [];
let currentCategory = 'todos';
let searchQuery = '';
let activeCoupon = null;
const DELIVERY_FEE = 7.00;

const VALID_COUPONS = {
    'GOURMET10': 0.10, // 10% Desconto
    'MASTER20': 0.20   // 20% Desconto
};

// ================= INICIALIZADOR =================
document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem('restaurant_products')) {
        localStorage.setItem('restaurant_products', JSON.stringify(products));
    }

    initDOMEvents();
    renderApp();
    
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.classList.add('hidden'), 400);
        }
    }, 800);
});

// ================= RENDERIZADORES DO DOM =================
function renderApp() {
    renderProductsGrid();
    renderCart();
    renderAdminTable();
}

function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (currentCategory === 'todos') return matchSearch;
        if (currentCategory === 'favoritos') return favorites.includes(p.id) && matchSearch;
        return p.category === currentCategory && matchSearch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = `<div class="cart-empty-state flex-1" style="grid-column: 1/-1"><i class="fa-regular fa-face-frown"></i><p>Nenhum produto localizado para sua busca.</p></div>`;
        return;
    }

    filtered.forEach(p => {
        const isFav = favorites.includes(p.id);
        const stars = Array(5).fill('').map((_, i) => `<i class="${i < p.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`).join('');
        
        const card = document.createElement('div');
        card.className = `product-card ${!p.available ? 'out-of-stock' : ''}`;
        card.innerHTML = `
            ${!p.available ? `<div class="out-of-stock-overlay"><span class="out-of-stock-badge">Indisponível</span></div>` : ''}
            <div class="card-img-wrapper">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.featured ? `<span class="featured-badge">Mais Vendido</span>` : ''}
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${p.id}, event)">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-meta">
                    <span class="prod-cat-tag">${p.category}</span>
                    <div class="rating">${stars}</div>
                </div>
                <h3>${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-card-footer">
                    <span class="price-tag">R$ ${p.price.toFixed(2).replace('.',',')}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})" ${!p.available ? 'disabled' : ''} title="Adicionar ao carrinho">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    if (!container) return;

    container.innerHTML = '';
    let subtotal = 0;
    let totalItemsCount = 0;

    if(cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Seu carrinho está vazio.</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const prod = products.find(p => p.id === item.id);
            if(!prod) return;

            subtotal += prod.price * item.qty;
            totalItemsCount += item.qty;

            const cItem = document.createElement('div');
            cItem.className = 'cart-item';
            cItem.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${prod.name}</h4>
                    <p>R$ ${(prod.price * item.qty).toFixed(2).replace('.',',')}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            container.appendChild(cItem);
        });
    }

    countBadge.innerText = totalItemsCount;

    let discountAmount = 0;
    if (activeCoupon) {
        discountAmount = subtotal * activeCoupon.value;
    }

    const finalTotal = Math.max(0, (subtotal + DELIVERY_FEE) - discountAmount);

    document.getElementById('summary-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.',',')}`;
    document.getElementById('summary-total').innerText = `R$ ${finalTotal.toFixed(2).replace('.',',')}`;
    
    const discContainer = document.getElementById('summary-discount-container');
    if(discountAmount > 0) {
        discContainer.classList.remove('hidden');
        document.getElementById('summary-discount').innerText = `-R$ ${discountAmount.toFixed(2).replace('.',',')}`;
    } else {
        discContainer.classList.add('hidden');
    }
}

function renderAdminTable() {
    const tbody = document.getElementById('admin-products-table');
    if (!tbody) return;
    tbody.innerHTML = '';

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" class="t-img" alt=""></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>R$ ${p.price.toFixed(2)}</td>
            <td>
                <span class="status-badge ${p.available ? 'on' : 'off'}">
                    ${p.available ? 'Disponível' : 'Indisponível'}
                </span>
            </td>
            <td>
                <div class="action-actions-cell">
                    <button class="btn-table btn-table-edit" onclick="editProduct(${p.id})" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-table btn-table-delete" onclick="deleteProduct(${p.id})" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ================= LOGICA DE NEGOCIO / EVENTOS COMPORTAMENTO =================
window.addToCart = function(id) {
    const prod = products.find(p => p.id === id);
    if(!prod || !prod.available) return;

    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }
    
    saveCartState();
    renderCart();
    showToast(`${prod.name} inserido no carrinho!`);
};

window.updateQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if(!item) return;

    item.qty += delta;
    if(item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCartState();
    renderCart();
};

window.removeFromCart = function(id) {
    cart = cart.filter(i => i.id !== id);
    saveCartState();
    renderCart();
    showToast("Item removido do carrinho.");
};

window.toggleFavorite = function(id, event) {
    event.stopPropagation();
    const idx = favorites.indexOf(id);
    if(idx > -1) {
        favorites.splice(idx, 1);
        showToast("Removido dos favoritos.");
    } else {
        favorites.push(id);
        showToast("Adicionado aos favoritos!", "success");
    }
    localStorage.setItem('restaurant_favorites', JSON.stringify(favorites));
    renderProductsGrid();
};

function saveCartState() {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
}

function saveProductsState() {
    localStorage.setItem('restaurant_products', JSON.stringify(products));
}

window.deleteProduct = function(id) {
    const prod = products.find(p => p.id === id);
    if(!prod) return;

    if(confirm(`Tem certeza absoluta que deseja excluir o produto "${prod.name}"?`)) {
        products = products.filter(p => p.id !== id);
        cart = cart.filter(i => i.id !== id);
        saveProductsState();
        saveCartState();
        renderApp();
        showToast("Produto excluído do sistema.");
    }
};

window.editProduct = function(id) {
    const p = products.find(prod => prod.id === id);
    if(!p) return;

    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-price').value = p.price;
    document.getElementById('prod-image').value = p.image;
    document.getElementById('prod-desc').value = p.desc;
    document.getElementById('prod-available').checked = p.available;
    document.getElementById('prod-featured').checked = p.featured;

    document.getElementById('form-title').innerText = "Editar Produto";
    document.getElementById('btn-cancel-edit').classList.remove('hidden');
    
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
};

// ================= EVENTOS DO ELEMENTOS DOM =================
function initDOMEvents() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    document.getElementById('cart-toggle').addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    });

    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    };
    document.getElementById('cart-close').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    const clientView = document.getElementById('customer-screen');
    const adminView = document.getElementById('admin-screen');

    document.getElementById('btn-admin-panel').addEventListener('click', () => {
        clientView.classList.remove('active');
        adminView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const backToMenu = () => {
        adminView.classList.remove('active');
        clientView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.getElementById('btn-back-to-menu').addEventListener('click', backToMenu);
    document.getElementById('btn-logo-home').addEventListener('click', backToMenu);

    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        if(html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        }
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProductsGrid();
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            currentCategory = target.getAttribute('data-category');
            document.getElementById('current-category-title').innerText = target.innerText;
            renderProductsGrid();
        });
    });

    document.getElementById('btn-clear-cart').addEventListener('click', () => {
        if(cart.length === 0) return;
        if(confirm("Deseja realmente esvaziar o carrinho?")) {
            cart = [];
            saveCartState();
            renderCart();
            showToast("Carrinho limpo.");
        }
    });

    document.getElementById('btn-apply-coupon').addEventListener('click', () => {
        const code = document.getElementById('coupon-input').value.trim().toUpperCase();
        const feedback = document.getElementById('coupon-feedback');

        if(VALID_COUPONS[code] !== undefined) {
            activeCoupon = { code: code, value: VALID_COUPONS[code] };
            feedback.style.color = "var(--success)";
            feedback.innerText = `Cupom ativo: ${VALID_COUPONS[code] * 100}% de desconto!`;
            renderCart();
        } else {
            feedback.style.color = "var(--primary)";
            feedback.innerText = "Cupom inválido ou expirado.";
        }
    });

    const prodForm = document.getElementById('product-form');
    prodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idVal = document.getElementById('prod-id').value;
        const name = document.getElementById('prod-name').value;
        const category = document.getElementById('prod-category').value;
        const price = parseFloat(document.getElementById('prod-price').value);
        const image = document.getElementById('prod-image').value;
        const desc = document.getElementById('prod-desc').value;
        const available = document.getElementById('prod-available').checked;
        const featured = document.getElementById('prod-featured').checked;

        if(idVal) {
            const idx = products.findIndex(p => p.id === parseInt(idVal));
            if(idx > -1) {
                products[idx] = { ...products[idx], name, category, price, image, desc, available, featured };
                showToast("Produto updated com sucesso!");
            }
        } else {
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push({ id: newId, name, category, price, image, desc, rating: 5, available, featured });
            showToast("Novo produto adicionado ao cardápio!");
        }

        resetAdminForm();
        saveProductsState();
        renderApp();
    });

    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    const resetAdminForm = () => {
        prodForm.reset();
        document.getElementById('prod-id').value = '';
        document.getElementById('form-title').innerText = "Adicionar Novo Produto";
        cancelEditBtn.classList.add('hidden');
    };
    cancelEditBtn.addEventListener('click', resetAdminForm);

    const checkoutModal = document.getElementById('checkout-modal');
    document.getElementById('btn-go-to-checkout').addEventListener('click', () => {
        if(cart.length === 0) {
            showToast("Seu carrinho está vazio!");
            return;
        }
        closeCart();
        checkoutModal.classList.add('open');
    });

    document.getElementById('close-checkout-modal').addEventListener('click', () => {
        checkoutModal.classList.remove('open');
    });

    document.getElementById('cust-payment').addEventListener('change', (e) => {
        const changeContainer = document.getElementById('cash-change-container');
        if(e.target.value === 'Dinheiro') {
            changeContainer.classList.remove('hidden');
        } else {
            changeContainer.classList.add('hidden');
        }
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const address = document.getElementById('cust-address').value;
        const number = document.getElementById('cust-number').value;
        const comp = document.getElementById('cust-complement').value;
        const neighborhood = document.getElementById('cust-neighborhood').value;
        const city = document.getElementById('cust-city').value;
        const payment = document.getElementById('cust-payment').value;
        const change = document.getElementById('cust-change').value;

        let subtotal = cart.reduce((acc, item) => {
            const p = products.find(prod => prod.id === item.id);
            return acc + (p ? p.price * item.qty : 0);
        }, 0);
        let discount = activeCoupon ? subtotal * activeCoupon.value : 0;
        let total = (subtotal + DELIVERY_FEE) - discount;

        const summaryBox = document.getElementById('order-summary-box');
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

        let itemsHtml = cart.map(item => {
            const p = products.find(prod => prod.id === item.id);
            return `<div>• ${item.qty}x ${p.name} - R$ ${(p.price * item.qty).toFixed(2)}</div>`;
        }).join('');

        summaryBox.innerHTML = `
            <h4>Detalhamento Técnico do Pedido</h4>
            <div style="margin-bottom: 8px;"><strong>Cliente:</strong> ${name} | <strong>Tel:</strong> ${phone}</div>
            <div style="margin-bottom: 8px;"><strong>Entregar em:</strong> ${address}, Nº ${number} ${comp ? `(${comp})` : ''} - Bairro: ${neighborhood}, ${city}</div>
            <div style="margin-bottom: 8px;"><strong>Pagamento:</strong> ${payment} ${change ? `(Troco para R$ ${parseFloat(change).toFixed(2)})` : ''}</div>
            <div style="margin-bottom: 12px;"><strong>Horário de Emissão:</strong> ${timeStr}</div>
            <h4 style="font-size:0.85rem; margin-top:10px;">Itens Solicitados</h4>
            <div style="font-size:0.85rem; color: var(--text-secondary); margin-bottom:10px;">${itemsHtml}</div>
            <div style="border-top: 1px dashed var(--border); padding-top: 8px; font-weight:700; display:flex; justify-content:space-between;">
                <span>Total Pago:</span>
                <span class="text-red">R$ ${total.toFixed(2).replace('.',',')}</span>
            </div>
        `;

        cart = [];
        activeCoupon = null;
        document.getElementById('coupon-input').value = '';
        document.getElementById('coupon-feedback').innerText = '';
        document.getElementById('checkout-form').reset();
        document.getElementById('cash-change-container').classList.add('hidden');
        saveCartState();
        renderCart();

        checkoutModal.classList.remove('open');
        document.getElementById('success-modal').classList.add('open');
    });

    document.getElementById('btn-close-success').addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('open');
    });

    const btt = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 400) {
            btt.style.display = 'flex';
        } else {
            btt.style.display = 'none';
        }
    });
    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if(!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info text-red"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s reverse forwards ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}