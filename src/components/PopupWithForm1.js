import Popup from "./Popup1";

export default class PopupWithForm extends Popup {
    constructor({selector, handleFormSubmit}) {
        super({selector});
        this._handleFormSubmit = handleFormSubmit;
        this._handleListener = this._handleListener.bind(this);
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__input');

        this._formValues = {};

        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _handleListener(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close()
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', this._handleListener);
    }

    close() {
        super.close()
        this._form.reset();
    }
}