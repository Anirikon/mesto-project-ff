// @todo: Функция открытия модального окна
export function openModal(elem) {
    document.addEventListener('keydown', closePopupByEsc)
    elem.classList.add('popup_is-opened')
}

// @todo: Функция закрытия модального окна
export function closeModal(elem) {
    if(elem) {
        elem.classList.remove('popup_is-opened')
        document.removeEventListener('keydown', closePopupByEsc)
    }
}
// Функция закрытия модального окна по оверлею
export function closePopupOnBackground( {currentTarget, target} ) {
    const popup = currentTarget
    const isClickedOnBackground = target === popup
        if (isClickedOnBackground) {
            popup.classList.remove('popup_is-opened')
        }
}

export function closePopupByEsc(event) {
    if(event.key === 'Escape') {
       closeModal(document.querySelector('.popup_is-opened'));
    }
}