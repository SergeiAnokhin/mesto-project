import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { modal, addElementPopup, editAvatarPopup, editProfilePopup, submitForm, editProfileSubmit, editAvatarSubmit, addElementSubmit } from "./modal.js";
import { profile, buttons } from "./utils.js";
import { config, getInitialCards, getProfile, addCard } from './api.js';

// ВЫЗОВЫ ФУНКЦИЙ

// Вызов функции валидации форм
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });

// Вызов функции формирования карточек при загрузке страницы
// addElements(initialCards);
getInitialCards(config.baseUrl, config.headers);
getProfile(config.baseUrl, config.headers);

// Вызов модального окна редактирования профиля
buttons.editProfileBtn.addEventListener('click', editProfilePopup);

// Вызов модального окна добавления карточек
buttons.addElementBtn.addEventListener('click', addElementPopup);

// Вызов модального окна редактирования аватара
profile.avatarImg.addEventListener('click', editAvatarPopup)

// Отправка данных из формы редактирования профиля
submitForm(modal.editPopup, editProfileSubmit);

// Отправка данных из формы добавления карточек
submitForm(modal.addPopup, addElementSubmit);

// Отправка данных из формы редактирования аватара
submitForm(modal.avatarPopup, editAvatarSubmit)