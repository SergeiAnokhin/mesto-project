export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector)
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
                console.log('Вася')
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
        this._popup.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });
        this._popup.addEventListener('click', (evt) => {
            this. _handleBtnClose(evt);
        });
    }
}