export class ProductCard {
  card;
  constructor(cardInfo) {
    this.#createCard(cardInfo);
  }

  getCard() {
    return this.card;
  }

  #createCard(cardInfo) {
    const card = this.#createContainer("menu__card");

    const cardImageContainer = this.#createContainer("card__image-container");

    const cardImage = this.#createImage(cardInfo);

    const cardInfoContainer = this.#createContainer("card__info");

    const cardTextInfo = this.#createContainer("card__text-info");

    const cardHeading = this.#createHeading3("card__heading", cardInfo.name);

    const cardDescription = this.#createParagraph(cardInfo);

    cardTextInfo.append(cardHeading);
    cardTextInfo.append(cardDescription);

    cardInfoContainer.append(cardTextInfo);

    const cardPriceContainer = this.#createContainer("card__price-info");

    const cardPrice = this.#createHeading3("card__price", `$${cardInfo.price}`);
    cardPriceContainer.append(cardPrice);

    cardInfoContainer.append(cardPriceContainer);

    cardImageContainer.append(cardImage);

    card.append(cardImageContainer);
    card.append(cardInfoContainer);
    this.card = card;
  }

  #createContainer(className) {
    const cardContainer = document.createElement("div");
    cardContainer.className = className;
    return cardContainer;
  }

  #createImage(cardInfo) {
    const image = document.createElement("img");
    image.className = "card__image";
    image.src = cardInfo["image-addres"];
    image.alt = cardInfo.name;
    return image;
  }

  #createHeading3(className, name) {
    const heading = document.createElement("h3");
    heading.className = className;
    heading.innerText = name;
    return heading;
  }

  #createParagraph(cardInfo) {
    const paragraph = document.createElement("p");
    paragraph.className = "card__description";
    paragraph.innerText = cardInfo.description;
    return paragraph;
  }
}
