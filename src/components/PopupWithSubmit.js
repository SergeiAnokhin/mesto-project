import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
    constructor({selector, handleFormSubmit}) {
        super({selector});
        this._handleFormSubmit = handleFormSubmit;
        this._handleListenerEnter = this._handleListenerEnter.bind(this);
        this._handleListenerClick = this._handleListenerClick.bind(this);
        this._submitButton = this.popup.querySelector('.popup__button')
    }

    open(card) {
        super.open();
        this._card = card;
    }

    _handleListenerEnter(evt) {
        if (evt.key === 'Enter') {
            this._handleFormSubmit(this._card);
        }
    }

    _handleListenerClick(evt) {
        if (evt.target === this._submitButton) {
            this._handleFormSubmit(this._card);
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('keydown', this._handleListenerEnter);
        this.popup.addEventListener('click', this._handleListenerClick);
    }

    renderSave = (buttonText, isSave) => {
        if (isSave) {
            this._submitButton.textContent = buttonText.doing
        } else {
            this._submitButton.textContent = buttonText.do
        }
    }
}