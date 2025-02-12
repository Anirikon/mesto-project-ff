// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__content_content_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const addCardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const savePopupCardButton = popupCard.querySelector('.popup__button');
const popupForm = popupCard.querySelector('.popup__form');
const placeName = popupCard.querySelector('.popup__input_type_card-name');
const link = popupCard.querySelector('.popup__input_type_url');

// @todo: Функция создания карточки
function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
        cardImage.src = cardData.link;
        cardTitle.textContent = cardData.name;
        const deleteButton = cardElement.querySelector('.card__delete-button');
            deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (event) { 
    event.target.closest(".card").remove(); 
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardList.append(cardElement);
});
