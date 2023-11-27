export const cart = [];

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
        quantity: quantitySelector
      });
    }
}