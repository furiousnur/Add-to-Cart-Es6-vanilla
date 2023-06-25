import { products } from './products.js';
import { addToCart, clearCart } from './cart.js';

const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', clearCart);

function displayProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        productCard.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        `;
        productList.appendChild(productCard);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
    });
}

displayProductList();
