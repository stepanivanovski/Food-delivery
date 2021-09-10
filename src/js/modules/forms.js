import {closeModal, openModal, calcScrollbarWidth} from './modal';
import {postData} from '../services/services';


function forms(formSelector, modalTimerId) {
  //modalTimerId is a parametr for disabling the timer intended for opening a modal window
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((form) => {
    bindPostData(form);
    validateForm(form);
  });
  
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
      postData("http://localhost:3000/requests", json)
        .then(() => {
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch((error) => {
          console.log(error);
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  }

  function validateForm(form) {
    let nameInput = form.querySelector('[type="text"]'),
      phoneInput = form.querySelector('[type="phone"]');
    
    nameInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^\p{L}\s]/igu, '');
    });
    
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d\-()+]/g, '');
    });
  }
}

export default forms;