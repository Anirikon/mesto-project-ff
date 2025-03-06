// @todo: Функция создания карточки
export function createCard(
  cardData,
  userId,
  ownerId,
  likes,
  toggleLike,
  openModalImage,
  openModalDeleteCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-counter");
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", openModalImage);
  likeButton.addEventListener("click", toggleLike);
  // console.log(userId)
  if (userId === ownerId) {
    deleteButton.addEventListener("click", openModalDeleteCard);
  } else if (userId || ownerId === undefined) {
    deleteButton.style.display = "none";
  }

  if (likes.length !== 0) {
    likesCounter.style.display = "flex";
    likesCounter.textContent = likes.length;
  }

  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCardFromList(cardElement) {
  cardElement.remove();
  cardElement = null;
}

// @todo: Функция обработчика лайка
export function toggleLike({ target }) {
  target.classList.toggle("card__like-button_is-active");
}
