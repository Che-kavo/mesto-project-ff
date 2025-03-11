const validateProfileInput = (inputElement) => {
  const nameAndAboutPattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/;

  inputElement.setCustomValidity('');

  if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Вы пропустили это поле.');
  } else if (inputElement.name === 'name') {
      if (inputElement.value.length < 2 || inputElement.value.length > 40) {
          inputElement.setCustomValidity('Должно быть от 2 до 40 символов.');
      } else if (!nameAndAboutPattern.test(inputElement.value)) {
          inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
      }
  } else if (inputElement.name === 'description') {
      if (inputElement.value.length < 2 || inputElement.value.length > 200) {
          inputElement.setCustomValidity('Должно быть от 2 до 200 символов.');
      } else if (!nameAndAboutPattern.test(inputElement.value)) {
          inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
      }
  } else if (inputElement.name === 'link') { 
      if (inputElement.validity.valueMissing) {
          inputElement.setCustomValidity('Поле обязательное.');
      } else if (!urlPattern.test(inputElement.value)) {
          inputElement.setCustomValidity('Введите корректный URL.');
      }
  }
};
  
  const validatePlaceInput = (inputElement) => {
    const nameAndAboutPattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  
    inputElement.setCustomValidity('');
  
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Вы пропустили это поле.');
    } else if (inputElement.name === 'place-name') {
      if (inputElement.value.length < 2 || inputElement.value.length > 30) {
        inputElement.setCustomValidity('Должно быть от 2 до 30 символов.');
      } else if (!nameAndAboutPattern.test(inputElement.value)) {
        inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
      }
    } else if (inputElement.name === 'link') {
      if (inputElement.validity.typeMismatch) {
        inputElement.setCustomValidity('Введите адрес сайта.');
      }
    }
  };
  
  const checkInputValidity = (formElement, inputElement, selectors) => {
    const formName = formElement.getAttribute('name');
  
    if (formName === 'edit-profile') {
      validateProfileInput(inputElement);
    } else if (formName === 'new-place') {
      validatePlaceInput(inputElement);
    }
  
    if (!inputElement.validity.valid) {
      const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(selectors.inputErrorClass);
      errorElement.classList.add(selectors.errorClass);
    } else {
      hideInputError(formElement, inputElement, selectors);
    }
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, selectors);
  };
  
  const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
  };
  
  export const clearValidation = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.value = ''; 
      hideInputError(formElement, inputElement, selectors); 
    });
  
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, selectors); 
  };
  
    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => !inputElement.validity.valid);
      };
      
      const toggleButtonState = (inputList, buttonElement, selectors) => {
        if (hasInvalidInput(inputList)) {
          buttonElement.classList.add(selectors.inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(selectors.inactiveButtonClass);
          buttonElement.disabled = false;
        }
      };
  
  const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, selectors);
          toggleButtonState(inputList, buttonElement, selectors);
        });
      });
    };
    
  export const enableValidation = (selectors) => {
      const formList = Array.from(document.querySelectorAll(selectors.formSelector));
      formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
      });
    };
    