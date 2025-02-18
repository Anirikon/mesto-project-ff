import './pages/index.css';
import { initialCards, createCard, like, openModalImage } from './cards.js'
import { openModal, closeModal, closePopupOnBackground } from './modal.js'

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const popupCard = document.querySelector('.popup_type_new-card')
const profileAddButton = document.querySelector('.profile__add-button')
const closePopupButton = popupCard.querySelector('.popup__close')
const newPlaceFormElement = popupCard.querySelector('.popup__form')
const placeName = popupCard.querySelector('.popup__input_type_card-name')
const link = popupCard.querySelector('.popup__input_type_url')

const popupProfileEditButton = document.querySelector('.profile__edit-button')
const popupProfile = document.querySelector('.popup_type_edit')
const popupProfileCloseButton = popupProfile.querySelector('.popup__close')

const cardList = document.querySelector('.places__list')
export const popupTypeImage = document.querySelector('.popup_type_image')
export const popupImage = popupTypeImage.querySelector('.popup__image')
export const popupImageCaption = popupTypeImage.querySelector('.popup__caption')
const popupImageCloseButton = popupTypeImage.querySelector('.popup__close')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileFormElement = popupProfile.querySelector('.popup__form')
const nameProfileInput = popupProfile.querySelector('.popup__input_type_name')
const jobProfileInput = popupProfile.querySelector('.popup__input_type_description');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, like, openModalImage)
        cardList.append(cardElement)
})

// @todo: Обработчики событий для открытия/закрытия попапов
profileAddButton.addEventListener('click', function() {
    openModal(popupCard)
})

profileAddButton.addEventListener('mouseover', function() {
    popupCard.classList.add('popup_is-animated')
})

closePopupButton.addEventListener('click', function() {
    closeModal(popupCard)
})

popupCard.addEventListener('click', closePopupOnBackground)

document.addEventListener('keydown', function(event) {
    if(event.code == 'Escape') {
        closeModal(popupCard)
    }
})

popupProfileEditButton.addEventListener('click', function() {
    openModal(popupProfile)
})

popupProfileEditButton.addEventListener('mouseover', function() {
    popupProfile.classList.add('popup_is-animated')
})

popupProfileCloseButton.addEventListener('click', function() {
    closeModal(popupProfile)
})

popupProfile.addEventListener('click', closePopupOnBackground)

document.addEventListener("keydown", function(event) {
    if(event.code == 'Escape') {
        closeModal(popupProfile)
    }
})

popupImageCloseButton.addEventListener('click', function() {
    closeModal(popupTypeImage)
})

popupTypeImage.addEventListener('click', closePopupOnBackground)

document.addEventListener('keydown', function(event) {
    if(event.code == 'Escape') {
        closeModal(popupTypeImage)
    }
})

function resetForm(form) {
    form.reset()
}

function handleProfileFormSubmit(event) {
    event.preventDefault()
        const nameInputValue = nameProfileInput.value
        const jobInputValue = jobProfileInput.value
            profileTitle.textContent = nameInputValue
            profileDescription.textContent = jobInputValue
                closeModal(popupProfile)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

function handleNewPlaceFormSubmit(event) {
    event.preventDefault()
        const cardData = {name: placeName.value, link: link.value,} 
        initialCards.unshift(cardData)
            const cardElement = createCard(cardData, like, openModalImage)
            cardList.prepend(cardElement)
                closeModal(popupCard)
                resetForm(newPlaceFormElement)
}

newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit)