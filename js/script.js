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
  const deadline = "2021-05-12";

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
});







