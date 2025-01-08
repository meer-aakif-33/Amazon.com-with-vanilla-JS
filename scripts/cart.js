export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},
{    
productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
quantity: 1
}];

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
            quantity: quantity
        });
    }

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