export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {    
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
    
}

function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId, quantity){

    const matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += quantity; //Update the quantity of the existing item
    } else {
        cart.push({ // Add a new item to the cart
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }

    //console.log("Cart after adding item:", cart);

    saveToStorage();
}

export function updateQuantity(productId, newQuantity){

    cart.forEach((cartItem) => {
        if (productId == cartItem.productId) {
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();

}
/*
Steps
1. Create a new array
2. Loop through the cart
3. Add each product to
the new array, except
for this productld
*/
export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    
    cart = newCart;

    saveToStorage();

}

export function calculateCartQuantity() {

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}