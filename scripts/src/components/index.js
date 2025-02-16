import { initialCards, createCard, deleteCard } from './cards.js'
import {openModal, closeModal, closePopupOnBackground} from './modal.js'

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__content_content_image');
const popupCardImage = popupImage.querySelector('.popup__image');

const popupCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const closePopupButton = popupCard.querySelector('.popup__close');
const savePopupCardButton = popupCard.querySelector('.popup__button');
const modalForm = popupCard.querySelector('.popup__form');
const placeName = popupCard.querySelector('.popup__input_type_card-name');
const link = popupCard.querySelector('.popup__input_type_url');

const popupProfileAddButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');


// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData)
    cardList.append(cardElement)
})

// @todo: Обработчики событий для открытия/закрытия попапов
profileAddButton.addEventListener("click", function() {
    openModal(popupCard)
})

closePopupButton.addEventListener("click", function() {
    closeModal(popupCard)
})

popupCard.addEventListener("click", closePopupOnBackground)

document.addEventListener("keydown", function(event) {
    if(event.code == 'Escape') {
        closeModal(popupCard)
    }
})

popupProfileAddButton.addEventListener("click", function() {
    openModal(popupProfile)
})

popupProfileCloseButton.addEventListener("click", function() {
    closeModal(popupProfile)
})

popupProfile.addEventListener("click", closePopupOnBackground)

document.addEventListener("keydown", function(event) {
    if(event.code == 'Escape') {
        closeModal(popupProfile)
    }
})



