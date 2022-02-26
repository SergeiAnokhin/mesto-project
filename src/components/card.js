import { modal } from './modal.js'
import { openPopup } from './utils.js';

const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.elements__template').content;

// Функция создания карточки места
function createCard(placeName, imgUrl) {
    const card = templateElement.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = imgUrl;
    card.querySelector('.element__image').alt = placeName;
    card.querySelector('.element__title').textContent = placeName;
  
    card.querySelector('.element__trash').addEventListener('click', () => {
      openPopup(modal.deletePopup);
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
    arrCards.forEach((item) => {
      const cardElement = createCard(item.name, item.link);
      elements.append(cardElement);
    });
  }

  function addElement(card) {
      const cardElement = createCard(card.name, card.link);
      elements.prepend(cardElement);
  }

  export { createCard, addElements, elements, addElement }