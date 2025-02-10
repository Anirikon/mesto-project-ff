// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const addCardButton = document.querySelector('body > div > main > section.profile.page__section > button');
const popupCard = document.querySelector('body > div > div.popup.popup_type_new-card');
const popupImage = document.querySelector('body > div > div.popup.popup_type_image > div.popup__content_content_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const popupForm = popupCard.querySelector('.popup__form');
const savePopupCardButton = popupCard.querySelector('.popup__button');
const cardList = document.querySelector('ul.places__list');
const placeName = popupCard.querySelector('.popup__input_type_card-name');
const link = popupCard.querySelector('.popup__input_type_url');

// @todo: Функция создания карточки
function placeCards(obj) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
        cardImage.src = obj.link;
        cardTitle.textContent = obj.name;
        cardList.append(cardElement);
    let deleteButton = cardList.querySelectorAll('.card__delete-button');
    deleteButton.forEach((elem) => {
        elem.addEventListener('click', deleteCard);
    });  
}

function openPopup() {
    popupCard.classList.add('popup_is-opened');
    const popupCloseButton = document.querySelector('body > div > div.popup.popup_type_new-card.popup_is-opened > div > button');
    popupCloseButton.addEventListener('click', closePopup);
}

function closePopup() {
    popupForm.reset();
    popupCard.classList.remove('popup_is-opened');
}

// @todo: Функция удаления карточки
function deleteCard() {
    let card = this.parentElement;
    card.remove();
}

// @todo: Вывести карточки на страницу
let newInitialCards = initialCards;

function renderCardsFromArray() {
    newInitialCards.forEach((element, index, arr) => {
        placeCards(arr[index]);
    });
}

function renderNewCard() {
    let cardsArrayLength = newInitialCards.length - 1;
    placeCards(newInitialCards[cardsArrayLength]);
}

addCardButton.addEventListener('click', openPopup);

savePopupCardButton.addEventListener('click', (resetInputs) => {
    const cardObj = {name: placeName.value, link: link.value,}
    newInitialCards.push(cardObj);
    resetInputs.preventDefault();
    closePopup();
    renderNewCard();
});

renderCardsFromArray();
