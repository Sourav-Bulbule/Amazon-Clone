// saving each product info into a variable by creating a object of each product
// const products = [{
//   image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//   name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//   rating:{
//     stars:4.5,
//     count:87
//   },
//   price: 1090
// },{
//   image: 'images/products/intermediate-composite-basketball.jpg',
//   name: 'Intermediate Size Basketball',
//   rating:{
//     stars:4,
//     count:127
//   },
//   price: 2095
// },{
//   image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//   name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//   rating:{
//     stars:4.5,
//     count:56
//   },
//   price: 799
// }
// ];
//this data was then included directly from the folder product.js

import{ addToCart} from '../data/cart.js';
import{products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateQuantity } from './utils/quanityCalculater.js';


// creating a html for each product in JS to replace it from HTML
let productsHTML = '';
products.forEach((product)=>{
  productsHTML += `<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars * 10}.png">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    $${formatCurrency(product.priceCents)}
  </div>

  <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
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

  <div class="added-to-cart  js-add-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart"
  data-product-id="${product.id}">
    Add to Cart
  </button>
</div>`

});
// fetching html tag using class to insert the HTML data created in JS
document.querySelector('.js-products-grid').innerHTML = productsHTML;

function addedPopup(productId){
  //adding popup messege when when item added to cart
  const popUp= document.querySelector(`.js-add-to-cart-${productId}`);
  popUp.classList.add('added');
  setTimeout(() => {
    popUp.classList.remove('added');
  },2000);
}





//adding eventlistener to each add to cart button
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productId;
  
    addedPopup(productId);
    addToCart(productId);
    document.querySelector('.js-cart-quantity').innerHTML = updateQuantity();
    });
  });

   //this code helps update the count when we go back to amazon page from checklist page;
   document.querySelector('.js-cart-quantity').innerHTML = updateQuantity();


