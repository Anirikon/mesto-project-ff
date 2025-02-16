// @todo: Функция открытия модального окна
export function openModal(elem) {
    elem.classList.add('popup_is-opened');
}

// @todo: Функция закрытия модального окна
export function closeModal(elem, form) {
    elem.classList.remove('popup_is-opened')
    // form.reset();
}

export function closePopupOnBackground( {currentTarget, target} ) {
    const popup = currentTarget
    const isClickedOnBackground = target === popup
    if (isClickedOnBackground) {
        popup.classList.remove('popup_is-opened')
    }
    // event.target.closest(".popup_is-opened").remove();
  };

