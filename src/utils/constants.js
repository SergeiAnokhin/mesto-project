export const cardListSection = '.elements';

export const selectors = {
    name: '.profile__name',
    info: '.profile__info',
    avatar: '.profile__avatar-img'
}

export const page = document.querySelector('.page');
export const loading = document.querySelector('.loading');

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
    do : 'Save',
    doing : 'Saving...'
  }
  
export const buttonTextCreate = {
    do : 'Create',
    doing : 'Creating...'
}

export const buttonTextDelete = {
    do : 'Yes',
    doing : 'Deleting...'
}

export const inputProfileName = document.querySelector('#profile-name');
export const inputProfileInfo = document.querySelector('#profile-info');

export const editProfileForm = document.querySelector('[name="edit-profile"]');
export const adddCardForm = document.querySelector('[name="add-element"]');
export const editAvatarForm = document.querySelector('[name="edit-avatar"]');