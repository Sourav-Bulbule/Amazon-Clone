import { cart } from "../../data/cart.js";
export function updateQuantity(){
  //counting the total quantity of product added to the cart including the same products if present
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  //display the cart quantity on the webpage
  return cartQuantity;

}