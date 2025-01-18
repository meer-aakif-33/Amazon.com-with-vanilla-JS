Main Idea of JavaScript
1. Save the data
2. Generate the HTML
3. Make it interactive

Better than updating the DOM every time
1. Update the data
2. Regenerate all the HTML


# Get a Variable Out of a Files

## 1. Add `type="module"` attribute
In the HTML file, add the `type="module"` attribute to the `<script>` tag to enable JavaScript modules.

```html
<script type="module" src="app.js"></script>

1. Add type="module" attribute
2. Export
3. Import

Advantages
-helps avoid naming conflicts
-better way to orgnaimse our code


import everything
import * as cartModuIe from
ca rtModule. ca rt
ca rtModuIe. addToCart( ' id ' ) ;
'../data/cart.js';

Normalizing the data
-just store the product id and get all other details from this id 

External library
= code that is outside of our project

Minification : compression of code

dayjs feature:
Calculate delivery date:
1. Get today's date
2. Do calculations
(Add 7 days, ...)
3. Display the date in easy-to-read format

ESM Version
A version that works with JavaScript Modules

Each file can only have 1 default export

Detailed Workflow for delivery change, how it is working
User Interaction:

The user clicks on a radio button representing a delivery option for a specific product.
Event Listener Tracks the Click:

The click event listener attached to all radio buttons with the class js-delivery-option is triggered.
Retrieve Product and Delivery IDs:

Using element.dataset, the productId and deliveryOptionId stored in the clicked radio button's data-* attributes are accessed:
javascript

const { productId, deliveryOptionId } = element.dataset;
Update the Cart:

The cart (or a similar data structure) looks for the product corresponding to the productId.
The delivery ID for this product in the cart is updated to the new deliveryOptionId.
Find the Delivery Option Details:

The deliveryOptions array is searched for the object whose id matches the deliveryOptionId:
javascript

const selectedOption = deliveryOptions.find(option => option.id === deliveryOptionId);
This provides details such as delivery days and price for the selected delivery option.
Change the DOM:

The DOM is updated to reflect the changes. For example:
Update the delivery date display based on the deliveryDays from selectedOption.
Update the delivery price based on priceCents from selectedOption.
Instant Update:

Since the DOM is updated directly using JavaScript, the page changes instantly without requiring a refresh.



MVC
Split our code into 3 parts
1. Model = saves and manages the data
2. View = takes the data and displays it on the page
3. Controller = runs some code when we interact with the page

MVC is a design pattern

Testing

Disadvantages of Manual Testing
1. Hard to test every situation
2. Hard to re-test

Testing Framework
1. Create test suite
2. Create tests
3. Compare values and display result


Object-Oriented Programming (OOP)
- another style of programming (another way we write our code)

Procedural Programming
- Procedure = a set of step-by-step instructions = a function