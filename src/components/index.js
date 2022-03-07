import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { modal, openAddElementPopup, openEditAvatarPopup, openEditProfilePopup, submitForm, handleProfileFormSubmit, handleAvatarFormSubmit, handleCardFormSubmit} from "./modal.js";
import { profile, buttons, addProfile, user, renderLoading } from "./utils.js";
import { getProfile, getInitialCards } from './api.js';
import { addElements } from "./card";

const getAll = Promise.all([getProfile(), getInitialCards()]);

// ВЫЗОВЫ ФУНКЦИЙ

// Вызов функции валидации форм
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });

// Получение данных пользователя и карточек при загрузке страницы
getAll
  .then(result => {
    user.id = result[0]._id
    addProfile(result[0])
    addElements(result[1], user.id)
    renderLoading()
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })

// Вызов модального окна редактирования профиля
buttons.editProfileBtn.addEventListener('click', openEditProfilePopup);

// Вызов модального окна добавления карточек
buttons.addElementBtn.addEventListener('click', openAddElementPopup);

// Вызов модального окна редактирования аватара
profile.avatarImg.addEventListener('click', openEditAvatarPopup)

// Отправка данных из формы редактирования профиля
submitForm(modal.editPopup, handleProfileFormSubmit);

// Отправка данных из формы добавления карточек
submitForm(modal.addPopup, handleCardFormSubmit);

// Отправка данных из формы редактирования аватара
submitForm(modal.avatarPopup, handleAvatarFormSubmit)