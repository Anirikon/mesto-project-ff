const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки
function createCard(cardData, like, openModalImage) {
  console.log(cardData)
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
      cardImage.src = cardData.link;
      cardTitle.textContent = cardData.name;
      cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', deleteCard);

  const likeButton = cardElement.querySelector('.card__like-button');
      likeButton.addEventListener("click", like)
      
      cardImage.addEventListener("click", openModalImage)
      cardImage.addEventListener('mouseover', function() {
        popupTypeImage.classList.add('popup_is-animated')
    })
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) { 
  event.target.closest(".card").remove(); 
};

// @todo: Функция обработчика лайка
function like( {target} ) {
  target.classList.toggle('card__like-button_is-active');
}

// Функция открытия модального окна картинки
function openModalImage( {target, currentTarget} ) {
    openModal(popupTypeImage)
    console.log(target)
    popupImage.src = target.src;
    popupImageCaption.textContent = target.alt;
}

// @todo: Экспорт функций
export { initialCards, createCard, deleteCard, like, openModalImage }
import { cardTemplate, popupTypeImage, popupImage, popupImageCaption } from "./index.js"; 
import { openModal } from "./modal.js";