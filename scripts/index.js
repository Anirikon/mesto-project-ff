const log = console.log;

// import {initialCards} from './card.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;




// @todo: DOM узлы

const cardButton = document.querySelector("body > div > main > section.profile.page__section > button");
const popupCard = document.querySelector("body > div > div.popup.popup_type_new-card");
const cardList = document.querySelector('section > ul.places__list');
// @todo: Функция создания карточки

function closePopup () {
    document.querySelector("body > div > div.popup.popup_type_new-card.popup_is-opened > div > button");
    popupCard.classList.remove('popup_is-opened');
}

function popupCardCreate () {
    popupCard.classList.add('popup_is-opened');
    const popupCloseButton = document.querySelector("body > div > div.popup.popup_type_new-card.popup_is-opened > div > button");
    popupCloseButton.addEventListener("click", closePopup);
    const savePopupCardButton = popupCard.querySelector('.popup__button');
    log(savePopupCardButton);
    savePopupCardButton.addEventListener("click", placeCards);
}

cardButton.addEventListener("click", popupCardCreate);

// @todo: Функция удаления карточки
// function deleteCard () {
//     const deleteButton = document.querySelector('.card__delete-button');
//     deleteButton.addEventListener("click", )
// }
// @todo: Вывести карточки на страницу
function placeCards (array, deleteFn) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    array.map((item, index) => {
        cardImage.src = item.link;
        log(item.name)
        cardTitle.textContent = item.name;
    })
    cardList.append(cardElement);
}

placeCards(initialCards);