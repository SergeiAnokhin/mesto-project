import { closePopupEvents, closePopupEventsRemove } from "./modal.js";

export const profile = {
    profileName : document.querySelector('.profile__name'),
    profileInfo : document.querySelector('.profile__info'),
    avatarImg : document.querySelector('.profile__avatar-img')
}

export const buttons = {
    editProfileBtn : document.querySelector('.profile__edit-button'),
    addElementBtn : document.querySelector('.profile__add-button')
}

export const buttonTextSave = {
  do : 'Сохранить',
  doing : 'Сохранение...'
}

export const buttonTextCreate = {
  do : 'Cоздать',
  doing : 'Создание...'
}

export const user = {};


// Открытие модального окна
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    closePopupEvents(popup);
}

  // Закрытие модального окна
export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    closePopupEventsRemove(popup)
}

export const addProfile = (profileInfo) => {
  profile.avatarImg.src = profileInfo.avatar;
  profile.profileName.textContent = profileInfo.name;
  profile.profileInfo.textContent = profileInfo.about;
}

export const renderLoading = () => {
  const page = document.querySelector('.page');
  page.classList.add('page_visible');
}

export const renderSave = (popup, buttonText, isSave) => {
    const button = popup.querySelector('.form__button');
    if (isSave) {
      button.textContent = buttonText.doing
    } else {
      button.textContent = buttonText.do
    }
}