import { closePopupEvents, closePopupEventsRemove } from "./modal.js";


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  const profile = {
    profileName : document.querySelector('.profile__name'),
    profileInfo : document.querySelector('.profile__info'),
    avatarImg : document.querySelector('.profile__avatar-img')
  }

  const buttons = {
    editProfileBtn : document.querySelector('.profile__edit-button'),
    addElementBtn : document.querySelector('.profile__add-button')
  }


// Открытие модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
    closePopupEvents(popup);
}

  // Закрытие модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    closePopupEventsRemove(popup)
}

export {openPopup, closePopup, initialCards, profile, buttons};