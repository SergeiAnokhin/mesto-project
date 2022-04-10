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
    this._cardId = data._id;
  }

  isLiked() {
    return this._cardLikeButton.classList.contains('element__like-button_active');
  }

  like(res) {
    this._cardLikeButton.classList.add('element__like-button_active');
    this._cardLikeCount.textContent = res.likes.length;
  }

  disLike(res) {
    this._cardLikeButton.classList.remove('element__like-button_active');
    this._cardLikeCount.textContent = res.likes.length;
  }

  getId() {
    return this._cardId;
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
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
    
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLikeCount = this._element.querySelector('.element__like-count');
    this._cardLikeButton = this._element.querySelector('.element__like-button');
    this._cardTrashButton = this._element.querySelector('.element__trash');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._data.likes.length;
    
    if(this._cardOwnerId !== this._userId) {
      this._cardTrashButton.style.display = 'none';
    }
    
    if(this._data.likes.some((like) => this._userId === like._id)) {
      this._cardLikeButton.classList.add('element__like-button_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
    this._cardTrashButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
  }  
}


