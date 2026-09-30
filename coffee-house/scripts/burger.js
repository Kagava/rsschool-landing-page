const body = document.body;
const burgerButton = document.querySelector(".header__burger-navigation");
const navigation = document.querySelector(".header__navigation-container");
const burgerLines = document.querySelectorAll(".burger-line");

let resizeTimer = 0;

window.addEventListener("resize", () => {
  const currentWidth = window.innerWidth;

  navigation.classList.add("no-transition");
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    navigation.classList.remove("no-transition");
  }, 100);

  if (currentWidth >= 769 && navigation.classList.contains("burger--active")) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") {
    return;
  }
  if (navigation.classList.contains("burger--active")) {
    closeNavigation();
  }
});

burgerButton.addEventListener("click", toggleNavigation);

navigation.addEventListener("click", toggleNavigation);

function toggleNavigation() {
  body.classList.toggle("no-skroll");
  burgerLines.forEach((item) => {
    item.classList.toggle("burger__cross");
  });
  navigation.classList.toggle("burger--active");
}

function closeNavigation() {
  body.classList.remove("no-skroll");
  burgerLines.forEach((item) => {
    item.classList.remove("burger__cross");
  });
  navigation.classList.remove("burger--active");
}

console.log(window.innerWidth);
