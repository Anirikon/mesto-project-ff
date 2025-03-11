// Импорт/экспорт
import "./pages/index.css";
import { openModal, closeModal, closePopupOnBackground } from "./modal.js";
import { createCard, toggleLike, removeCardFromList } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  saveProfile,
  addNewCard,
  deleteCard,
  updateAvatar,
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

const profileImage = document.querySelector(".profile__image");
const profileEditImage = document.querySelector(".profile__image__edit");
const popupEditAvatar = document.querySelector(".edit-profile-avatar");
const editAvatarForm = popupEditAvatar.querySelector(".popup__form");
const avatarFormInput = popupEditAvatar.querySelector(
  ".popup__input_type_avatar"
);

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
  popupImage.src = target.src;
  popupImageCaption.textContent = target.alt;
  openModal(popupTypeImage);
}

function openProfileModal() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
  popupProfile.querySelector(".popup__button").dataset.loader =
    "ready-to-download";
  popupProfile
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  clearValidation(profileFormElement, validationConfig);
  openModal(popupProfile);
}

function openNewPlaceModal() {
  resetForm(newPlaceFormElement);
  clearValidation(newPlaceFormElement, validationConfig);
  popupCard.querySelector(".popup__button").dataset.loader =
    "ready-to-download";
  openModal(popupCard);
}

function openAvatarModal() {
  resetForm(editAvatarForm);
  clearValidation(editAvatarForm, validationConfig);
  popupEditAvatar
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  popupEditAvatar.querySelector(".popup__button").disable = true;
  popupEditAvatar.querySelector(".popup__button").dataset.loader =
    "ready-to-download";
  openModal(popupEditAvatar);
}

function openModalDeleteCard(event) {
  const deletedStateElements = document.querySelectorAll("[data-state]");
  deletedStateElements.forEach((element) => {
    delete element.dataset.state;
  });
  event.target.parentElement.dataset.state = "deleted";
  deleteCardModal.querySelector(".popup__button").dataset.loader =
    "ready-to-download";
  openModal(deleteCardModal);
}

function resetForm(form) {
  form.reset();
}

function getCardIdForDelete(response1, response2) {
  const cards = cardList.querySelectorAll(".places__item");
  let index = 0;
  for (const cardData of response2) {
    if (
      !!(
        (response1._id === cardData.owner._id) &
        (cards[index].dataset.id === cardData._id) &
        (cards[index].dataset.state === "deleted")
      )
    ) {
      deleteCard(cardData._id);
      removeCardFromList(cards[index]);
      break;
    } else {
      index++;
    }
  }
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  saveProfile(nameProfileInput.value, jobProfileInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function handleNewPlaceFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  const cardData = { name: placeName.value, link: link.value };
  addNewCard(placeName.value, link.value)
    .then((newCardData) => {
      const cardElement = createCard(
        cardData,
        newCardData.owner._id,
        newCardData._id,
        newCardData.owner._id,
        newCardData.likes,
        toggleLike,
        openModalImage,
        openModalDeleteCard
      );
      cardList.prepend(cardElement);
      closeModal(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function handleDeleteCardFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
      getCardIdForDelete(userInfo, initialCards);
      closeModal(deleteCardModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function handleEditAvatarFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  updateAvatar(avatarFormInput.value)
    .then((response) => {
      profileImage.style.backgroundImage = `url(${response.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function renderLoading(isLoading) {
  const animatedElement = document.querySelector("[data-loader]");
  const ellipsis = document.createElement("span");
  ellipsis.className = "loading-indicator";
  ellipsis.textContent = "...";
  if (isLoading & (animatedElement.textContent === "Сохранить")) {
    animatedElement.disabled = true;
    animatedElement.classList.add("popup__button_disabled");
    animatedElement.textContent = "Сохранение";
    animatedElement.append(ellipsis);
    ellipsis.classList.add("popup__button-loading");
  } else if (isLoading & (animatedElement.textContent === "Да")) {
    animatedElement.disabled = true;
    animatedElement.classList.add("popup__button_disabled");
    animatedElement.textContent = "Удаление";
    animatedElement.append(ellipsis);
    ellipsis.classList.add("popup__button-loading");
  } else if (
    (isLoading === false) &
    (animatedElement.textContent === "Сохранение...")
  ) {
    ellipsis.classList.remove("popup__button-loading");
    animatedElement.textContent = "Сохранить";
    delete animatedElement.dataset.loader;
    ellipsis.remove();
    animatedElement.disabled = false;
    animatedElement.classList.remove("popup__button_disabled");
  } else if (
    (isLoading === false) &
    (animatedElement.textContent === "Удаление...")
  ) {
    ellipsis.classList.remove("popup__button-loading");
    animatedElement.textContent = "Да";
    delete animatedElement.dataset.loader;
    ellipsis.remove();
    animatedElement.disabled = false;
    animatedElement.classList.remove("popup__button_disabled");
  }
}

// Обработчики событий
profileAddButton.addEventListener("click", openNewPlaceModal);

popupProfileEditButton.addEventListener("click", openProfileModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPlaceFormElement.addEventListener("submit", handleNewPlaceFormSubmit);

deleteCardForm.addEventListener("submit", handleDeleteCardFormSubmit);

editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

profileEditImage.addEventListener("click", openAvatarModal);

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("mousedown", closePopupOnBackground);
  popup.classList.add("popup_is-animated");
});

enableValidation(validationConfig);

// Инициализация загрузки данных с сервера на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    initialCards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        userInfo._id,
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
