import { initialCards, createCard, deleteCard } from './cards.js'
import {openModal, closeModal} from './modal.js'

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__content_content_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const closePopupButton = popupCard.querySelector('.popup__close');
const savePopupCardButton = popupCard.querySelector('.popup__button');
const modalForm = popupCard.querySelector('.popup__form');
const placeName = popupCard.querySelector('.popup__input_type_card-name');
const link = popupCard.querySelector('.popup__input_type_url');



// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardList.append(cardElement);
});

// @todo: Обработчик события для открытия попапа
profileAddButton.addEventListener("click", function(){
    openModal(popupCard);
})

closePopupButton.addEventListener("click", function(){
    closeModal(popupCard);
})

// @todo: Обработчик события для закрытия попапа


