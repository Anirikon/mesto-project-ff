const log = console.log;

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const addCardButton = document.querySelector("body > div > main > section.profile.page__section > button");
const popupCard = document.querySelector("body > div > div.popup.popup_type_new-card");
const cardList = document.querySelector('section > ul.places__list');
const placeName = popupCard.querySelector('.popup__input_type_card-name');
const link = popupCard.querySelector('.popup__input_type_url');


// @todo: Функция создания карточки
function closePopup() {
    popupCard.classList.remove('popup_is-opened');
}

function popupCardCreate() {
    popupCard.classList.add('popup_is-opened');
    const popupCloseButton = document.querySelector("body > div > div.popup.popup_type_new-card.popup_is-opened > div > button");
    popupCloseButton.addEventListener("click", closePopup);
    const savePopupCardButton = popupCard.querySelector('.popup__button');
    savePopupCardButton.addEventListener("click", placeCards);
    const popupCardButton = popupCard.querySelector('.popup__button');
    // popupCardButton.addEventListener('click', pushToInitialCards)
}

addCardButton.addEventListener("click", popupCardCreate);

// @todo: Функция удаления карточки
function deleteCard() {
    let card = this.parentElement;
    card.remove();
}

// @todo: Вывести карточки на страницу
// function pushToInitialCards() {
//     const valueOfPlaceName = placeName.textContent;
//     const valueOfLink = link.textContent;
//     initialCards.push({name: valueOfPlaceName, link: valueOfLink})
// }

function placeCards(obj) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
        cardImage.src = obj.link;
        cardTitle.textContent = obj.name;
        cardList.append(cardElement);
    let deleteButton = cardList.querySelectorAll('.card__delete-button');
    deleteButton.forEach((elem) => {
        elem.addEventListener("click", deleteCard);
    });
}

initialCards.forEach((element, index, arr) => {
    placeCards(arr[index]);
});

