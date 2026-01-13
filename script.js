// Thêm vào giỏ hàng
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Đã thêm vào giỏ hàng');
}

// Form liên hệ
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm.');
    form.reset();
  });
}

