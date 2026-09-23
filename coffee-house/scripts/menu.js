import { getProducts } from "./get-product.js";
import { ProductCard } from "./product-card.js";

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
  createView();
});

function createView() {
  coffeeArray.forEach((item, index, array) => {
    const newCard = new ProductCard(item);
    cardsContainer.append(newCard.getCard());
  });
}
