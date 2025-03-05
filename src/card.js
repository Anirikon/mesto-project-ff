// @todo: Функция создания карточки
export function createCard(
  cardData,
  userId,
  cardOwnerId,
  like,
  openModalImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", openModalImage);

  
  if (userId === cardOwnerId) {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  } else {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);

  
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
  cardElement = null;
}

// @todo: Функция обработчика лайка
export function like({ target }) {
  target.classList.toggle("card__like-button_is-active");
}
