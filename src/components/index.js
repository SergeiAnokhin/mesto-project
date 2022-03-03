import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { modal, addElementPopup, editAvatarPopup, editProfilePopup, submitForm, editProfileSubmit, editAvatarSubmit, addElementSubmit} from "./modal.js";
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

getAll
  .then(result => {
    user.id = result[0]._id
    addProfile(result[0])
    addElements(result[1], user.id)
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => renderLoading());

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