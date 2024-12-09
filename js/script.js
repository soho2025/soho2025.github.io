let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
  cart.push({ name: itemName, price: itemPrice });
  total += itemPrice;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  // تحديث قائمة السلة
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} جنيه`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "حذف";
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  // تحديث السعر الإجمالي
  totalPrice.textContent = `الإجمالي: ${total} جنيه`;
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function sendOrder() {
  if (cart.length === 0) {
    alert("السلة فارغة. الرجاء إضافة أطباق قبل الإرسال.");
    return;
  }

  const orderDetails = cart.map(item => `${item.name} - ${item.price} جنيه`).join("\n");
  alert(`تم إرسال الطلب:\n${orderDetails}\nالإجمالي: ${total} جنيه`);
  // تصفية السلة بعد الإرسال
  cart = [];
  total = 0;
  updateCart();
}
