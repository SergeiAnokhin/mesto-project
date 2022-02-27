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


// Открытие модального окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    closePopupEvents(popup);
}

  // Закрытие модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    closePopupEventsRemove(popup)
}

export function addProfile(profileInfo) {
  profile.avatarImg.src = profileInfo.avatar;
  profile.profileName.textContent = profileInfo.name;
  profile.profileInfo.textContent = profileInfo.about;
}