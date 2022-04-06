import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { 
  cardListSection, selectors, buttonEditProfile, validationConfig, 
  buttonAddPlace, buttonEditAvatar, buttonTextSave, buttonTextCreate, inputProfileName, inputProfileInfo,
  editProfileForm, adddCardForm, editAvatarForm } from '../utils/constants.js';

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}); 

// Создание экземпляра класса User
const user = new UserInfo(selectors)

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (cardItem, userData) => {
    cardsList.prependItem(createCard(cardItem, userData));
  },
},
cardListSection);

// Получение данных пользователя и карточек
Promise.all([api.getProfile(), api.getInitialCards()])
.then(([userData, cards]) => {
  user.setUserInfo(userData)
  cardsList.renderItems(cards, userData);
})
.catch(err => {
    console.log('Ошибка получения данных с сервера', err.message);
})

//Создание модального окна профиля пользователя
const popupProfile = new PopupWithForm({
  selector: '#popup_edit-profile',
  handleFormSubmit: (inputValues) => {
    popupProfile.renderSave(buttonTextSave, true);
    api.editProfile(inputValues['profile-name'], inputValues['profile-info'])
    .then (res => {
      user.setUserInfo(res)
      popupProfile.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования профиля', err.message);
   })
   .finally(() => popupProfile.renderSave(buttonTextSave, false))
  }
});
popupProfile.setEventListeners();

// Создание модального окна с картинкой
const popupImage = new PopupWithImage({selector: '#popup_element-image'})
popupImage.setEventListeners()

// Создание модального окна добавления карточки места
const popupAddPlace = new PopupWithForm({
  selector: '#popup_add-element',
  handleFormSubmit: (inputValues) => {
    popupAddPlace.renderSave(buttonTextCreate, true);

    api.addCard(inputValues['place-name'], inputValues['image-link'])
    .then (res => {
      cardsList.renderItems([res], res.owner);
      popupAddPlace.close();
    })
    .catch(err => {
      console.log('Ошибка добавления карточки', err.message);
    })
   .finally(() => popupAddPlace.renderSave(buttonTextCreate, false))
  }
});
popupAddPlace.setEventListeners();

// Создание модального окна редактирования аватара пользователя
const popupEditAvatar = new PopupWithForm({
  selector: '#popup_edit-avatar',
  handleFormSubmit: (inputValues) => {
    popupEditAvatar.renderSave(buttonTextSave, true);
    api.editAvatar(inputValues['avatar-link'])
    .then (res => {
      user.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log('Ошибка изменения аватара', err.message);
    })
   .finally(() => popupEditAvatar.renderSave(buttonTextSave, false))
  }
});
popupEditAvatar.setEventListeners();

//Валидация форм в модальном окне
const formValidationProfilePopup = new FormValidator(validationConfig, editProfileForm);
formValidationProfilePopup.enableValidation();
const formValidationAddPlacePopup = new FormValidator(validationConfig, adddCardForm);
formValidationAddPlacePopup.enableValidation();
const formValidationEditAvatarPopup = new FormValidator(validationConfig, editAvatarForm);
formValidationEditAvatarPopup.enableValidation();

// Открытие модального окна редактирвоания профиля пользователя
buttonEditProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileInfo.value = userData.info;
  formValidationProfilePopup.resetValidation();
  popupProfile.open()
})

//Открытие модального окна добавления карточки места
buttonAddPlace.addEventListener('click', () => {
  formValidationAddPlacePopup.resetValidation();
  popupAddPlace.open();
})

//Открытие модального окна редактирования аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formValidationEditAvatarPopup.resetValidation();
  popupEditAvatar.open();
})

//Функция удаления карточки
function removeCard(card) {
  api.deleteCard(card.getId())
  .then(() => {
    card.deleteElement();
  })
  .catch((err) => {
    console.log('Ошибка удаления карточки', err.message);
  });
}

// Функция создание карточки
function createCard(cardItem, userData) {
  const card = new Card({
    data: cardItem, 
    userId: userData._id, 
    selector: '.elements__template_type_card',

    handleCardClick: () => {
      popupImage.open(cardItem.link, cardItem.name)
    },

    handleDeleteIconClick: (card) => {
      removeCard(card);
    },

    handleLikeClick: (card) => {
      handleLike(card);
    }
  });

  const cardElement = card.generate();

  return cardElement;
}

function handleLike(card) {
  if(!card.isLiked()) {
    api.addLike(card.getId())
    .then(res => {
      card.like(res);
    })
    .catch(err => {
      console.log('Ошибка проствления лайка', err.message);
    })
  } else {
    api.deleteLike(card.getId())
    .then(res => {
      card.disLike(res);
    })
    .catch(err => {
      console.log('Ошибка удаления лайка', err.message);
    })
  }
}