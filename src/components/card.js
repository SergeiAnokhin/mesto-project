import { addLike, deleteCard, deleteLike } from './api.js';
import { modal } from './modal.js'
import { openPopup, closePopup, renderSave, buttonTextDelete} from './utils.js';

export const elements = document.querySelector('.elements');
export const templateElement = document.querySelector('.elements__template').content;

// Функция удаления карточки с подтверждением в модальном окне
export const removeElement = (card, cardTrashBtn, cardId, btnText) => {
  cardTrashBtn.addEventListener('click', () => {

    const popup = modal.deletePopup;
    const popupBtn = popup.querySelector('button');

    openPopup(popup);

    // Фокусирование на модальном окне (чтобы сразу можно было подтвердить нажатием на Enter)
    setTimeout(() => {
      popup.tabIndex = 1;
      popup.focus()
    }, 50)

    // Удаление елемента (карточки)
    const deleteElement = () => {
      renderSave(popup, btnText, true)
          deleteCard(cardId)
          .then(() => {
            card.remove();
            closePopup(popup)
            popup.removeEventListener('keydown', deleteElementEnter)
            popupBtn.removeEventListener('click', deleteElementBtn);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => 
            renderSave(popup, btnText, false)
          )
    }

    // Удаление по нажатию на Enter
    const deleteElementEnter = (evt) => {
      if (evt.key === 'Enter') {
        deleteElement()
      }
    }

    // Удаление по клику
    const deleteElementBtn = () => {
        deleteElement()
    }

    // Слушатели событий по клику и нажатию Enter
    popup.addEventListener('keydown', deleteElementEnter);
    popupBtn.addEventListener('click', deleteElementBtn);
  })
}

// Функция создания карточки места
export const createCard = (cardObj, userId) => {
    const cardId = cardObj._id;
    const card = templateElement.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardTrashBtn = card.querySelector('.element__trash');

    cardImage.src = cardObj.link;
    cardImage.alt = cardObj.name;
    cardTitle.textContent = cardObj.name;

    // Скрытие кнопок удаления карточки, если карточки чужие
    if (cardObj.owner._id !== userId) {
      cardTrashBtn.style.display = 'none';
    }

    // Вызов функции удаления карточки
    removeElement(card, cardTrashBtn, cardId, buttonTextDelete)

    // Получение кнопки лайка и элемента счетчика лайков
    const elementLike = card.querySelector('.element__like-button');
    const elementLikeCount = card.querySelector('.element__like-count');

    // Показ количество лайков карточки
    elementLikeCount.textContent = cardObj.likes.length;

    // Показ карточек, которые лайкнуты текущим пользователем
    cardObj.likes.forEach(item => {
      if (item._id === userId) {
        elementLike.classList.add('element__like-button_active');
      }
    })

    // Добавление и удаление лайка по клику
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
  
    // Открытие модального окна при клике на картинку карточки
    cardImage.addEventListener('click', () => {
      modal.popupImage.src = cardObj.link;
      modal.popupImage.alt = cardObj.name;
      modal.popupPlaceName.textContent = cardObj.name;
      openPopup(modal.imgPopup);
    });
  
    return card;
  }

// Добавление карточек при загрузке страницы
export const addElements = (arrCards, userId) => {
    arrCards.forEach((cardObj) => {
      const cardElement = createCard(cardObj, userId);
      elements.append(cardElement);
    });
}

// Добавление одной карточки
export const addElement = (cardObj, userId) => {
      const cardElement = createCard(cardObj, userId);
      elements.prepend(cardElement);
}