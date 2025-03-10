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
  const likeButtonContainer = cardElement.querySelector(".card__like");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-counter");
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardElement.dataset.id = cardId;

  cardImage.addEventListener("click", openModalImage);
  likeButton.addEventListener("click", toggleLike);
  if (userId === ownerId) {
    deleteButton.addEventListener("click", openModalDeleteCard);
  } else if (userId || ownerId === undefined) {
    deleteButton.style.display = "none";
  }

  if (likes.length !== 0) {
    likeButtonContainer.setAttribute("style", "display: flex; gap: 3px");
    likesCounter.textContent = likes.length;
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
export function toggleLike(event) {
  const likeCounter = event.target
    .closest(".card__like")
    .querySelector(".card__like-counter");
  console.log(event.target);

  if (event.target.classList.value === "card__like-button") {
    addLike(event.target.closest("[data-id]").dataset.id).then((result) => {
      likeCounter.textContent = result.likes.length;
      if (result.likes.length !== 0) {
        event.target
          .closest(".card__like")
          .setAttribute("style", "display: flex; gap: 3px");
      }
    });
    event.target.classList.add("card__like-button_is-active");
  } else if (
    event.target.classList.value ===
    "card__like-button card__like-button_is-active"
  ) {
    removeLike(event.target.closest("[data-id]").dataset.id).then((result) => {
      likeCounter.textContent = result.likes.length;
      if (result.likes.length == 0) {
        likeCounter.textContent = " ";
      }
    });
    event.target.classList.remove("card__like-button_is-active");
  }
}
