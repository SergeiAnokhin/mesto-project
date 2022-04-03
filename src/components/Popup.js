export default class Popup {
    constructor({selector}) {
        this.popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this); 
        this._handleBtnClose = this._handleBtnClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        this.popup.addEventListener('keydown', this._handleEscClose);
        setTimeout(() => {
            this.popup.tabIndex = 1;
            this.popup.focus()
        }, 50)
    }

    close() {
        this.popup.classList.remove('popup_opened');
        this.popup.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
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
        this.popup.addEventListener('mousedown', this._handleOverlayClose);
        this.popup.addEventListener('click', this. _handleBtnClose);
    }
}