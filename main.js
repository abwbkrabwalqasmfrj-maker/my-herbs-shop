emailjs.init("1UGLrDJn378aSDOee"); // ضع هنا المفتاح الخاص بك من EmailJS

let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

function renderCart() {
    const list = document.getElementById("cart-list");
    const totalText = document.getElementById("total-price");
    list.innerHTML = "";

    cart.forEach((item, i) => {
        list.innerHTML += `
            <li>
                ${i + 1}- ${item.name} (${item.price} د)
                <button onclick="removeFromCart(${i})">❌ حذف</button>
            </li>
        `;
    });

    totalText.textContent = `المجموع: ${total} دينار`;
}


function openForm() {
  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }
  document.getElementById("order-form").classList.remove("hidden");
}

document.getElementById("purchaseForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const items = cart.map(c => `${c.name} - ${c.price}د`).join("\n");

  emailjs.send("service_lskge8d", "template_3m6yg41", {
    user_name: name,
    user_phone: phone,
    user_address: address,
    cart_items: items
  }).then(
    () => {
      alert("✅ تم إرسال الطلب بنجاح!");
      cart = [];
      total = 0;
      renderCart();
      document.getElementById("purchaseForm").reset();
      document.getElementById("order-form").classList.add("hidden");
    },
    (err) => {
      alert("❌ حدث خطأ أثناء الإرسال: " + JSON.stringify(err));
    }
      );
});
// حذف عنصر من السلة
function removeFromCart(index) {
    total -= cart[index].price;       // خصم سعر المنتج
    cart.splice(index, 1);            // إزالة المنتج من المصفوفة
    renderCart();                     // إعادة عرض السلة
}
