import { cart, removeFromCart, updateItemQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { updateQuantity } from "../utils/quanityCalculater.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import{deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";



//make this function as it hold the main html to load on the page so incase if we make changes to any one element on the page instead of reloading the page we call this function to re-run and update thoes elements to the page
export function renderOrderSummary(){
//converting static HTML to dynamic using JS similary to amazone.js where data was taken from product.js and populatted on webpage using js
let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
  //function to find the matching product 
  const productId = cartItem.productId;
  const matchingProduct = getProduct(productId)

  //get the date we have selected in the delivery option and use it to put in the div delivery-date
  //function to find the deliveryotpion delected
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOption(deliveryOptionId);

    //const today = dayjs();
    //const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    

    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    //check if its sunday or saturday and if it is add 1 or 2 days extra to make the changes so it does not display saturday or sunday
    const dayOfWeek = isWeekend(deliveryDate);
    if(dayOfWeek === 'Saturday'){
      deliveryDate = deliveryDate.add(2,'days')
    }else if(dayOfWeek === 'Sunday'){
      deliveryDate = deliveryDate.add(1,'days')
    }
    const dateString = deliveryDate.format('dddd, MMMM D');



  //creating html  
  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src=${matchingProduct.image}>

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}" >${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-cart" data-product-id="${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-new-quantity-${matchingProduct.id}" type="number" min="1">
        <span class="save-quantity-link link-primary js-savequantityto-cart" data-product-id="${matchingProduct.id}" >Save</span>
        <span class="delete-quantity-link link-primary js-remove-cart" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryOptionsHTML(matchingProduct,cartItem)}
    </div>
  </div>
</div>`;

});
//pushing the generated HTML into the webpage using DOM
document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;
// function to get the format of date to return day of the week not the date
function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek
}
//creating function to create deliveryoption HTML seperatly
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = ''
  deliveryOptions.forEach((deliveryOption)=>{

    //check if its sunday or saturday and if it is add 1 or 2 days extra to make the changes so it does not display saturday or sunday
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dayOfWeek = isWeekend(deliveryDate);
    if(dayOfWeek === 'Saturday'){
      deliveryDate = deliveryDate.add(2,'days')
    }else if(dayOfWeek === 'Sunday'){
      deliveryDate = deliveryDate.add(1,'days')
    }
    const dateString = deliveryDate.format('dddd, MMMM D');


    const priceString = deliveryOption.priceCents === 0? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} -`;  

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=
    `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id }">
        <input type="radio"
        ${isChecked ?'checked':''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>`
  })
  return html;
}

//adding event listner to all delete link on checkout page
document.querySelectorAll('.js-remove-cart').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    //function in cart.js to remove item from cart
    removeFromCart(productId);
    //we need to remove item form webpage here instead from the above function is as it doesnt have acces to the html in this page, we are using the .remove() function of dom to remove the html div using its unique class that contains its id
    //the below wee have to codes one which deletes the html directly(ie. usind dom as commenetd below) another which re-runs the html (ie. renderordersummary(0))
    // const container = document.querySelector(`.js-cart-item-container-${productId}`);
    // container.remove();
    renderOrderSummary();
    renderPaymentSummary();
  })
});

//adding eventlistner to each delivery option to update the option selected on the page and displacy the delivery date of the option we select
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId,deliveryOptionId)
    renderOrderSummary();
    renderPaymentSummary();
  })
});


//adding event listner to all update link on checkout page
document.querySelectorAll('.js-update-cart').forEach(updateLink=>{
  updateLink.addEventListener('click',()=>{
    const productId = updateLink.dataset.productId;
    const update = document.querySelector(`.js-cart-item-container-${productId}`);
    update.classList.add('is-editing-quantity')
  });
});

//saving quantity eventlsitener
document.querySelectorAll('.js-savequantityto-cart').forEach(saveLink=>{
  saveLink.addEventListener('click',()=>{
    const productId = saveLink.dataset.productId;
    const save = document.querySelector(`.js-cart-item-container-${productId}`);
  
    let newQuantity = document.querySelector(`.js-new-quantity-${productId}`);
    newQuantity = Number(newQuantity.value);
    //checking if the entered quantity is 1 or more the one,if nothing is entered the
    if(newQuantity>=1){
      updateItemQuantity(productId,newQuantity);
    }else{
      newQuantity=1;
      updateItemQuantity(productId,newQuantity);
    }
    
    save.classList.remove('is-editing-quantity');
    renderOrderSummary();
    //document.querySelector('.js-item-quantity').innerHTML = updateQuantity() + ' Items';
    renderPaymentSummary();
    
  });
});

//shows the quantity of items presnet in the cart on the webpage
document.querySelector('.js-item-quantity').innerHTML = updateQuantity() + ' Items';

const today = dayjs();
      const date = today.subtract(1, 'month');
      console.log(date.format('MMMM D'));
}

renderOrderSummary();

