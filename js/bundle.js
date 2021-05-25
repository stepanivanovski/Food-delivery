/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  const result = document.querySelector('.calculating__result span');
  
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
  } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
  } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = '____';
          return;
      }
      if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
          result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
  }

  calcTotal();

  function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.classList.remove(activeClass);
          if (elem.getAttribute('id') === localStorage.getItem('sex')) {
              elem.classList.add(activeClass);
          }
          if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
              elem.classList.add(activeClass);
          }
      });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.addEventListener('click', (e) => {
              if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio');
                  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
              } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
              }
  
              elements.forEach(elem => {
                  elem.classList.remove(activeClass);
              });
  
              e.target.classList.add(activeClass);
  
              calcTotal();
          });
      });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
          if (input.value.match(/\D/g)) {
              input.style.border = "1px solid red";
          } else {
              input.style.border = 'none';
          }
          switch(input.getAttribute('id')) {
              case "height":
                  height = +input.value;
                  break;
              case "weight":
                  weight = +input.value;
                  break;
              case "age":
                  age = +input.value;
                  break;
          }

          calcTotal();
      });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  const menu = document.querySelector('[data-class]');
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

    create(){
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
  menu.innerHTML = '';

  const getResourse = async (url) => {
    const res =  await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

     return await res.json();
  };

  axios.get('http://localhost:3000/menu')
    .then((data) => {
      console.log(data);
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new Menu(img, altimg, title, descr, price, menu).create();
     });
    });

 /* getResourse('  http://localhost:3000/menu')
     .then(data => {
       console.log(data);
       data.forEach(({img, altimg, title, descr, price}) => {
          new Menu(img, altimg, title, descr, price, menu).create();
       });  
     });*/

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  const forms = document.querySelectorAll('form');
  const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
      bindPostData(item);
  });

  const postData = async (url, data) => {
      let res = await fetch(url, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: data
      });
  
      return await res.json();
  };



  function bindPostData(form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          let statusMessage = document.createElement('img');
          statusMessage.src = message.loading;
          statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend', statusMessage);
      
          const formData = new FormData(form);

          const json = JSON.stringify(Object.fromEntries(formData.entries()));

          postData('http://localhost:3000/requests', json)
          .then(data => {
              console.log(data);
              showThanksModal(message.success);
              statusMessage.remove();
          }).catch(() => {
              showThanksModal(message.failure);
          }).finally(() => {
              form.reset();
          });
      });
  }

  function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal();
      }, 4000);
  }

}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
  });

  function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
  }

  function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
  }

  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
          closeModal();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) { 
          closeModal();
      }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
      }
  }
  window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
  const prevSlider = document.querySelector(".offer__slider-prev"),
    nextSlider = document.querySelector(".offer__slider-next"),
    slide = document.querySelectorAll(".offer__slide"),
    currentNumder = document.querySelector("#current"),
    totalNumder = document.querySelector("#total"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    innerWrapper = document.querySelector(".slider__width"),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(".offer__slider");

  const carousel = document.createElement("div");
  carousel.classList.add("carousel-indicators");
  const arrIndicator = [];

  slider.style.position = "relative";
  slider.prepend(carousel);

  for (let i = 0; i < slide.length; i++) {
    arrIndicator[i] = document.createElement("div");
    arrIndicator[i].classList.add("dot");
  }

  arrIndicator.forEach((item, i) => {
    carousel.append(item);
  });

  let offset = 0;
  let y = 0;
  innerWrapper.style.width = 100 * slide.length + "%";
  innerWrapper.style.display = "flex";
  sliderWrapper.style.overflow = "hidden";
  innerWrapper.style.transition = "0.5s all";

  slide.forEach((slide) => {
    slide.style.width = width;
  });

  console.log(removeNotDigit(width));

  currentNumder.textContent = `0${y + 1}`;
  totalNumder.textContent = `0${slide.length}`;
  arrIndicator[0].style.opacity = "1";

  nextSlider.addEventListener("click", () => {
    y++;
    if (offset == +removeNotDigit(width) * (slide.length - 1)) {
      offset = 0;
      y = 0;
    } else {
      offset += +removeNotDigit(width);
    }

    setSlider(y, offset);
  });

  prevSlider.addEventListener("click", () => {
    y--;
    if (offset == 0) {
      offset = +removeNotDigit(width) * (slide.length - 1);
      y = slide.length - 1;
    } else {
      offset -= +removeNotDigit(width);
    }
    setSlider(y, offset);
  });

  carousel.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("dot")) {
      arrIndicator.forEach((item, i) => {
        if (e.target == item) {
          y = i;
          offset = +removeNotDigit(width) * i;
          setSlider(y, offset);
        }
      });
    }
  });

  function setSlider(num, offset) {
    currentNumder.textContent = `0${num + 1}`;
    innerWrapper.style.transform = `translateX(-${offset}px)`;
    arrIndicator.forEach((item, i) => {
      item.style.opacity = "0.5";
    });
    arrIndicator[num].style.opacity = "1";
  }

  function removeNotDigit(value) {
    return value.replace(/\D/g, "");
  }

  /*function hideSlide() {
    slide.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
  }

  function addSlide(i = 0) {
    slide[i].classList.remove("hide");
    slide[i].classList.add("show");
  }

  hideSlide();
  addSlide();

  currentNumder.textContent = `0${y + 1}`;
  totalNumder.textContent = `0${slide.length}`;

  nextSlider.addEventListener("click", () => {
    y++;
    if (y < slide.length) {
      hideSlide();
      addSlide(y);
    } else {
      y = 0;
      hideSlide();
      addSlide(y);
    }
    currentNumder.textContent = `0${y + 1}`;
  });

  prevSlider.addEventListener("click", () => {
    y--;
    if (y >= 0) {
      hideSlide();
      addSlide(y);
    } else {
      y = 3;
      hideSlide();
      addSlide(y);
    }
    currentNumder.textContent = `0${y + 1}`;
  });*/
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
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
}

module.exports = tabs;



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
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
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

window.addEventListener("DOMContentLoaded", () => {
  const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

  calc();
  cards();
  forms();
  modal();
  slider();
  tabs();
  timer();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map