export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2
}];

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