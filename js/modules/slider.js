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