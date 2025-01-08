export const cart = [];


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
}
