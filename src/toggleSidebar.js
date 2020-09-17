import { getElement } from './utils.js';

const toggleBtn = getElement('.toggle-nav')
const sidebarOverlay = getElement('.sidebar-overlay')
const closeBtn = getElement('.sidebar-close')

toggleBtn.addEventListener('click',()=>{
 sidebarOverlay.classList.add("show")
})

closeBtn.addEventListener('click', () => {
 sidebarOverlay.classList.remove("show")
})