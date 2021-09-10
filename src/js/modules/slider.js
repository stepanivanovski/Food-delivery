
function slider({
  container,
  sliders,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  let slider = document.querySelector(container),
    prevSlide = slider.querySelector(prevArrow),
    nextSlide = slider.querySelector(nextArrow),
    sliderWrapper = slider.querySelector(wrapper),
    sliderInnerWrapper = sliderWrapper.querySelector(field),
    slides = sliderInnerWrapper.querySelectorAll(sliders),
    currentNumder = document.getElementById(currentCounter),
    totalNumder = document.getElementById(totalCounter),
    width = sliderWrapper.offsetWidth;
    
  // create slider's navbar
  let navbar = document.createElement("div"),
    navbarElements = [];

  navbar.classList.add("carousel-indicators");
  slider.style.position = "relative";
  slider.prepend(navbar);  
  
  for (let i = 0; i < slides.length; i++) {
    navbarElements[i] = document.createElement("div");
    navbarElements[i].classList.add("dot");
    navbar.append(navbarElements[i]);
  }
  
  // set slider's styles
  sliderInnerWrapper.style.cssText = `width: ${100 * slides.length}%;
  display:flex; transition:0.5s all;`;
  sliderWrapper.style.overflow = "hidden";
  
  let offset = 0,
    currentSlide = 0; // the number of the current slide from 0

  totalNumder.textContent = `0${slides.length}`; 
    
  setSlider();

  nextSlide.addEventListener("click", () => {
    currentSlide++;
    if (offset == width * (slides.length - 1)) {
      offset = 0;
      currentSlide = 0;
    } else {
      offset += width;
    }

    setSlider(currentSlide, offset);
  });

  prevSlide.addEventListener("click", () => {
    currentSlide--;
    if (offset == 0) {
      offset = width * (slides.length - 1);
      currentSlide = slides.length - 1;
    } else {
      offset -= width;
    }
    
    setSlider(currentSlide, offset);
  });

  navbar.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("dot")) {
      navbarElements.forEach((navelem, i) => {
        if (e.target == navelem) {
          currentSlide = i;
          offset = width * i;
          setSlider(currentSlide, offset);
        }
      });
    }
  });

  function setSlider(num = 0, offset = 0) {
    currentNumder.textContent = `0${num + 1}`;
    sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;

    navbarElements.forEach((navelem, i) => {
      navelem.style.opacity = "0.5";
    });
    navbarElements[num].style.opacity = "1";
  }
}

export default slider;
