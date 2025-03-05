// Импорт/экспорт
import "./pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closePopupOnBackground } from "./modal.js";
import { createCard, like } from "./card.js";
import {
  enableValidation,
  clearValidation,
  setEventListeners,
} from "./validation.js";
import { userInfo, getInitialCards } from "./api.js";

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

function resetForm(form) {
  form.reset();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameProfileInput.value;
  profileDescription.textContent = jobProfileInput.value;
  closeModal(popupProfile);
}

function handleNewPlaceFormSubmit(event) {
  event.preventDefault();
  const cardData = { name: placeName.value, link: link.value };
  initialCards.unshift(cardData);
  const cardElement = createCard(cardData, like, openModalImage);
  cardList.prepend(cardElement);
  closeModal(popupCard);
  resetForm(newPlaceFormElement);
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
Promise.all([userInfo(), getInitialCards()])
.then(([response1, response2]) => {
  // console.log(response1)
  // console.log(response2)

  response2.forEach((cardData) => {
    console.log(cardData.owner._id);
    const cardElement = createCard(cardData, response1._id, cardData.owner._id, like,  openModalImage);
    cardList.append(cardElement);
  });
})
.catch((err) => {
  console.log(err);
});
