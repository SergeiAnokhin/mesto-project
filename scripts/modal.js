import { openPopup, closePopup } from "./utils.js";
import { createCard, elements } from "./card.js";
import { profile } from "./utils.js";

const modal = {
    editPopup : document.querySelector('#popup_edit-profile'),
    addPopup : document.querySelector('#popup_add-element'),
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

// Модальное окно редактирования профиля
function editProfilePopup() {
    modal.profileNamePopup.value = profile.profileName.textContent;
    modal.profileInfoPopup.value = profile.profileInfo.textContent;
    openPopup(modal.editPopup);
}

// Модальное окно редактирования аватара
function editAvatarPopup() {
    openPopup(modal.avatarPopup);
}

// Модальное окно добавления карточек
function addElementPopup() {
    modal.imgLink.value = '';
    modal.placeName.value = '';
    openPopup(modal.addPopup);
}

// ===============================

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        evt.currentTarget.classList.remove('popup_opened');
        evt.currentTarget.removeEventListener('click', closePopupOverlay);
    }
}

function closePopupBtn(evt) {
    if (evt.target.classList.contains('popup__close')) {
        evt.currentTarget.classList.remove('popup_opened');
        evt.currentTarget.removeEventListener('click', closePopupBtn);
    }
}

function closePopupEscape(evt) {
    if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
        document.querySelector('.popup_opened').classList.remove('popup_opened')
        document.removeEventListener('keydown', closePopupEscape);
    }
}

// ===============================


  // Функция обработчиков событий закрытия модального окна
function closePopupEvents(popup) {
    popup.addEventListener('click', closePopupOverlay);
    popup.addEventListener('click', closePopupBtn);
    document.addEventListener('keydown', closePopupEscape)
}

// Функция отправки данных из формы
function submitForm(popup, func) {
    popup.querySelector('.form').addEventListener('submit', func); 
}

  // Добавление данных из формы редактирования профиля
function editProfileSubmit(evt) {
    evt.preventDefault();
    if (modal.profileNamePopup.value !== '' && modal.profileInfoPopup.value !== '') {
        profile.profileName.textContent = modal.profileNamePopup.value;
        profile.profileInfo.textContent = modal.profileInfoPopup.value;
        closePopup(modal.editPopup);
    };
}

  // Добавление данных из формы редактирования аватара
function editAvatarSubmit(evt) {
    evt.preventDefault();
    profile.avatarImg.src = modal.avatarLinkPopup.value;
    closePopup(modal.avatarPopup);
}

  // Добавление данных из формы добавления карточек
function addElementSubmit(evt) {
    evt.preventDefault();
    if (modal.imgLink.value !== '' && modal.placeName.value !== '') {
        const cardElement = createCard(modal.placeName.value, modal.imgLink.value);
        elements.prepend(cardElement);
        closePopup(modal.addPopup);
    };
}

export {modal, editAvatarPopup, editProfilePopup, addElementPopup, closePopupEvents, submitForm, editProfileSubmit, editAvatarSubmit, addElementSubmit}