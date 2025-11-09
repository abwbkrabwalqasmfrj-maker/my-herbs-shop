const price = 75;
let quantity = 1;

const quantityEl = document.getElementById('quantity');
const totalEl = document.getElementById('total');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const form = document.getElementById('orderForm');
const statusEl = document.getElementById('status');

emailjs.init("1UGLrDJn378aSDOee");

function updateTotal() {
  totalEl.textContent = price * quantity;
  quantityEl.textContent = quantity;
}

increaseBtn.addEventListener('click', () => {
  quantity++;
  updateTotal();
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    updateTotal();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const notes = document.getElementById('notes').value;
  const total = totalEl.textContent;

  if (!confirm(`هل أنت متأكد من تأكيد الشراء؟\n\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}\nالكمية: ${quantity}\nالإجمالي: ${total} دينار`)) {
    return;
  }

  emailjs.send("service_lskge8d", "template_3m6yg41", {
    product: "بدور راحة",
    quantity,
    total : total,
    name : name,
    phone : phone,
    address : address,
    notes : notes,
  })
  .then(() => {
    statusEl.textContent = "✅ تم إرسال الطلب بنجاح!";
    form.reset();
    quantity = 1;
    updateTotal();
  })
  .catch((err) => {
    statusEl.textContent = "❌ حدث خطأ أثناء الإرسال.";
    console.error(err);
  });
});

updateTotal();
