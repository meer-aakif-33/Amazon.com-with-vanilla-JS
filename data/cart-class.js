// import { loadFromStorage } from "./cart";
class Cart {
    cartItems = undefined; //public property
    #localStorageKey = undefined; //private property/field


    constructor(localStorageKey) {
        this.#localStorageKey=localStorageKey
        this.#loadFromStorage()

    }
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
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


    saveToStorage() {
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }


    addToCart(productId, quantity){
    
        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    
        if (matchingItem) {
            matchingItem.quantity += quantity; //Update the quantity of the existing item
        } else {
            this.cartItems.push({ // Add a new item to the cart
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }
    
        //console.log("Cart after adding item:", cart);
    
        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity){
    
        this.cartItems.forEach((cartItem) => {
            if (productId == cartItem.productId) {
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToStorage();
    
    }

    removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        
        this.cartItems = newCart;
    
        this.saveToStorage();
    
    }

    calculateCartQuantity() {
    
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }


    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }
    
}; 


const cart = new Cart("cart-oop");
const bussinessCart = new Cart("cart-business");

console.log(cart);
console.log(bussinessCart)

console.log(bussinessCart instanceof Cart)
    
