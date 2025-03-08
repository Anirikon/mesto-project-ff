// Импорт/экспорт
import "./pages/index.css";
import { openModal, closeModal, closePopupOnBackground } from "./modal.js";
import { createCard, toggleLike, removeCardFromList } from "./card.js";
import {
  enableValidation,
  clearValidation,
  setEventListeners,
} from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  saveProfile,
  addNewCard,
  deleteCard,
} from "./api.js";

// DOM узлы
const popups = document.querySelectorAll(".popup");

const popupCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const newPlaceFormElement = popupCard.querySelector(".popup__form");
const placeName = popupCard.querySelector(".popup__input_type_card-name");
const link = popupCard.querySelector(".popup__input_type_url");

const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");

const cardList = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = popupProfile.querySelector(".popup__form");
const nameProfileInput = popupProfile.querySelector(".popup__input_type_name");
const jobProfileInput = popupProfile.querySelector(
  ".popup__input_type_description"
);

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

const deleteCardModal = document.querySelector(".popup_type_delete-card");
const deleteCardForm = deleteCardModal.querySelector(".popup__form");

//конфиг валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функции
function openModalImage({ target }) {
  openModal(popupTypeImage);
  popupImage.src = target.src;
  popupImageCaption.textContent = target.alt;
}

function openModalDeleteCard(event) {
  event.target.parentElement.dataset.state = "deleted"
  openModal(deleteCardModal);
}

function resetForm(form) {
  form.reset();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  saveProfile(nameProfileInput.value, jobProfileInput.value).then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
  });
  closeModal(popupProfile);
}

// Добавляет новую карточку, но удалить ее нельзя, т.к. нет слушателя на удаление карточки
function handleNewPlaceFormSubmit(event) {
  event.preventDefault();
  const cardData = { name: placeName.value, link: link.value };
  Promise.all([getUserInfo(), addNewCard(placeName.value, link.value)]).then(
    ([response1, response2]) => {
      const cardElement = createCard(
        cardData,
        response1._id,
        response2._id,
        response2.owner._id,
        response2.likes,
        toggleLike,
        openModalImage,
        openModalDeleteCard
      );
      cardList.prepend(cardElement);
    }
  );
  closeModal(popupCard);
  resetForm(newPlaceFormElement);
}

function handleDeleteCardFormSubmit(event) {
  event.preventDefault();
  const cards = cardList.querySelectorAll(".places__item");
  Promise.all([getUserInfo(), getInitialCards()]).then(
    ([response1, response2]) => {
      response2.forEach((cardData, index) => {
        if (!!((response1._id === cardData.owner._id) & (cards[index].dataset.id === cardData._id) & (cards[index].dataset.state === 'deleted'))) {
          console.log(cards[index].dataset.state)
          deleteCard(cardData._id);
          removeCardFromList(cards[index]);
          closeModal(deleteCardModal);
        }
      });
    }
  );
}

function openProfileModal() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
  openModal(popupProfile);
  clearValidation(profileFormElement, validationConfig);
}

// Обработчики событий
profileAddButton.addEventListener("click", function () {
  resetForm(newPlaceFormElement);
  openModal(popupCard);
  clearValidation(newPlaceFormElement, validationConfig);
  setEventListeners(newPlaceFormElement);
});

popupProfileEditButton.addEventListener("click", openProfileModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPlaceFormElement.addEventListener("submit", handleNewPlaceFormSubmit);

deleteCardForm.addEventListener("submit", handleDeleteCardFormSubmit);

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOnBackground);
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

enableValidation(validationConfig);

// Вывод карточек на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([response1, response2]) => {
    console.log(response1, response2);
    profileTitle.textContent = response1.name;
    profileDescription.textContent = response1.about;

    response2.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        response1._id,
        cardData._id,
        cardData.owner._id,
        cardData.likes,
        toggleLike,
        openModalImage,
        openModalDeleteCard
      );
      cardList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
