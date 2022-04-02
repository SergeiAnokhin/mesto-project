export default class Card {
  constructor({data, userId, selector, handleCardClick, handleDeleteIconClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._data = data;
    this._data.likes = data.likes;
    this._handleLikeClick = handleLikeClick;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }
  
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__like-count').textContent = this._data.likes.length;
    
    if(this._cardOwnerId !== this._userId) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }
    
    if(this._data.likes.some((like) => this._userId === like._id)) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteIconClick();
    });
  }  
}


