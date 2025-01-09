import { cart, removeFromCart, updateQuantity, calculateCartQuantity } from "./cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    //console.log(cartItem)
    const productId = cartItem.productId

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })
    //console.log(matchingProduct);

  cartSummaryHTML += `
   <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents )}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${productId}" onkeydown ="handleOnKeyDown(event)">
                    <span class="save-quantity-link link-primary js-save-link "data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>

                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//onsole.log(cartSummaryHTML)

updateCartQuantity();

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId
            removeFromCart(productId);
            //console.log(cart);

            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove();

            updateCartQuantity();
        });
        
    });




function updateCartQuantity() {

    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

//on clicking the update
document.querySelectorAll('.js-update-quantity-link')
    .forEach((clickLink) => {
        clickLink.addEventListener('click', () => {
            const productId = clickLink.dataset.productId
            console.log(productId)

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
              );
            container.classList.add('is-editing-quantity');

        });
    });


//on clicking the update
document.querySelectorAll('.js-save-link')
    .forEach((saveButton) => {
        saveButton.addEventListener(('click'), () => {
            const productId = saveButton.dataset.productId;
            console.log(productId)
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
              );
            container.classList.remove('is-editing-quantity');
            updateQuantity();

            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
              );
            const newQuantity = Number(quantityInput.value);

            //console.log(newQuantity)

            updateQuantity(productId, newQuantity);
            updateCartQuantity();
            //console.log(cart)
            document.querySelector('.js-quantity-label').textContent = `${newQuantity}`;
        });
    });

    function handleOnKeyDown(event) {
        if (event.key === 'Enter') {
            updateQuantity(productId, newQuantity);
            updateCartQuantity
        }
    }

