let cart = [];

function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${item.quantity}
      <button onclick="changeQty('${item.name}',1)">+</button>
      <button onclick="changeQty('${item.name}',-1)">-</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cart-count").innerText = cart.length;
}

function changeQty(name, change) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.name !== name);
    }
  }

  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("active");
}

function placeOrder() {
  let address = document.getElementById("address").value;

  if (cart.length === 0) {
    alert("Cart empty!");
    return;
  }

  if (address === "") {
    alert("Enter address!");
    return;
  }

  alert("🎉 Order placed!");
  cart = [];
  updateCart();
}
