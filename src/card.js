import { addLike, removeLike } from "./api.js";
// @todo: Функция создания карточки
export function createCard(
  cardData,
  userId,
  cardId,
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
  const likeCounter = cardElement.querySelector(".card__like-counter");
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardElement.dataset.id = cardId;

  cardImage.addEventListener("click", openModalImage);
  likeButton.addEventListener("click", function () {
    toggleLike(likeButton, likeCounter);
  });
  if (userId === ownerId) {
    deleteButton.addEventListener("click", openModalDeleteCard);
  } else if (userId || ownerId === undefined) {
    deleteButton.remove();
  }

  if (likes.length !== 0) {
    likeCounter.textContent = likes.length;
  }

  likes.forEach((element) => {
    if (element._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCardFromList(cardElement) {
  cardElement.remove();
  cardElement = null;
}

// @todo: Функция обработчика лайка
export function toggleLike(likeButton, likeCounter) {
  if (likeButton.classList.value === "card__like-button") {
    addLike(likeButton.closest("[data-id]").dataset.id)
      .then((result) => {
        likeCounter.textContent = result.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (
    likeButton.classList.value ===
    "card__like-button card__like-button_is-active"
  ) {
    removeLike(likeButton.closest("[data-id]").dataset.id)
      .then((result) => {
        likeCounter.textContent = result.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
        if (result.likes.length == 0) {
          likeCounter.textContent = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
