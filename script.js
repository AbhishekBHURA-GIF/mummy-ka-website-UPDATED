function showModal(imageSrc) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  modal.style.display = "block";
  modalImg.src = imageSrc;
  modalImg.classList.remove("zoomed");
}

function closeModal() {
  document.getElementById("image-modal").style.display = "none";
}

// Toggle zoom on click
document.addEventListener("DOMContentLoaded", () => {
  const modalImg = document.getElementById("modal-image");
  if (modalImg) {
    modalImg.addEventListener("click", () => {
      modalImg.classList.toggle("zoomed");
    });
  }
});

// ✅ Load products on the homepage
function loadProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img" onclick="showModal('${p.image}')" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(div);
  });

  updateCartCount();
}

// ✅ Add a product to cart and store in localStorage
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ✅ Update the number on cart icon
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const span = document.getElementById("cart-count");
  if (span) span.textContent = total;
}

// ✅ Load the cart page
function loadCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!container || !totalEl) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <h3>${product.name}</h3>
      <p>₹${product.price} x ${item.qty}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    total += product.price * item.qty;
    container.appendChild(div);
  });

  totalEl.textContent = `Total: ₹${total}`;
}

// ✅ Remove item from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// ✅ On page load
window.onload = () => {
  loadProducts();
  loadCart();
  updateCartCount();
};
