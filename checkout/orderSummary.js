import { cart, removeFromCart, updateQuantity, calculateCartQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';;
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' //default export
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";
//hello();

//const today = dayjs();
//const delDtae = today.add(7, 'days');

//console.log(delDtae);

//console.log(delDtae.format('dddd, MMMM, D')); //Thursday, January, 16

export function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        //console.log(cartItem)
        const productId = cartItem.productId

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
        //console.log(matchingProduct);
        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);


        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHTML += `
    <div class="cart-item-container 
                js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString};
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
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
                    ${deliveryOptionsHTML(matchingProduct, cartItem)};
                </div>
            </div>
        </div>

        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${deliveryOption.priceCents} - `;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += 
                `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" class="delivery-option-input"
                        ${isChecked ? "checked" : ''}
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                    </div>
                </div>
                `
        });

        return html;
    }

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

                renderPaymentSummary();
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

                if (newQuantity <= 0 || newQuantity > 1000) {
                    alert("Quantity must be between 1 and 1000");
                    return;
                }
                //console.log(newQuantity)

                updateQuantity(productId, newQuantity);

                // Update the quantity label in the DOM
                const quantityLabel = container.querySelector(`.js-quantity-label`);
                quantityLabel.textContent = `${newQuantity}`;
                
                updateCartQuantity();
                renderPaymentSummary();
                //console.log(cart)
                
            });
        });

        // function handleOnKeyDown(event) {
        //     if (event.key === 'Enter') {
        //         updateQuantity(productId, newQuantity);
        //         updateCartQuantity
        //     }
        // }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            
            const {productId, deliveryOptionId} = element.dataset

            // Update the cart with the new delivery option
            updateDeliveryOption(productId, deliveryOptionId);

            /*
            // Find the selected delivery option details
            const selectedOption = deliveryOptions.find(option => option.id === deliveryOptionId);

            // Calculate the new delivery date
            const today = dayjs();
            const deliveryDate = today.add(selectedOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            // Update the delivery date in the DOM
            const deliveryDateElement = document.querySelector(
                `.js-cart-item-container-${productId} .delivery-date`
            );
            deliveryDateElement.textContent = `Delivery date: ${dateString}`;
            */
            renderOrderSummary();
            renderPaymentSummary();


        });
    });
}
