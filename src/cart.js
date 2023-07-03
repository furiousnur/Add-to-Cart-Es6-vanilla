import { products } from './products.js';

let cartItems = [];
 
window.addEventListener('load', () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        displayCartItems();
    }
});

function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

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

        saveCartItems();
        displayCartItems();
    }
}

function removeFromCart(event) {
    const removeProductId = parseInt(event.target.dataset.productId);
    const index = cartItems.findIndex((item) => item.id === removeProductId);

    if (index !== -1) {
        const item = cartItems[index];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cartItems.splice(index, 1);
        }

        saveCartItems();
        displayCartItems();
    }
}

function calculateSubtotal() {
    let subtotal = 0;
    cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
    });
    return subtotal.toFixed(2);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('col-4', 'mb-3');
        cartItem.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Price: $${item.price.toFixed(2)}</p>
              <p class="card-text">Quantity: ${item.quantity}</p>
              <p class="card-text">Total: $${(item.price * item.quantity).toFixed(2)}</p>
              <button class="btn btn-warning remove-from-cart" data-product-id="${item.id}">-</button> 
              <button class="btn btn-primary add-to-cart" data-product-id="${item.id}">+</button>
          </div>
      </div>
    `;
        cartItemsContainer.appendChild(cartItem);
    });

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach((button) => {
        button.addEventListener('click', removeFromCart);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
    });

    const cartSubtotal = document.getElementById('cartSubtotal');
    cartSubtotal.textContent = `$${calculateSubtotal()}`;
}

function clearCart() {
    cartItems = [];
    saveCartItems();
    displayCartItems();
}

export { cartItems, addToCart, clearCart };
