export const cardListSection = '.elements';

export const selectors = {
    name: '.profile__name',
    info: '.profile__info',
    avatar: '.profile__avatar-img'
}

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector(selectors.avatar);

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
    spanSelector: '.form__input-error'
}

export const buttonTextSave = {
    do : 'Сохранить',
    doing : 'Сохранение...'
  }
  
export const buttonTextCreate = {
    do : 'Cоздать',
    doing : 'Создание...'
}

