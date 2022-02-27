import { addLike, config, deleteCard, deleteLike } from './api.js';
import { modal, deleteElementSubmit, deleteElementEnter, deleteElementBtn } from './modal.js'
import { openPopup, closePopup } from './utils.js';

export const elements = document.querySelector('.elements');
export const templateElement = document.querySelector('.elements__template').content;

// Функция создания карточки места
export function createCard(cardObj) {
    const card = templateElement.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = cardObj.link;
    card.querySelector('.element__image').alt = cardObj.name;
    card.querySelector('.element__title').textContent = cardObj.name;

    if (cardObj.owner._id !== config.userId) {
      card.querySelector('.element__trash').style.display = 'none';
    }
  
    card.querySelector('.element__trash').addEventListener('click', () => {
      card.querySelector('.element__trash').blur();

      function deleteElementBtn(evt) {
        closePopup(modal.deletePopup);
        deleteCard(cardObj._id);
        card.remove();
        this.removeEventListener('click', deleteElementBtn)
      }
  
      function deleteElementEnter(evt) {
          if (evt.key === 'Enter') {
              closePopup(modal.deletePopup);
              deleteCard(cardObj._id);
              card.remove();
              this.removeEventListener('keydown', deleteElementEnter)
          }
      }

      openPopup(modal.deletePopup);
      document.addEventListener('keydown', deleteElementEnter);
      modal.deletePopup.querySelector('button').addEventListener('click', deleteElementBtn);
      });
  
    const elementLike = card.querySelector('.element__like-button');
    const elementLikeCount = card.querySelector('.element__like-count');
    elementLikeCount.textContent = cardObj.likes.length;

    cardObj.likes.forEach(item => {
      if (item._id === config.userId) {
        elementLike.classList.add('element__like-button_active');
      }
    })

      elementLike.addEventListener('click', () => {
        if (elementLike.classList.contains('element__like-button_active')) {
          elementLike.classList.remove('element__like-button_active');
          elementLikeCount.textContent = +elementLikeCount.textContent - 1
          deleteLike(cardObj._id)
        } else {
          elementLike.classList.add('element__like-button_active');
          elementLikeCount.textContent = +elementLikeCount.textContent + 1
          addLike(cardObj._id);
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

export function addElements(arrCards) {
    arrCards.forEach((cardObj) => {
      const cardElement = createCard(cardObj);
      elements.append(cardElement);
    });
}

export function addElement(cardObj) {
      const cardElement = createCard(cardObj);
      elements.prepend(cardElement);
}