# Amazon-like Web Application - README

This project is a feature-rich e-commerce application implemented in Vanilla JavaScript. It replicates the core functionalities of an e-commerce platform like Amazon, including product browsing, cart management, order summary, and payment summary.

## Features

### 1. **Product Browsing**
- **Dynamic Product Rendering:** Products are dynamically loaded and displayed in a grid format using the `renderProductsGrid` function.
- **Product Information:** Each product card displays:
  - Product image
  - Product name
  - Product rating (stars and count)
  - Product price
  - Additional product information (if available)
- **Interactive Quantity Selector:** Users can choose the quantity of a product using a dropdown selector.

### 2. **Add to Cart**
- **Interactive Add to Cart Button:**
  - Adds the selected product and quantity to the cart.
  - Updates the cart quantity displayed in the navigation bar.
  - Displays a temporary "Added" message for user confirmation.
- **Cart Management:**
  - Updates the quantity if the product already exists in the cart.
  - Allows adding new products to the cart.

### 3. **Cart and Order Summary**
- **Order Summary Rendering:**
  - Displays detailed information about items in the cart, including:
    - Delivery date calculated based on selected delivery options.
    - Product image, name, price, and quantity.
  - Interactive quantity management:
    - Users can update the quantity of items directly in the cart.
    - Quantity input validation ensures values are between 1 and 1000.
    - Option to remove items from the cart.
  - Delivery option selection:
    - Users can choose different delivery options for each product.
    - Updates the delivery date dynamically.

### 4. **Payment Summary**
- **Dynamic Payment Calculations:**
  - Calculates the total product price, shipping cost, tax, and final order total.
  - Displays the breakdown of costs:
    - Items (total price for selected quantities)
    - Shipping & handling
    - Tax (10%)
    - Order total
- **Place Order Button:** A call-to-action button for placing the order.

### 5. **Local Storage Integration**
- **Persistent Cart State:**
  - Cart data is saved to and loaded from local storage.
  - Ensures cart contents persist across page reloads.
- **Cart Management Functions:**
  - Add, update, or remove items from the cart.
  - Update delivery options.
  - Calculate the total number of items in the cart.

### 6. **Reusable Cart Module (OOP)**
- **Object-Oriented Design:**
  - The cart functionality is encapsulated in a reusable `Cart` object.
  - Supports multiple cart instances (e.g., business cart and personal cart).
- **Cart Methods:**
  - `loadFromStorage()`: Loads cart data from local storage.
  - `saveToStorage()`: Saves cart data to local storage.
  - `addToCart(productId, quantity)`: Adds or updates items in the cart.
  - `updateQuantity(productId, newQuantity)`: Updates the quantity of a specific item.
  - `removeFromCart(productId)`: Removes an item from the cart.
  - `calculateCartQuantity()`: Calculates the total number of items in the cart.
  - `updateDeliveryOption(productId, deliveryOptionId)`: Updates the delivery option for a specific product.

### 7. **Utility Functions**
- **Currency Formatting:** Utilizes a `formatCurrency` function for consistent price display.
- **Date Formatting:** Uses the `dayjs` library for date calculations and formatting.
- **Reusable Components:** Modular functions for rendering and managing the cart, order summary, and payment summary.

### 8. **Error Handling and Validation**
- **Missing DOM Elements:** Logs errors if required DOM elements are not found.
- **Input Validation:** Ensures valid quantities are entered for cart items.

### 9. **Scalable Design**
- **Modular Codebase:**
  - Separate files for cart, products, delivery options, and utilities.
  - Facilitates maintainability and scalability.
- **Dynamic Integration:** Dynamically loads products and renders the UI based on data.

### 10. **Third-Party Libraries**
- **`dayjs`:** For date manipulation and formatting.
- **`supersimpledev`:** For additional utilities (currently commented out).

## File Structure
- **`data/`:** Contains data modules for products, cart, and delivery options.
- **`scripts/utils/`:** Includes utility functions like currency formatting.
- **`checkout/`:** Handles rendering of order and payment summaries.

## How to Run
1. Clone the repository.
2. Open the project in a code editor.
3. Launch the application using a live server or by opening the `index.html` file in a browser.
4. Interact with the product grid, add items to the cart, and view the order and payment summaries.

## Contributor
- **Meer Aakif** ([GitHub](https://github.com/meer-aakif-33))

