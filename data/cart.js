export let cart = JSON.parse(localStorage.getItem('cart'));
import { updateQuantity } from "../script/utils/quanityCalculater.js";
//if local storage data is empty then this default cart will be used
if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId:'1'
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId:'2'
  }];
}


//saving data to localstorage need to add this where data is added or removed from cart
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId){
  //selcet the number of quantity from the option provided and convert to number
  let quantitySelector;
  quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  quantitySelector = Number(quantitySelector.value);
  
  //check if product is already in the cart
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  //if product is in the cart increase its quantity else add new product into the cart
    if(matchingItem){
      matchingItem.quantity+=quantitySelector;
    }else{
      cart.push({
        productId: productId,
        quantity: quantitySelector,
        deliveryOptionId:'1'
      });
    }
    //update data to local storage
    saveToStorage();
}

//function to remove cart item
export function removeFromCart(productId){
  const newcart=[]
  cart.forEach( cartItem=>{
    if(cartItem.productId !== productId){
      newcart.push(cartItem)
    }
  });
  cart = newcart;

  //update data to localstprage
  saveToStorage();
}

//function to update the new quantity enterd in the checklist page using update button
export function updateItemQuantity(productId,newQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
  location.reload();
  
}


//function to update the deliveryoption we select in the 3 options preset to make the website interactive
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}