// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items
const cartItemCount = getElement('.cart-item-count')
const cartItems = getElement(".cart-items")
const cartTotal = getElement('.cart-total')

let cart = getStorageItem('cart')

export const addToCart = (id) => {
let item = cart.find((cartItem)=> cartItem.id === id)
if(!item){
let product = findProduct(id);
// add item to cart
product = {...product,amount:1};
cart = [...cart,product]
// add item to DOM
addToCartDOM(product)
}
else{
  // update value
const amount = increaseAmount(id);
const items = [...cartItems.querySelectorAll('.cart-item-amount')]
const newAmount = items.find((value)=>value.dataset.id === id);
newAmount.textContent = amount;
}
// add one to item count
displayCartItemCount()
//  display cart total
displayCartTotal()
//  set cart in local storage
setStorageItem('cart',cart)
  openCart()
};

function displayCartItemCount(){
  let amount = cart.reduce((total,item)=>{
  return total +=item.amount;
  },0);
cartItemCount.textContent = amount;
}

function displayCartTotal(){
  let total = cart.reduce((total,item)=>{
    return total += item.price * item.amount;
  },0)
  cartTotal.textContent = `Total: ${formatPrice(total)}`
}
function displayCartItems(){
cart.forEach((item)=>{
  addToCartDOM(item);
})
}
function increaseAmount(id){
  let newAmount;
  cart = cart.map((item)=>{
    if(item.id === id){
      newAmount = item.amount + 1;
      item= {...item,amount:newAmount }
    }
    return item;
  })
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      item = { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
}
function removeItem(id){
cart = cart.filter((item)=>{
  if(item.id !== id)
  return item
})}


function setupCartFunctionality(){
cartItems.addEventListener("click",(e)=>{
const element = e.target;
const parent = e.target.parentElement;
const id = e.target.dataset.id;
const parentID = parent.dataset.id;
// remove
if(element.classList.contains("cart-item-remove-btn")){
  removeItem(id)
  parent.parentElement.remove();
}
// increase
if(parent.classList.contains("cart-item-increase-btn")){
  let newAmount = increaseAmount(parentID)
  parent.nextElementSibling.textContent= newAmount;
}
// decrease
if (parent.classList.contains("cart-item-decrease-btn")){
  let newAmount= decreaseAmount(parentID);
  if(newAmount === 0){
    parent.parentElement.parentElement.remove()
  }else{
    parent.previousElementSibling.textContent= newAmount;
  
  }
}
displayCartItemCount();
displayCartTotal()
setStorageItem('cart',cart)
})
}

const init = ()=>{
  // display amount of cart item
  displayCartItemCount()
  // display cart total
  displayCartTotal()
  // add all cart items to DOM
  displayCartItems()
  // setup cart functions
  setupCartFunctionality()
}
init()