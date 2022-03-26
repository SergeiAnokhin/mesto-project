import Popup from "./Popup1";

export default class PopupWithImage extends Popup {
    constructor({selector}) {
        super(selector);
        this._popup = document.querySelector(selector);
    }

    open(link, name) {
      super.open()
      this._popup.querySelector('.popup__image').src = link;
      this._popup.querySelector('.popup__place-name').textContent = name;
      this._popup.querySelector('.popup__place-name').alt = name;
    }
}
