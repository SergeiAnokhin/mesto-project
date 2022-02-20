const forms = document.forms;

const showInputError = (formElement, inputElement, errorMessage) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
  
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }; 
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }; 
  
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }; 

  const validateOpenPopup = (popup) => {
    if (popup.querySelector('form')) {
        const form = popup.querySelector('form');
        const inputList = Array.from(popup.querySelectorAll('.form__input'));
        const buttonElement = popup.querySelector('button')
    
        inputList.forEach(input => {
            if (input.value !== '') {
                isValid(form, input);
            } else {
                input.classList.remove('form__input_type_error')
                popup.querySelector(`.${input.id}-error`).textContent = '';
            }
        })
        
        hasInvalidInput(inputList);
        toggleButtonState(inputList, buttonElement);
        }
}
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
    });
  
  }; 
  
  const enableValidation = () => {
  
    const formList = Array.from(forms);
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  
  };

  export {enableValidation, setEventListeners, validateOpenPopup, isValid, toggleButtonState, hasInvalidInput, hideInputError, showInputError}