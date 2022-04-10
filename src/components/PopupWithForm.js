import Popup from './Popup';

export default class PopupWithForm extends Popup {
    constructor({selector, handleFormSubmit}) {
        super({selector});
        this._handleFormSubmit = handleFormSubmit;
        this._handleListener = this._handleListener.bind(this);
        this._form = this.popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._submitButton = this.popup.querySelector('.form__button')
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _handleListener(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleListener);
    }

    close() {
        super.close()
        this._form.reset();
    }

    renderSave = (buttonText, isSave) => {
        if (isSave) {
            this._submitButton.textContent = buttonText.doing
        } else {
            this._submitButton.textContent = buttonText.do
        }
    }
}