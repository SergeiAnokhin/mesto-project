export default class Popup {
    constructor({selector}) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this); 
        this. _handleBtnClose = this. _handleBtnClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        setTimeout(() => {
            this._popup.tabIndex = 1;
            this._popup.focus()
          }, 50)
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')) {
            this.close()
        }
    }

    _handleBtnClose(evt) {
        if (evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
        this._popup.addEventListener('click', this. _handleBtnClose);
    }
}