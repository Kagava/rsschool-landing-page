const leftArrow = document.querySelector(".slider__left-arrow");
const rightArrow = document.querySelector(".slider__right-arrow");
const sliderContainer = document.querySelector(".row-slider");
const favoriteSlider = document.querySelector(".favorite__slider");

let currentPosition = -1;

leftArrow.addEventListener("click", slideLeft);
rightArrow.addEventListener("click", slideRight);

function slideLeft() {
  switch (currentPosition) {
    case -1:
      currentPosition = 1;
      moveSlide();
      break;
    case 0:
      currentPosition = -1;
      moveSlide();
      break;
    case 1:
      currentPosition = 0;
      moveSlide();
      break;
    default:
      console.log(currentPosition);
      break;
  }
}

function slideRight() {
  switch (currentPosition) {
    case -1:
      currentPosition = 0;
      moveSlide();
      break;
    case 0:
      currentPosition = 1;
      moveSlide();
      break;
    case 1:
      currentPosition = -1;
      moveSlide();
      break;
    default:
      console.log(currentPosition);
      break;
  }
}

function moveSlide() {
  switch (currentPosition) {
    case -1:
      sliderContainer.style.transform = `translate(0)`;
      break;
    case 0:
      sliderContainer.style.transform = `translate(-100%)`;
      break;
    case 1:
      sliderContainer.style.transform = `translate(-200%)`;
      break;
    default:
      console.error("SLIDER ERROR");
      break;
  }
}

favoriteSlider.addEventListener("click", (e) => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 769) {
    return;
  }
  if (e.clientX / windowWidth <= 0.5) {
    slideLeft();
  } else {
    slideRight();
  }
});
