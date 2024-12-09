// مصفوفة لحفظ المنتجات في السلة
let cart = [];

// إضافة منتج إلى السلة
function addToCart(name, price, image) {
    // إضافة المنتج إلى السلة
    cart.push({ name: name, price: price, image: image });
    // تحديث عرض السلة بعد إضافة المنتج
    updateCartDisplay();
}

// تحديث عرض السلة
function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    // مسح السلة الحالية
    cartList.innerHTML = "";

    let total = 0;
    // إضافة المنتجات إلى قائمة السلة
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${item.image}" class="cart-item-image"> <span class="cart-item-name">${item.name}</span> - <span class="cart-item-price">${item.price} جنيه</span> <span class="delete-btn" onclick="removeFromCart(${index})">حذف</span>`;
        cartList.appendChild(li);
        total += item.price;
    });

    // إضافة المجموع الكلي
    const totalLi = document.createElement("li");
    totalLi.textContent = `الإجمالي: ${total} جنيه`;
    cartList.appendChild(totalLi);

    // تحديث العداد في أيقونة السلة
    cartCount.textContent = cart.length;
    cartTotal.textContent = `${total} جنيه`;
}

// إزالة منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1); // إزالة العنصر من المصفوفة
    updateCartDisplay(); // تحديث العرض بعد الحذف
}

// إرسال الطلب إلى واتساب
function sendOrder() {
    if (cart.length === 0) {
        alert("السلة فارغة. الرجاء إضافة أطباق قبل الإرسال.");
        return;
    }

    // إعداد نص الطلب
    const orderDetails = cart.map(item => `- ${item.name}: ${item.price} جنيه`).join("\n");
    const totalPrice = `\nالإجمالي: ${cart.reduce((total, item) => total + item.price, 0)} جنيه`;
    const message = `طلب جديد من الموقع:\n\n${orderDetails}\n${totalPrice}`;

    // رقم الواتساب المعدل
    const phoneNumber = "201288316889"; // رقم الواتساب لاستقبال الطلبات

    // رابط الواتساب
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // توجيه المستخدم إلى واتساب
    window.location.href = whatsappUrl;
}

// تبديل عرض السلة المنسدلة
function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.toggle('show');
}
