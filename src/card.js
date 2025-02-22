// @todo: Функция создания карточки
export function createCard(cardData, like, openModalImage) {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
        cardImage.src = cardData.link;
        cardTitle.textContent = cardData.name;
        cardImage.alt = cardData.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button')
        deleteButton.addEventListener('click', deleteCard)
  
    const likeButton = cardElement.querySelector('.card__like-button')
        likeButton.addEventListener('click', like)
        
        cardImage.addEventListener('click', openModalImage)
    return cardElement;
}
  
// @todo: Функция удаления карточки
function deleteCard(event, openModalImage) {
    const card = event.target.closest(".card")
    const likeButton = card.querySelector('.card__like-button')
    const cardImage = card.querySelector('.card__image')
        likeButton.removeEventListener('click', like)
        cardImage.removeEventListener('click', openModalImage)
        event.target.removeEventListener('click', deleteCard)
            card.remove();
}
  
// @todo: Функция обработчика лайка
export function like( {target} ) {
    target.classList.toggle('card__like-button_is-active');
}