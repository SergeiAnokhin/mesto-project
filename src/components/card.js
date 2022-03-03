import { addLike, deleteCard, deleteLike } from './api.js';
import { modal } from './modal.js'
import { openPopup, closePopup } from './utils.js';

export const elements = document.querySelector('.elements');
export const templateElement = document.querySelector('.elements__template').content;

// Функция создания карточки места
export const createCard = (cardObj, userId) => {
    const cardId = cardObj._id;
    const card = templateElement.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = cardObj.link;
    card.querySelector('.element__image').alt = cardObj.name;
    card.querySelector('.element__title').textContent = cardObj.name;

    if (cardObj.owner._id !== userId) {
      card.querySelector('.element__trash').style.display = 'none';
    }
  
    card.querySelector('.element__trash').addEventListener('click', () => {
      deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      }); 
    });
  
    const elementLike = card.querySelector('.element__like-button');
    const elementLikeCount = card.querySelector('.element__like-count');
    elementLikeCount.textContent = cardObj.likes.length;

    cardObj.likes.forEach(item => {
      if (item._id === userId) {
        elementLike.classList.add('element__like-button_active');
      }
    })

      elementLike.addEventListener('click', () => {
        if (elementLike.classList.contains('element__like-button_active')) {
          deleteLike(cardId)
          .then((result) => {
            elementLike.classList.remove('element__like-button_active');
            elementLikeCount.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          }); 
        } else {
          addLike(cardId)
          .then((result) => {
            elementLike.classList.add('element__like-button_active');
            elementLikeCount.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          }); 
        }
    });
  
    card.querySelector('.element__image').addEventListener('click', () => {
      modal.popupImage.src = card.querySelector('.element__image').src;
      modal.popupImage.alt = card.querySelector('.element__title').textContent;
      modal.popupPlaceName.textContent = card.querySelector('.element__title').textContent;
      openPopup(modal.imgPopup);
    });
  
    return card;
  }

export const addElements = (arrCards, userId) => {
    arrCards.forEach((cardObj) => {
      const cardElement = createCard(cardObj, userId);
      elements.append(cardElement);
    });
}

export const addElement = (cardObj, userId) => {
      const cardElement = createCard(cardObj, userId);
      elements.prepend(cardElement);
}