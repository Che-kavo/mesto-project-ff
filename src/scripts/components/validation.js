export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  const formArray = Array.from(forms);

  formArray.forEach((form) => {
      setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);

  inputs.forEach((input) => {
      input.addEventListener("input", () => {
          checkInputValidity(input, config);
          toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
      });
  });
}

function checkInputValidity(input, config) {
  if (!input.validity.valid) {
      showInputError(input, config);
  } else {
      hideInputError(input, config);
  }
}

function showInputError(input, config) {
  const errorElement = input.form.querySelector(`.${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, config) {
  const errorElement = input.form.querySelector(`.${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(inactiveButtonClass, !isValid);
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
      hideInputError(input, config);
  });

  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
}
