import Popup from './Popup';

export default class PopupWithImage extends Popup {
    constructor({selector}) {
      super({selector});
      this._imageLink = this._popup.querySelector('.popup__image');
      this._imageText = this._popup.querySelector('.popup__place-name');
    }

    open(link, name) {
      super.open()
      this._imageLink.src = link;
      this._imageText.textContent = name;
      this._imageLink.alt = name;
    }
}
