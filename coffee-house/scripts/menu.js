import { getProducts } from "./get-product.js";
import { ProductCard } from "./product-card.js";

const menuTags = document.querySelectorAll(".menu__tag");

const cardsContainer = document.querySelector(".main__menu-container");

const coffeeArray = [];
const teaArray = [];
const dessertArray = [];

getProducts().then((data) => {
  for (let item of data) {
    switch (item.category) {
      case "coffee":
        coffeeArray.push(item);
        break;
      case "tea":
        teaArray.push(item);
        break;
      case "dessert":
        dessertArray.push(item);
        break;
      default:
        console.log("ERROR");
        break;
    }
  }
  createView("coffee");
});

function createView(activeMenu) {
  console.log(activeMenu);
  switch (activeMenu) {
    case "coffee":
      cardsContainer.innerHTML = "";
      coffeeArray.forEach((item, index, array) => {
        const newCard = new ProductCard(item);
        cardsContainer.append(newCard.getCard());
      });
      break;
    case "tea":
      cardsContainer.innerHTML = "";
      teaArray.forEach((item, index, array) => {
        const newCard = new ProductCard(item);
        cardsContainer.append(newCard.getCard());
      });
      break;
    case "desert":
      cardsContainer.innerHTML = "";
      dessertArray.forEach((item, index, array) => {
        const newCard = new ProductCard(item);
        cardsContainer.append(newCard.getCard());
      });
      break;
    default:
      console.log("ERROR");
      break;
  }
}

menuTags.forEach((item, index, array) => {
  item.addEventListener("click", tagEvent);
});

function tagEvent(e) {
  const target = e.target;
  if (target.classList.contains("tag_active")) {
    return;
  }
  menuTags.forEach((item) => {
    item.classList.remove("tag_active");
  });
  target.classList.add("tag_active");

  createView(target.classList[1].split("__")[1]);
}
