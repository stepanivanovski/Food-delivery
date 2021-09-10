  import tabs from './modules/tabs';
  import calc from './modules/calc';
  import cards from './modules/cards';
  import forms from './modules/forms';
  import modal from './modules/modal';
  import slider from './modules/slider';
  import timer from './modules/timer';
  import {openModal} from './modules/modal'; 

window.addEventListener("DOMContentLoaded", () => {
  'use strict';
  
  const modalTimerId = setTimeout(() => {openModal('.modal', modalTimerId);}, 3000);
  
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  
  modal('[data-modal]', '.modal', modalTimerId);

  slider({
    container: ".offer__slider",
    sliders: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "total",
    currentCounter: "current", 
    wrapper: ".offer__slider-wrapper",
    field:".slider__width"
  });

  calc();

  cards('[data-class]');

  forms("form", modalTimerId);

  timer(".timer", "2022-05-12");
});
