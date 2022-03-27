export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._forms = document.forms;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._errorList = Array.from(this._formElement.querySelectorAll(config.spanSelector));
  }

  clearErrors() {
    this._inputList.forEach(input => {
        if (input.classList.contains(this._inputErrorClass)) {
            input.classList.remove(this._inputErrorClass);
        }
    })
    this._errorList.forEach(input => {
        if (input.classList.contains(this._errorClass)) {
            input.classList.remove(this._errorClass);
        }
    })
    this._hasInvalidInput();
    this._toggleButtonState();
}

  _showInputError(inputElement, errorMessage) {
    const errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
 
  _hideInputError(inputElement) {
    const errorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._buttonElement.disabled = true;
    } else {
        this._buttonElement.disabled = false;
    }
  }; 
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 
  
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState();
      });
    });
  }; 
  
  enableValidation() {  

    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
    this._setEventListeners();
  }
}






