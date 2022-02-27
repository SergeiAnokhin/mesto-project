import { openPopup, closePopup, profile, renderSave } from "./utils.js";
import { createCard, elements } from "./card.js";
import { hasInvalidInput, toggleButtonState } from './validate.js';
import { config, addCard, editProfile, editAvatar } from "./api.js";

export const modal = {
    editPopup : document.querySelector('#popup_edit-profile'),
    addPopup : document.querySelector('#popup_add-element'),
    deletePopup : document.querySelector('#popup_delete-element'),
    avatarPopup : document.querySelector('#popup_edit-avatar'),
    imgPopup : document.querySelector('#popup_element-image'),

    popupImage : document.querySelector('.popup__image'),
    popupPlaceName : document.querySelector('.popup__place-name'),

    avatarLinkPopup : document.querySelector('[name="avatar-link"]'),

    profileNamePopup : document.querySelector('[name="profile-name"]'),
    profileInfoPopup : document.querySelector('[name="profile-info"]'),

    imgLink : document.querySelector('[name="image-link"]'),
    placeName : document.querySelector('[name="place-name"]')
}

export function clearErrors(popup) {
    const inputList = Array.from(popup.querySelectorAll('.form__input'));
    const errorList = Array.from(popup.querySelectorAll('.form__input-error'));
    const buttonElement = popup.querySelector('.form__button');

    inputList.forEach(input => {
        if (input.classList.contains('form__input_type_error')) {
            input.classList.remove('form__input_type_error');
        }
    })
    errorList.forEach(input => {
        if (input.classList.contains('form__input-error_active')) {
            input.classList.remove('form__input-error_active');
        }
    })
    hasInvalidInput(inputList);
    toggleButtonState(inputList, buttonElement);
}

// Модальное окно редактирования профиля
export function editProfilePopup() {
    modal.profileNamePopup.value = profile.profileName.textContent;
    modal.profileInfoPopup.value = profile.profileInfo.textContent;
    openPopup(modal.editPopup);
    clearErrors(modal.editPopup);
}

// Модальное окно редактирования аватара
export function editAvatarPopup() {
    modal.avatarLinkPopup.value = '';
    openPopup(modal.avatarPopup);
    clearErrors(modal.avatarPopup);
}

// Модальное окно добавления карточек
export function addElementPopup() {
    modal.imgLink.value = '';
    modal.placeName.value = '';
    openPopup(modal.addPopup);
    clearErrors(modal.addPopup);
}

// Функция-обработчик закрытия попапа при клике по оверлею
export function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.currentTarget);
    }
}

// Функция-обработчик закрытия попапа при клике по кнопке крестик
export function closePopupBtn(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

// Функция-обработчик закрытия попапа при нажатии клавиши Escape
export function closePopupEscape(evt) {
    if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
        closePopup(document.querySelector('.popup_opened'));
    }
}

  // Функция добавления обработчиков событий закрытия модального окна
export function closePopupEvents(popup) {
    popup.addEventListener('click', closePopupOverlay);
    popup.addEventListener('click', closePopupBtn);
    document.addEventListener('keydown', closePopupEscape)
}

 // Функция снятия обработчиков событий закрытия модального окна
export function closePopupEventsRemove(popup) {
    popup.removeEventListener('click', closePopupOverlay);
    popup.removeEventListener('click', closePopupBtn);
    document.removeEventListener('keydown', closePopupEscape)
}

// Функция отправки данных из формы
export function submitForm(popup, func) {
    popup.querySelector('.form').addEventListener('submit', func); 
}

  // Добавление данных из формы редактирования профиля
export function editProfileSubmit(evt) {
    evt.preventDefault();
    if (modal.profileNamePopup.value !== '' && modal.profileInfoPopup.value !== '') {
        profile.profileName.textContent = modal.profileNamePopup.value;
        profile.profileInfo.textContent = modal.profileInfoPopup.value;
        editProfile(modal.editPopup, modal.profileNamePopup.value, modal.profileInfoPopup.value)
        closePopup(modal.editPopup);
    };
}

  // Добавление данных из формы редактирования аватара
export function editAvatarSubmit(evt) {
    evt.preventDefault();
    profile.avatarImg.src = modal.avatarLinkPopup.value;
    editAvatar(modal.avatarPopup, modal.avatarLinkPopup.value);
    closePopup(modal.avatarPopup);
}

  // Добавление данных из формы добавления карточек
export function addElementSubmit(evt) {
    evt.preventDefault();
    if (modal.imgLink.value !== '' && modal.placeName.value !== '') {
        addCard(modal.addPopup, modal.placeName.value, modal.imgLink.value);
        closePopup(modal.addPopup);
    };
}