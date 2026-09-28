import { getProducts } from "./get-product.js";
import { ProductCard } from "./product-card.js";

const body = document.body;
const menuTags = document.querySelectorAll(".menu__tag");
const cardsContainer = document.querySelector(".main__menu-container");
const backdrop = document.querySelector(".backdrop");

const modal = document.querySelector(".modal");
const sizeContainer = modal.querySelector(".modal__size-container");
const additivesContainer = modal.querySelector(".modal__additives-container");
const modalPrice = document.querySelector(".modal__price");
const modalCloseButton = document.querySelector(".modal__close-button");

const coffeeArray = [];
const teaArray = [];
const dessertArray = [];

let activePrice = 0;
let activeTag = "coffee";

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
  createView(activeTag);
});

function createView(activeMenu) {
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
  activeTag = target.classList[1].split("__")[1];
  createView(activeTag);
}

cardsContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".menu__card");
  if (!target) {
    return;
  }
  const targetName = target.querySelector(".card__heading").innerHTML;
  findProduct(targetName);
});

function findProduct(productName) {
  let targetProduct;
  switch (activeTag) {
    case "coffee":
      targetProduct = findCoffee(productName);
      break;
    case "tea":
      targetProduct = findTea(productName);
      break;
    case "desert":
      targetProduct = findDessert(productName);
      break;
    default:
      console.log("ERROR");
      break;
  }
  openModal(targetProduct);
}

function findCoffee(productName) {
  for (let coffee of coffeeArray) {
    if (coffee.name === productName) {
      return coffee;
    }
  }
}

function findTea(productName) {
  for (let tea of teaArray) {
    if (tea.name === productName) {
      return tea;
    }
  }
}

function findDessert(productName) {
  for (let dessert of dessertArray) {
    if (dessert.name === productName) {
      return dessert;
    }
  }
}

function openModal(targetProduct) {
  openBackdrop();
  fillModal(targetProduct);
  modal.classList.add("active");
}

function openBackdrop() {
  backdrop.classList.add("active");
  body.style.overflow = "hidden";
}

function closeBackdrop() {
  backdrop.classList.remove("active");
  body.style.overflow = "auto";

  modal.classList.remove("active");
}

backdrop.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".modal")) {
    return;
  }
  closeBackdrop();
});

function fillModal(targetProduct) {
  const tartgeName = targetProduct.name;

  const image = modal.querySelector(".modal__image > img");
  image.src = targetProduct["image-addres"];
  image.alt = tartgeName;

  modal.querySelector(".modal__heading").textContent = tartgeName;
  modal.querySelector(".modal__description").textContent =
    targetProduct.description;

  sizeContainer.innerHTML = "";
  createSizes(sizeContainer, targetProduct.sizes);

  additivesContainer.innerHTML = "";
  createAdditives(additivesContainer, targetProduct.additives);

  activePrice = Number(targetProduct.price);
  createPrice();
}

function createSizes(sizeContainer, sizes) {
  for (let size in sizes) {
    const newSize = document.createElement("div");
    newSize.className = "modal__choose";
    const sizeBadge = document.createElement("div");
    sizeBadge.className = "modal__badge";
    sizeBadge.textContent = size;
    const sizeSize = document.createElement("div");
    sizeSize.className = "modal__value";
    sizeSize.textContent = sizes[`${size}`].size;
    newSize.dataset.price = sizes[`${size}`]["add-price"];
    newSize.append(sizeBadge, sizeSize);
    if (size === "s") {
      newSize.classList.add("active");
    }
    sizeContainer.append(newSize);
  }
}

function createAdditives(additivesContainer, additives) {
  for (let additive in additives) {
    const newAdditive = document.createElement("div");
    newAdditive.className = "modal__choose";
    const additiveBadge = document.createElement("div");
    additiveBadge.className = "modal__badge";
    additiveBadge.textContent = additive;
    const additiveValue = document.createElement("div");
    additiveValue.className = "modal__value";
    additiveValue.textContent = additives[`${additive}`].name;
    newAdditive.dataset.price = additives[`${additive}`]["add-price"];
    newAdditive.append(additiveBadge, additiveValue);
    if (additive === 0) {
      newAdditive.classList.add("active");
    }
    additivesContainer.append(newAdditive);
  }
}

function createPrice() {
  modalPrice.textContent = `$${activePrice}`;
}

sizeContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".modal__choose");
  if (!target || target.classList.contains("active")) {
    return;
  }
  const children = sizeContainer.querySelectorAll(".modal__choose");
  children.forEach((item) => {
    if (item.classList.contains("active")) {
      activePrice -= Number(item.dataset.price);
    }
    item.classList.remove("active");
  });
  target.classList.add("active");
  console.log(activePrice);
  activePrice += Number(target.dataset.price);
  console.log(activePrice);
  createPrice();
});

additivesContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".modal__choose");
  if (!target) {
    return;
  }
  target.classList.toggle("active");
  const priceModifaer = Number(target.dataset.price);
  if (target.classList.contains("active")) {
    activePrice += priceModifaer;
  } else {
    activePrice -= priceModifaer;
  }
  createPrice();
});

modalCloseButton.onclick = function () {
  closeBackdrop();
};
