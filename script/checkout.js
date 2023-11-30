import { cart, removeFromCart, updateItemQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateQuantity } from "./utils/quanityCalculater.js";

//converting static HTML to dynamic using JS similary to amazone.js where data was taken from product.js and populatted on webpage using js
let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === productId ){
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
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
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

});
//pushing the generated HTML into the webpage using DOM
document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

//adding event listner to all delect link on checkout page
document.querySelectorAll('.js-remove-cart').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    //function in cart.js to remove item from cart
    removeFromCart(productId);
    //we need to remove item form webpage here instead from the above function is as it doesnt have acces to the html in this page, we are using the .remove() function of dom to remove the html div using its unique class that contains its id
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    document.querySelector('.js-item-quantity').innerHTML = updateQuantity() + ' Items';
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
    document.querySelector('.js-item-quantity').innerHTML = updateQuantity() + ' Items';
    
    
  });
});

//shows the quantity of items presnet in the cart on the webpage
document.querySelector('.js-item-quantity').innerHTML = updateQuantity() + ' Items';
  