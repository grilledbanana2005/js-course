import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productHTML = '';

products.forEach((product) => {

     productHTML += 
     `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
     `;
})

document.querySelector('.js-products-grid').innerHTML = productHTML;

// adding product to your cart
function addToCart(productId) {
  let matching;
  const quantitySelector = document.querySelector(
    `.js-select-quantity-${productId}`
  );
  const quantity = Number(quantitySelector.value);

        cart.forEach((item) => {
            if (item.productId === productId)
            {
                matching = item;
            }
        })

        if (matching) 
        {
            matching.quantity += quantity;
        }
        else {
            cart.push({
                productId,
                quantity,
            })
        }
}

// displaying quantity of the cart
function updateCartQuantity(productId) {
  const quantitySelector = document.querySelector(
    `.js-select-quantity-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// displaying added
let addedMassageTimeoutId;

function addedMessage(productId) {
  const addedMessage = document.querySelector(`
    .js-added-${productId}
    `);
  addedMessage.classList.add('displaying-added');

  if (addedMassageTimeoutId) {
    clearTimeout(addedMassageTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('displaying-added');
  },1700)

  addedMassageTimeoutId = timeoutId;
}

//work of the adding button
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    //let addedMassageTimeoutId;
    
    button.addEventListener('click', () => {
        const {productId} = button.dataset;

        addToCart(productId);

        updateCartQuantity(productId);
        // displaying added
        addedMessage(productId);
        
        });
});
