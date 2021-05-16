'use strict';
window.addEventListener("DOMContentLoaded", () => {
  //Tabs
  const content = document.querySelectorAll(".tabcontent"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideContent() {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function addContent(i = 0) {
    content[i].classList.remove("hide");
    content[i].classList.add("show", "fade");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideContent();
  addContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item == e.target) {
          hideContent(i);
          addContent(i);
        }
      });
    }
  });

  //timeOut
  const deadline = "2022-05-12";

  function getRemainingTime(endtime) {
    const t = Date.parse(deadline) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num){
    if (num >= 0 && num < 10){
      return `0${num}`;
    }else{
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    let Int = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const t = getRemainingTime(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total < 0) {
        clearInterval(Int);
      }
    }
  }

  setClock(".timer", deadline);

  //Modal
  const modal = document.querySelector(".modal"),
    btnsModal = document.querySelectorAll("[data-modal]"),
    closeModal = document.querySelector("[data-close]");
    //modalTimeOut = setTimeout(addModal, 5000);
 
  btnsModal.forEach((item) => {
    item.addEventListener("click", addModal);
  });
  
  closeModal.addEventListener("click", hideModal);
  
  modal.addEventListener("click", (e) => {
     console.log(e);
     if (e.target == modal){
      hideModal();
    }
  });
    
  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      console.log(e.code);
      hideModal();
    }
  });

  document.addEventListener("scroll", removeScrollEvent);
  
  function removeScrollEvent() {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      addModal();
      document.removeEventListener("scroll", removeScrollEvent);
    }
    
  }

  function hideModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function addModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    //clearTimeout(modalTimeOut);
    document.body.style.overflow = 'hidden';
  }

  //Class
  const menu = document.querySelector('[data-class]');
  class Menu {
    constructor(menuTitle, menuDescrip, cost, imgWay, parent, alt){
      this.menuTitle = menuTitle;
      this.menuDescrip = menuDescrip;
      this.cost = cost;
      this.imgWay = imgWay;
      this.parent =  parent;
      this.alt = alt;
    }

    create(){
      let divMenu = document.createElement('div');
      divMenu.innerHTML = `<img src="${this.imgWay}" alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
      <div class="menu__item-descr">${this.menuDescrip}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span> ${this.cost}</span> грн/день</div>
      </div>`;
      divMenu.classList.add('menu__item');
      this.parent.prepend(divMenu);
    }

  } 
  menu.innerHTML = '';

  new Menu(
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    '229', 
    'img/tabs/vegy.jpg',
    menu,
    'vegy'
    ).create();

  new Menu(
    'Меню "Премиум"', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    '550', 
    'img/tabs/elite.jpg',
    menu,
    'elite'
    ).create();

  new Menu(
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    '430', 
    'img/tabs/post.jpg',
    menu,
    'post'
    ).create();

  // Forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: "Загрузка",
    done: "Мы с вами свяжемся",
    error: 'Что-то пошло не так'
  };

   forms.forEach((item) => {
    sendForm(item);
   });

  function sendForm(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const divMessage = document.createElement('div');
      const formFormData = new FormData(form);
      const object = {};

      formFormData.forEach((value, key) => {
        object[key] = value;
      });

      const objectJSON = JSON.stringify(object);


      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send(objectJSON); 

      divMessage.textContent = message.loading;
      form.append(divMessage);

      request.addEventListener('load', () => {
        if(request.status == 200){
          console.log(request.response);
          divMessage.textContent = message.done;
          form.reset();
          setTimeout(() => {divMessage.remove();}, 3000);
          
        }else{
          console.log("error");
          divMessage.textContent = message.error;
        }
      });
    });
  }   
});








