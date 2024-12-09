
let cart = []; // مصفوفة لتخزين العناصر في السلة

// دالة لإضافة عنصر إلى السلة
function addToCart(name, price) {
    const imageUrl = getImageUrl(name);  // الحصول على رابط الصورة بناءً على اسم المنتج
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex !== -1) {
        // إذا كان المنتج موجوداً، زيادة الكمية
        cart[itemIndex].quantity++;
    } else {
        // إذا لم يكن موجوداً، إضافته للسلة مع الصورة
        cart.push({ name, price, quantity: 1, imageUrl });
    }
    
    updateCartDisplay();
}

// دالة للحصول على رابط الصورة بناءً على اسم المنتج
function getImageUrl(name) {
    const productImages = {
        'سندوتش لحم': 'images/soho-party.jpg',
        'سندوتش دجاج': 'images/soho-party.jpg'
    };
    
    return productImages[name] || 'images/default.jpg';  // صورة افتراضية إذا لم يتطابق الاسم
}

// دالة لتحديث عرض السلة في الصفحة
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartList = document.getElementById('cart-list');
    
    let total = 0;
    cartList.innerHTML = ''; // مسح العناصر الحالية في السلة
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        
        // إضافة صورة المنتج
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        img.classList.add('cart-item-image');
        
        // إضافة النص والكمية
        const text = document.createElement('span');
        text.textContent = `${item.name} - ${item.quantity} × ${item.price} جنيه`;
        
        // إضافة الصورة والنص إلى العنصر
        li.appendChild(img);
        li.appendChild(text);
        
        // إضافة العنصر إلى السلة
        cartList.appendChild(li);
        
        total += item.price * item.quantity;
    });

    // تحديث عدد العناصر في السلة والمجموع الكلي
    cartCount.textContent = cart.length;
    cartTotal.textContent = `${total} جنيه`;
}

// دالة لفتح/إغلاق عرض السلة
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.classList.toggle('show');
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
    cartDropdown.style.display = cartDropdown.style.display === "none" || cartDropdown.style.display === "" ? "block" : "none";
}
