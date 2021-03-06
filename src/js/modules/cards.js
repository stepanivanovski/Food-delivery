import {getResourse} from '../services/services';

function cards(cardsSelector) {
  const menuContainer = document.querySelector(cardsSelector);
  
  class Menu {
    constructor(img, altimg, title, descr, price, parent){
      this.img = img;
      this.altimg = altimg ;
      this.title = title ;
      this.descr = descr ;
      this.price =  price;
      this.parent = parent;
      this.transfer = 27;
      this.changeToUAH();
    }
    
    changeToUAH() {
      this.price = this.price * this.transfer; 
    }

    create() {
      let divMenu = document.createElement('div');

      divMenu.innerHTML = `<img src="${this.img}" alt="${this.altimg}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span> ${this.price}</span> грн/день</div>
      </div>`;

      divMenu.classList.add('menu__item');
      this.parent.prepend(divMenu);
    }
  } 

  menuContainer.innerHTML = '';
  
  getResourse('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new Menu(img, altimg, title, descr, price, menuContainer).create();
      });  
    })
    .catch(error => console.log(error));
}

export default cards;