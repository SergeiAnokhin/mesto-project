import { userId } from './api.js';
import { modal } from './modal.js'
import { openPopup } from './utils.js';

const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.elements__template').content;

// Функция создания карточки места
function createCard(cardObj) {
    const card = templateElement.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = cardObj.link;
    card.querySelector('.element__image').alt = cardObj.name;
    card.querySelector('.element__title').textContent = cardObj.name;

    if (cardObj.owner._id !== userId) {
      card.querySelector('.element__trash').style.display = 'none';
    }
  
    card.querySelector('.element__trash').addEventListener('click', () => {
      card.remove();
    });
  
    const elementLike = card.querySelector('.element__like');
      elementLike.addEventListener('click', () => {
        if (elementLike.classList.contains('element__like_active')) {
          elementLike.classList.remove('element__like_active');
        } else {
          elementLike.classList.add('element__like_active');
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

  function addElements(arrCards) {
    arrCards.forEach((cardObj) => {
      const cardElement = createCard(cardObj);
      elements.append(cardElement);
    });
  }

  function addElement(cardObj) {
      const cardElement = createCard(cardObj);
      elements.prepend(cardElement);
  }

  export { createCard, addElements, elements, addElement }