import {products} from './products.js';

const cartItems = [];

function addToCart(event) {
    const productId = parseInt(event.target.dataset.productId);
    const product = products.find((item) => item.id === productId);

    if (product) {
        const existingItem = cartItems.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({...product, quantity: 1});
        }

        displayCartItems();
    }
}

function removeFromCart(event) {
    const removeProductId = parseInt(event.target.dataset.productId);
    const index = cartItems.findIndex((item) => item.id === removeProductId);
    if (index !== -1) {
        cartItems.splice(index, 1);
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
                <button class="btn btn-warning remove-from-cart" data-product-id="${item.id}">Remove from Cart</button>
            </div>
        </div>
    `;
        cartItemsContainer.appendChild(cartItem);
    });

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach((button) => {
        button.addEventListener('click', removeFromCart);
    });
}

function clearCart() {
    cartItems.length = 0;
    displayCartItems();
}

export {cartItems, addToCart, displayCartItems, clearCart};
