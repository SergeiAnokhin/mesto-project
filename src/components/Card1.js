export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getElement() {
    const cardElement = document
    .querySelector('.elements__template')
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    
    return this._element;
  }    
}


