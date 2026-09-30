const body = document.body;
const burgerButton = document.querySelector(".header__burger-navigation");
const navigation = document.querySelector(".header__navigation-container");
const burgerLines = document.querySelectorAll(".burger-line");

console.log(navigation);
burgerButton.addEventListener("click", toggleNavigation);
navigation.addEventListener("click", toggleNavigation);

function toggleNavigation() {
  body.classList.toggle("no-skroll");
  burgerLines.forEach((item) => {
    item.classList.toggle("burger__cross");
  });
  navigation.classList.toggle("burger--active");
}

console.log(window.innerWidth);
