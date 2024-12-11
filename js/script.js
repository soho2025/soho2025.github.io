let cart = [];

// إضافة منتج للسلة
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartDisplay();
}

// تحديث عرض السلة
function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");
    const cartTotals = document.querySelectorAll(".cart-total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <img src="${item.image}" class="cart-item-image">
            <span class="cart-item-price">${item.price} جنيه</span>
            <span class="cart-item-name">${item.name}</span>
            
            <span class="delete-btn" onclick="removeFromCart(${index})"> حذف </span>
        `;
        cartList.appendChild(li);
        total += item.price;
    });

    cartTotals.forEach(element => {
        element.textContent = `${total} جنيه`;
    });

    cartCount.textContent = cart.length;
}

// حذف منتج
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// إظهار/إخفاء السلة
function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.toggle("show");
}

// إغلاق السلة
function closeCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.remove("show");
}

// إرسال الطلب
function sendOrder() {
    if (!cart.length) {
        alert("السلة فارغة!");
        return;
    }

    const message = cart
        .map((item) => `${item.name}: ${item.price} جنيه`)
        .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const phone = "201288316889";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message + `\nالإجمالي: ${total} جنيه`
    )}`;

    window.location.href = whatsappUrl;
}
