import { products } from './products.js';

const cartItems = [];

function addToCart(event) {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find((item) => item.id === productId);

    if (product) {
        const existingItem = cartItems.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        displayCartItems();
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('col-12', 'mb-3');
        cartItem.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">Price: $${item.price.toFixed(2)}</p>
          <p class="card-text">Quantity: ${item.quantity}</p>
          <p class="card-text">Total: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function clearCart() {
    cartItems.length = 0;
    displayCartItems();
}

export { cartItems, addToCart, displayCartItems, clearCart };
