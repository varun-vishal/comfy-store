import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
 const form = getElement('.input-form')
 const name = getElement('.search-input')
 form.addEventListener('keyup',()=>{
  const value = name.value;
  if(value){
   let newStore = store.filter((product)=>{
    let {name} =product;
    name = name.toLowerCase();
    if(name.startsWith(value)){
     return product
    }
   })
   display(newStore,getElement('.products-container'))
   if(newStore.length<1){
    const products = getElement('.products-container')
    products.innerHTML = `<h3 class="filter-error">Sorry, no product matched your search</h3>`
   }
  }else{
   display(store,getElement('.products-container'))
  }
 })
};

export default setupSearch;
