import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
 const priceInput = getElement('.price-filter')
 const values = getElement('.price-value')
 // setup filter
 let maxPrice = store.map((product)=>product.price)
 maxPrice=Math.max(...maxPrice);
 maxPrice=Math.ceil(maxPrice/100)
 priceInput.value=maxPrice;
 priceInput.min=0;
 priceInput.max=maxPrice;
 values.textContent = `$ ${maxPrice}`;

 priceInput.addEventListener('input',()=>{
  const value =parseInt(priceInput.value);
  values.textContent=`$ ${value}`;
  let newStore = store.filter((product)=>product.price/100<=value)
  display(newStore,getElement('.products-container'))
  if(newStore.length<1){
   const products= getElement('.products-container');
   products.innerHTML= `<h3 class="filter-error">sorry, no product matched your search</h3>`
  }
 })
};

export default setupPrice;
