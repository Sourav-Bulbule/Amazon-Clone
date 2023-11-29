export let cart = JSON.parse(localStorage.getItem('cart'));

//if local storage data is empty then this default cart will be used
if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
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
        quantity: quantitySelector
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