function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(modalSelector,modalTimerId);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener("scroll", showModalByScroll);
  
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
      ) {
      openModal(modalSelector,modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.cssText = `overflow:hidden; 
    padding-right:${calcScrollbarWidth()}px;`;

  if (modalTimerId){
     clearInterval(modalTimerId); 
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.cssText = `overflow:auto; 
    padding-right:0px`;
}

function calcScrollbarWidth() {
  let div = document.createElement('div');
  div.style.cssText = "width:100px; hieght:100px; overflow:scroll;";
  document.body.append(div);

  let scrollbarWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return scrollbarWidth;
}

export default modal;
export {openModal, closeModal, calcScrollbarWidth};
