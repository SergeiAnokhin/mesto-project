const forms = document.forms;

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
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
  
  const isValid = (formElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      hideInputError(formElement, inputElement, rest);
    }
  }; 
  
  const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, rest)
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  const enableValidation = ({formSelector, ...rest}) => {
  
    const formList = Array.from(forms);
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, rest);
    });
  
  };

  export { enableValidation, setEventListeners, isValid, toggleButtonState, hasInvalidInput, hideInputError, showInputError }