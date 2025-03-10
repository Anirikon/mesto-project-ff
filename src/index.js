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
  openModal(popupTypeImage);
  popupImage.src = target.src;
  popupImageCaption.textContent = target.alt;
}

function openProfileModal() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
  openModal(popupProfile);
  clearValidation(profileFormElement, validationConfig);
}

function openAvatarModal() {
  openModal(popupEditAvatar);
}

function openModalDeleteCard(event) {
  event.target.parentElement.dataset.state = "deleted";
  openModal(deleteCardModal);
}

function resetForm(form) {
  form.reset();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  saveProfile(nameProfileInput.value, jobProfileInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupProfile);
    });
}

function handleNewPlaceFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  const cardData = { name: placeName.value, link: link.value };
  Promise.all([getUserInfo(), addNewCard(placeName.value, link.value)])
    .then(([response1, response2]) => {
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupCard);
      resetForm(newPlaceFormElement);
    });
}

function handleDeleteCardFormSubmit(event) {
  event.preventDefault();
  renderLoading(true);
  const cards = cardList.querySelectorAll(".places__item");
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([response1, response2]) => {
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
          closeModal(deleteCardModal);
          break;
        } else {
          index++;
        }
      }
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupEditAvatar);
      resetForm(editAvatarForm);
    });
}

function renderLoading(isLoading) {
  const animatedElement = document.querySelector("[data-loader]");
  const ellipsis = document.createElement("span");
  ellipsis.className = "loading-indicator";
  ellipsis.textContent = "...";
  if (isLoading & (animatedElement.textContent === "Сохранить")) {
    animatedElement.textContent = "Сохранение";
    animatedElement.append(ellipsis);
    ellipsis.classList.add("popup__button-loading");
  } else if (isLoading & (animatedElement.textContent === "Да")) {
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
    animatedElement.classList.add("popup__button_disabled");
    animatedElement.disabled = true;
    ellipsis.remove();
  } else if (
    (isLoading === false) &
    (animatedElement.textContent === "Удаление...")
  ) {
    ellipsis.classList.remove("popup__button-loading");
    animatedElement.textContent = "Да";
    delete animatedElement.dataset.loader;
    animatedElement.classList.add("popup__button_disabled");
    animatedElement.disabled = true;
    ellipsis.remove();
  }
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
  .then(([response1, response2]) => {
    profileImage.style.backgroundImage = `url(${response1.avatar})`;
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
