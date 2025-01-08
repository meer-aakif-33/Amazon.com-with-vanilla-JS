export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},
{    
productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
quantity: 1
}];


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
