import { openPopup, closePopup, profile, renderSave, buttonTextSave, buttonTextCreate, user } from "./utils.js";
import { addElement } from "./card.js";
import { hasInvalidInput, toggleButtonState } from './validate.js';
import { addCard, editProfile, editAvatar } from "./api.js";

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

export const clearErrors = (popup) => {
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
export const openEditProfilePopup = () => {
    modal.profileNamePopup.value = profile.profileName.textContent;
    modal.profileInfoPopup.value = profile.profileInfo.textContent;
    openPopup(modal.editPopup);
    clearErrors(modal.editPopup);
}

// Модальное окно редактирования аватара
export const openEditAvatarPopup = () => {
    modal.avatarLinkPopup.value = '';
    openPopup(modal.avatarPopup);
    clearErrors(modal.avatarPopup);
}

// Модальное окно добавления карточек
export const openAddElementPopup = () => {
    modal.imgLink.value = '';
    modal.placeName.value = '';
    openPopup(modal.addPopup);
    clearErrors(modal.addPopup);
}

// Функция-обработчик закрытия попапа при клике по оверлею
export const closePopupOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.currentTarget);
    }
}

// Функция-обработчик закрытия попапа при клике по кнопке крестик
export const closePopupBtn = (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

// Функция-обработчик закрытия попапа при нажатии клавиши Escape
export const closePopupEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        openedPopup && closePopup(openedPopup);
    }
}

  // Функция добавления обработчиков событий закрытия модального окна
export const setCloseListeners = (popup) => {
    popup.addEventListener('click', closePopupOverlay);
    popup.addEventListener('click', closePopupBtn);
    document.addEventListener('keydown', closePopupEscape)
}

 // Функция снятия обработчиков событий закрытия модального окна
export const removeCloseListeners = (popup) => {
    popup.removeEventListener('click', closePopupOverlay);
    popup.removeEventListener('click', closePopupBtn);
    document.removeEventListener('keydown', closePopupEscape)
}

// Функция отправки данных из формы
export const submitForm = (popup, func) => {
    popup.querySelector('.form').addEventListener('submit', func); 
}

  // Добавление данных из формы редактирования профиля
export const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    if (modal.profileNamePopup.value !== '' && modal.profileInfoPopup.value !== '') {
        renderSave(modal.editPopup, buttonTextSave, true)
        editProfile(modal.profileNamePopup.value, modal.profileInfoPopup.value)
        .then((result) => {
            profile.profileName.textContent = result.name;
            profile.profileInfo.textContent = result.about;
            closePopup(modal.editPopup)
          })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => 
            renderSave(modal.editPopup, buttonTextSave, false)
        )
    };
}

  // Добавление данных из формы редактирования аватара
export const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();
    renderSave(modal.avatarPopup, buttonTextSave, true)
    editAvatar(modal.avatarLinkPopup.value)
    .then((result) => {
        profile.avatarImg.src = result.avatar;
        closePopup(modal.avatarPopup)
      })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => 
        renderSave(modal.avatarPopup, buttonTextSave, false)
    )
}

  // Добавление данных из формы добавления карточек
export const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    renderSave(modal.addPopup, buttonTextCreate, true)
    if (modal.imgLink.value !== '' && modal.placeName.value !== '') {
        addCard(modal.placeName.value, modal.imgLink.value)
        .then((result) => {
            addElement(result, user.id)
            closePopup(modal.addPopup)
          })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => 
        renderSave(modal.addPopup, buttonTextCreate, false)
        )
    };
}