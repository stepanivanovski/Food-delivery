'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideContent() {
    content.forEach((item) => {
      item.style.display = 'none';
    }); 

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  } 

  function addContent(i = 0) {
    content[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideContent();
  addContent();

  tabsParent.addEventListener('click', (e)=>{
    if(e.target && e.target.classList.contains('tabheader__item')){
      tabs.forEach((item, i) => {
        if(item == e.target){
          hideContent(i);
          addContent(i);
        }
      });
    }

  });

});






