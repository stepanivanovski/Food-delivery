'use strict';
  import calc from './modules/calc';
  import cards from './modules/cards';
  import forms from './modules/forms';
  import modal from './modules/modal';
  import slider from './modules/slider';
  import tabs from './modules/tabs';
  import timer from './modules/timer';
  import {openModal} from './modules/modal'; 

window.addEventListener('readystatechange', () => {
  console.log(document.readyState);
})
window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => {openModal(modalSelector, modalTimerId);}, 300000);
  calc();
  cards('[data-class]');
  forms("form", modalTimerId);
  modal('[data-modal]', '.modal', modalTimerId );
  slider({
    conteiner: ".offer__slider",
    sliders: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current", 
    wrapper: ".offer__slider-wrapper",
    field:".slider__width"
  });
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  timer(".timer", "2022-05-12");
});
