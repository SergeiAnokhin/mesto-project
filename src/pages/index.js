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
  buttonAddPlace, buttonEditAvatar, buttonTextSave, buttonTextCreate } from '../components/utils/constants';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}); 

const user = new UserInfo(selectors)

// Получение данных пользователя и карточек
Promise.all([api.getProfile(), api.getInitialCards()])
.then(res => {
  user.setUserInfo(res[0])
  const userId = res[0]._id;

  const cardsList = new Section({
    items: res[1],
    renderer: (cardItem) => {
      const card = new Card({
      data: cardItem, 
      userId: userId, 
      selector: '.elements__template_type_card',
      handleCardClick: () => {
        popupImage.open(cardItem.link, cardItem.name)
      },
      handleDeleteIconClick: () => {
        api.deleteCard(cardItem._id)
        .then(res => {
          cardElement.remove()
        })
        .catch(err => {
          console.log('Ошибка удаления карточки', err.message);
       })
      },
      handleLikeClick: () => {
        const likeButton = cardElement.querySelector('.element__like-button');
        const likeCounter = cardElement.querySelector('.element__like-count');
  
        if(!likeButton.classList.contains('element__like-button_active')) {
          api.addLike(cardItem._id)
          .then(res => {
            likeButton.classList.add('element__like-button_active');
            likeCounter.textContent = res.likes.length;
          })
          .catch(err => {
            console.log('Ошибка проствления лайка', err.message);
          })
        } else {
          api.deleteLike(cardItem._id)
          .then(res => {
            likeButton.classList.remove('element__like-button_active');
            likeCounter.textContent = res.likes.length;
          })
          .catch(err => {
            console.log('Ошибка удаления лайка', err.message);
          })
        }
  
      }
      });
  
      const cardElement = card.generate();
      cardsList.addItems(cardElement);
  
    },
  },

    cardListSection); 
    cardsList.renderItems();
})
.catch(err => {
    console.log('Ошибка получения данных с сервера', err.message);
})

//Создание попапа профиля
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

const popupImage = new PopupWithImage({selector: '#popup_element-image'})
popupImage.setEventListeners()

// Создание попапа редактирования места
const popupAddPlace = new PopupWithForm({
  selector: '#popup_add-element',
  handleFormSubmit: (inputValues) => {
    popupAddPlace.renderSave(buttonTextCreate, true);

    api.addCard(inputValues['place-name'], inputValues['image-link'])
    .then (res => {
      const cardsList = new Section({
        items: [res],
        renderer: (cardItem) => {
          const card = new Card({
          data: cardItem, 
          userId: res.owner._id, 
          selector: '.elements__template_type_card',

          handleCardClick: () => {
            popupImage.open(cardItem.link, cardItem.name)
          },

          handleDeleteIconClick: () => {
            api.deleteCard(res._id)
            .then(res => {
              cardElement.remove()
            })
            .catch(err => {
              console.log('Ошибка удаления карточки', err.message);
            })
          },

          handleLikeClick: () => {
            const likeButton = cardElement.querySelector('.element__like-button');
            const likeCounter = cardElement.querySelector('.element__like-count');

            if(!likeButton.classList.contains('element__like-button_active')) {
              api.addLike(cardItem._id)
              .then(res => {
                likeButton.classList.add('element__like-button_active');
                likeCounter.textContent = res.likes.length;
              })
              .catch(err => {
                console.log('Ошибка проствления лайка', err.message);
              })
            } else {
              api.deleteLike(cardItem._id)
              .then(res => {
                likeButton.classList.remove('element__like-button_active');
                likeCounter.textContent = res.likes.length;
              })
              .catch(err => {
                console.log('Ошибка удаления лайка', err.message);
              })
            }

          }
        });
          const cardElement = card.generate();
          cardsList.addItem(cardElement);
        },
      },
      cardListSection); 
      cardsList.renderItems(); 
    })
    .catch(err => {
      console.log('Ошибка добавления карточки', err.message);
    })
   .finally(() => popupAddPlace.renderSave(buttonTextCreate, false))
  }
});

// Создание попапа редактирования аватара
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