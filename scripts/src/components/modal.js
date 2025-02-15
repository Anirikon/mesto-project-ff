// @todo: Функция открытия модального окна
export function openModal(elem) {
    elem.classList.add('popup_is-opened');
    console.log(elem)
}

// @todo: Функция закрытия модального окна
export function closeModal(elem, form) {
    elem.classList.remove('popup_is-opened')
    form.resetform();
}

