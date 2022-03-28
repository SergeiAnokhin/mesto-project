import '../pages/index.css';
import Api from '../components/Api1.js';
import Card from '../components/Card1.js';
import FormValidator from '../components/FormValidator1.js';
import Section from '../components/Section1.js';
import PopupWithImage from '../components/PopupWithImage1.js';
import PopupWithForm from '../components/PopupWithForm1.js';
import UserInfo from '../components/UserInfo1.js';
import { 
  cardListSection, selectors, buttonEditProfile, validationConfig, 
  buttonAddPlace, buttonEditAvatar } from '../components/utils/constants';
import Popup from '../components/Popup1';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}); 

const user = new UserInfo(selectors)

Promise.all([api.getProfile(), api.getInitialCards()])
.then(res => {
user.setUserInfo(res[0])
const userId = res[0]._id;
const cardsList = new Section({
      items: res[1],
      renderer: (cardItem) => {
        const card = new Card(cardItem, userId, '.elements__template_type_card');
        const cardElement = card.generate();
        cardsList.addItem(cardElement);
      },
    },
    cardListSection); 
    cardsList.renderItems(); 
    // popupImage.open(res[1][0].link, res[1][0].name)
})
.catch(err => {
    console.log('Ошибка получения данных с сервера', err.message);
})

const popupProfile = new PopupWithForm({
  selector: '#popup_edit-profile',
  handleFormSubmit: (inputValues) => {
    api.editProfile(inputValues['profile-name'], inputValues['profile-info'])
    .then (res => {
      user.setUserInfo(res)
      popupProfile.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования профиля', err.message);
   })
  }
});

const popupImage = new PopupWithImage({selector: '#popup_element-image'})
popupImage.setEventListeners()

// Создание попапа редактирования места
const popupAddPlace = new PopupWithForm({
  selector: '#popup_add-element',
  handleFormSubmit: (inputValues) => {
    api.addCard(inputValues['place-name'], inputValues['image-link'])
    .then (res => {
      const card = new Card(res, user.getUserInfo().userId, '.elements__template_type_card');
      const cardElement = card.generate();
      document.querySelector(cardListSection).prepend(cardElement);
      popupAddPlace.close();
    })
    .catch(err => {
      console.log('Ошибка добавления карточки', err.message);
   })
  }
});

// Создание попапа редактирования аватара
const popupEditAvatar = new PopupWithForm({
  selector: '#popup_edit-avatar',
  handleFormSubmit: (inputValues) => {
    api.editAvatar(inputValues['avatar-link'])
    .then (res => {
      user.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log('Ошибка изменения аватара', err.message);
   })
  }
});

//Валидация попапов
const formValidationProfilePopup = new FormValidator(validationConfig, document.querySelector('[name="edit-profile"]'));
const formValidationAddPlacePopup = new FormValidator(validationConfig, document.querySelector('[name="add-element"]'));
const formValidationEditAvatarPopup = new FormValidator(validationConfig, document.querySelector('[name="edit-avatar"]'));

// Открыть попап редактирвоания профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfile._popup.querySelector('#profile-name').value = user.getUserInfo().name;
  popupProfile._popup.querySelector('#profile-info').value = user.getUserInfo().info;
  formValidationProfilePopup.clearErrors();
  popupProfile.open()
  popupProfile.setEventListeners();
  formValidationProfilePopup.enableValidation();
})

//Открытие попапа добавления места
buttonAddPlace.addEventListener('click', () => {
  formValidationAddPlacePopup.clearErrors();
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
  formValidationAddPlacePopup.enableValidation();
})

//Открытие попапа редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  formValidationEditAvatarPopup.clearErrors();
  popupEditAvatar.open();
  popupEditAvatar.setEventListeners();
  formValidationEditAvatarPopup.enableValidation();
})