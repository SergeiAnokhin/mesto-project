import { setCloseListeners, removeCloseListeners } from "./modal.js";

// Элементы профиля пользователя
export const profile = {
    profileName : document.querySelector('.profile__name'),
    profileInfo : document.querySelector('.profile__info'),
    avatarImg : document.querySelector('.profile__avatar-img')
}

// Кнопки редактирования профил и добавления карточки
export const buttons = {
    editProfileBtn : document.querySelector('.profile__edit-button'),
    addElementBtn : document.querySelector('.profile__add-button')
}

// Тексты кнопки формы при сохранении данных профиля
export const buttonTextSave = {
  do : 'Сохранить',
  doing : 'Сохранение...'
}

// тексты кнопки формы при добавлении карточки
export const buttonTextCreate = {
  do : 'Cоздать',
  doing : 'Создание...'
}

// Тексты кнопки попапа при удалении карточки
export const buttonTextDelete = {
  do : 'Да',
  doing : 'Удаление...'
}

// Объект с данными пользователя (добавление id пользователя после получения с сервера)
export const user = {};


// Открытие модального окна
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    setCloseListeners(popup);
}

  // Закрытие модального окна
export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    removeCloseListeners(popup)
}

export const addProfile = (profileInfo) => {
  profile.avatarImg.src = profileInfo.avatar;
  profile.profileName.textContent = profileInfo.name;
  profile.profileInfo.textContent = profileInfo.about;
}

// Функция показа прелоадера пока грузится страница
export const renderLoading = () => {
  const page = document.querySelector('.page');
  const loading = document.querySelector('.loading');
  page.classList.add('page_visible');
  loading.classList.add('loading_hidden')
}

// Функции изменения текста кнопки формы при отправке запроса на сервер
export const renderSave = (popup, buttonText, isSave) => {
    const button = popup.querySelector('.form__button');
    if (isSave) {
      button.textContent = buttonText.doing
    } else {
      button.textContent = buttonText.do
    }
}