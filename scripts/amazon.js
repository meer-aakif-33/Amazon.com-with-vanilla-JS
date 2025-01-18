import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity();

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
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
                src="${product.getStarsURL()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container js-quantity-container-${product.id}">
                <select>
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

            <div class="added-to-cart js-added-to-cart-${product.id}"> 
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>`;
});

//console.log(productsHTML);
// const grid = document.querySelector('.js-products-grid');

export function updateCartQuantity() {
    //update the cartQuantity

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

function displayAddedMessage(productId) {
            //Added text element

            const addedMessageElement = document.querySelector(`.js-added-to-cart-${productId}`)

            let timeoutId = null;
    
            // If the message is already visible and there's an active timeout, clear it
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
    
            // Show the "Added" message
            addedMessageElement.classList.add('js-show-added-to-cart');
    
            // Set a timeout to hide the message after 3 seconds
            timeoutId = setTimeout(() => {
                addedMessageElement.classList.remove('js-show-added-to-cart');
            }, 1500); // 1.5 seconds timeout
                
            //console.log(`Add to Cart clicked for product: ${productId}`);
    
}
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {

        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(`.js-quantity-container-${productId} select`)

        const quantity = Number(quantitySelector.value);

        addToCart(productId, quantity);

        updateCartQuantity();

        displayAddedMessage(productId);

        //Make Add to cart button interactive
        /*
        let matchingItem;

        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item
            }
        });
        */

        //console.log(cart);
        //console.log(`cartQuantity is ${cartQuantity}`);
    });
    
});



