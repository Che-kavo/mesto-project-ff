/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/api.js":
/*!***************************************!*\
  !*** ./src/scripts/components/api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewCard: () => (/* binding */ addNewCard),\n/* harmony export */   checkResponse: () => (/* binding */ checkResponse),\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   deleteCardFromServer: () => (/* binding */ deleteCardFromServer),\n/* harmony export */   fetchInitialCards: () => (/* binding */ fetchInitialCards),\n/* harmony export */   fetchUserData: () => (/* binding */ fetchUserData),\n/* harmony export */   updateAvatar: () => (/* binding */ updateAvatar),\n/* harmony export */   updateUserData: () => (/* binding */ updateUserData)\n/* harmony export */ });\nvar config = {\n  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',\n  headers: {\n    authorization: 'f242107a-6a11-4c21-ac69-65ef4e378d36',\n    'Content-Type': 'application/json'\n  }\n};\nfunction fetchUserData() {\n  return fetch(\"\".concat(config.baseUrl, \"/users/me\"), {\n    headers: config.headers\n  }).then(checkResponse);\n}\nfunction fetchInitialCards() {\n  return fetch(\"\".concat(config.baseUrl, \"/cards\"), {\n    headers: config.headers\n  }).then(checkResponse);\n}\nfunction updateUserData(newData) {\n  return fetch(\"\".concat(config.baseUrl, \"/users/me\"), {\n    method: 'PATCH',\n    headers: config.headers,\n    body: JSON.stringify(newData)\n  }).then(checkResponse);\n}\nfunction addNewCard(cardInfo) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards\"), {\n    method: 'POST',\n    headers: config.headers,\n    body: JSON.stringify(cardInfo)\n  }).then(checkResponse);\n}\nfunction deleteCardFromServer(cardId) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards/\").concat(cardId), {\n    method: 'DELETE',\n    headers: config.headers\n  }).then(checkResponse);\n}\nfunction updateAvatar(avatarUrl) {\n  console.log('Отправляем URL аватара:', avatarUrl);\n  return fetch(\"\".concat(config.baseUrl, \"/users/me/avatar\"), {\n    method: 'PATCH',\n    headers: config.headers,\n    body: JSON.stringify({\n      avatar: avatarUrl\n    })\n  }).then(function (response) {\n    console.log('Ответ сервера:', response);\n    return checkResponse(response);\n  }).catch(function (error) {\n    console.error('Ошибка при обновлении аватара:', error);\n  });\n}\nfunction checkResponse(response) {\n  if (!response.ok) {\n    return Promise.reject(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430: \".concat(response.status));\n  }\n  return response.json();\n}\n\n//# sourceURL=webpack://yandex_prakticum/./src/scripts/components/api.js?");

/***/ }),

/***/ "./src/scripts/components/card.js":
/*!****************************************!*\
  !*** ./src/scripts/components/card.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   handleLikeClick: () => (/* binding */ handleLikeClick)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/scripts/components/api.js\");\n\nfunction createCard(cardInfo, deleteCallback, handleImageClick, handleLikeClick) {\n  var cardTemplate = document.querySelector('#card-template').content.querySelector('.card');\n  var cardElement = cardTemplate.cloneNode(true);\n  var cardImage = cardElement.querySelector('.card__image');\n  var cardTitle = cardElement.querySelector('.card__title');\n  var deleteButton = cardElement.querySelector('.card__delete-button');\n  var likeButton = cardElement.querySelector('.card__like-button');\n  var likeCounter = cardElement.querySelector('.card__like-counter');\n  var currentUserId = 'af5c7ab0a829d02dcb5d9835';\n  cardTitle.textContent = cardInfo.name;\n  cardImage.src = cardInfo.link;\n  cardImage.alt = cardInfo.name;\n  if (cardInfo.owner && cardInfo.owner._id !== currentUserId) {\n    deleteButton.remove();\n  } else {\n    deleteButton.addEventListener('click', function () {\n      if (cardInfo._id) {\n        deleteCard(cardInfo._id, cardElement, deleteCallback);\n      } else {\n        console.error('Ошибка cardInfo._id не определён');\n      }\n    });\n  }\n  cardImage.addEventListener('click', function () {\n    handleImageClick(cardInfo);\n  });\n  var isLiked = cardInfo.likes.some(function (like) {\n    return like._id === currentUserId;\n  });\n  var likeCount = cardInfo.likes.length;\n  likeCounter.textContent = likeCount;\n  updateLikeButtonState();\n  likeButton.addEventListener('click', function () {\n    handleLikeClick(cardInfo._id, isLiked).then(function (updatedCardInfo) {\n      isLiked = updatedCardInfo.likes.some(function (like) {\n        return like._id === currentUserId;\n      });\n      likeCount = updatedCardInfo.likes.length;\n      likeCounter.textContent = likeCount || 0;\n      updateLikeButtonState();\n    }).catch(function (err) {\n      return console.error('Ошибка обновления лайков:', err);\n    });\n  });\n  function updateLikeButtonState() {\n    likeButton.classList.toggle('card__like-button_is-active', isLiked);\n  }\n  return cardElement;\n}\nfunction deleteCard(cardId, cardElement, deleteCallback) {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteCardFromServer)(cardId).then(function () {\n    cardElement.remove();\n    deleteCallback();\n  }).catch(function (err) {\n    return console.error('Ошибка удаления карточки:', err);\n  });\n}\nfunction handleLikeClick(cardId, isLiked) {\n  var method = isLiked ? 'DELETE' : 'PUT';\n  return fetch(\"\".concat(_api_js__WEBPACK_IMPORTED_MODULE_0__.config.baseUrl, \"/cards/likes/\").concat(cardId), {\n    method: method,\n    headers: _api_js__WEBPACK_IMPORTED_MODULE_0__.config.headers\n  }).then(function (response) {\n    if (!response.ok) {\n      throw new Error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 HTTP: \".concat(response.status));\n    }\n    return response.json();\n  }).catch(function (error) {\n    console.error('Ошибка при обновлении лайков:', error);\n    return Promise.reject(error);\n  });\n}\n\n//# sourceURL=webpack://yandex_prakticum/./src/scripts/components/card.js?");

/***/ }),

/***/ "./src/scripts/components/modal.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/modal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   closePopupOnEsc: () => (/* binding */ closePopupOnEsc),\n/* harmony export */   openModal: () => (/* binding */ openModal),\n/* harmony export */   setupPopupListeners: () => (/* binding */ setupPopupListeners)\n/* harmony export */ });\nfunction openModal(modal) {\n  modal.style.visibility = 'visible';\n  requestAnimationFrame(function () {\n    modal.classList.add('popup_is-opened');\n  });\n  document.addEventListener('keydown', closePopupOnEsc);\n}\nfunction closeModal(modal) {\n  modal.classList.remove('popup_is-opened');\n  setTimeout(function () {\n    if (!modal.classList.contains('popup_is-opened')) {\n      modal.style.visibility = 'hidden';\n    }\n  }, 300);\n  document.removeEventListener('keydown', closePopupOnEsc);\n}\nfunction closePopupOnEsc(event) {\n  if (event.key === 'Escape') {\n    var openPopup = document.querySelector('.popup_is-opened');\n    if (openPopup) {\n      closeModal(openPopup);\n    }\n  }\n}\nfunction setupPopupListeners(popup) {\n  popup.addEventListener('mousedown', function (event) {\n    if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {\n      closeModal(popup);\n    }\n  });\n}\n\n//# sourceURL=webpack://yandex_prakticum/./src/scripts/components/modal.js?");

/***/ }),

/***/ "./src/scripts/components/validation.js":
/*!**********************************************!*\
  !*** ./src/scripts/components/validation.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearValidation: () => (/* binding */ clearValidation),\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation)\n/* harmony export */ });\nfunction enableValidation(config) {\n  var forms = document.querySelectorAll(config.formSelector);\n  forms.forEach(function (form) {\n    setEventListeners(form, config);\n  });\n}\nfunction setEventListeners(form, config) {\n  var inputs = Array.from(form.querySelectorAll(config.inputSelector));\n  var submitButton = form.querySelector(config.submitButtonSelector);\n  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);\n  inputs.forEach(function (input) {\n    input.addEventListener('input', function () {\n      checkInputValidity(input, config);\n      toggleButtonState(inputs, submitButton, config.inactiveButtonClass);\n    });\n  });\n}\nfunction checkInputValidity(input, config) {\n  if (input.validity.patternMismatch) {\n    input.setCustomValidity(input.dataset.errorMessage);\n  } else {\n    input.setCustomValidity('');\n  }\n  var errorElement = input.form.querySelector(\".\".concat(input.name, \"-error\"));\n  showInputError(input, errorElement, config.inputErrorClass, config.errorClass);\n}\nfunction showInputError(input, errorElement, inputErrorClass, errorClass) {\n  input.classList.toggle(inputErrorClass, !input.validity.valid);\n  errorElement.textContent = input.validationMessage;\n  errorElement.classList.toggle(errorClass, !input.validity.valid);\n}\nfunction toggleButtonState(inputs, button, inactiveButtonClass) {\n  var isValid = inputs.every(function (input) {\n    return input.validity.valid;\n  });\n  button.disabled = !isValid;\n  button.classList.toggle(inactiveButtonClass, !isValid);\n}\nfunction clearValidation(form, config) {\n  var inputs = Array.from(form.querySelectorAll(config.inputSelector));\n  var submitButton = form.querySelector(config.submitButtonSelector);\n  inputs.forEach(function (input) {\n    var errorElement = form.querySelector(\".\".concat(input.name, \"-error\"));\n    input.classList.remove(config.inputErrorClass);\n    errorElement.classList.remove(config.errorClass);\n    errorElement.textContent = '';\n  });\n  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);\n}\n\n//# sourceURL=webpack://yandex_prakticum/./src/scripts/components/validation.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/api.js */ \"./src/scripts/components/api.js\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modal.js */ \"./src/scripts/components/modal.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/card.js */ \"./src/scripts/components/card.js\");\n/* harmony import */ var _components_validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/validation.js */ \"./src/scripts/components/validation.js\");\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n\n\n\nvar validationConfig = {\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__button',\n  inactiveButtonClass: 'popup__button_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorClass: 'popup__error_visible'\n};\n(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_3__.enableValidation)(validationConfig);\nvar placesList = document.querySelector('.places__list');\nvar profileName = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\nvar editPopup = document.querySelector('.popup_type_edit');\nvar formProfile = editPopup.querySelector('.popup__form');\nvar nameInput = formProfile.querySelector('.popup__input_type_name');\nvar descriptionInput = formProfile.querySelector('.popup__input_type_description');\nvar newCardForm = document.querySelector('.popup_type_new-card .popup__form');\nvar newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');\nvar linkInput = newCardForm.querySelector('.popup__input_type_url');\nvar avatarPopup = document.querySelector('.popup_type_new-image');\nvar avatarForm = avatarPopup.querySelector('.popup__form');\nvar avatarInput = avatarForm.querySelector('.popup__input_type_url');\nvar profileImage = document.querySelector('.profile__image');\ndocument.querySelector('.profile__change-image-button').addEventListener('click', function () {\n  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(avatarForm, validationConfig);\n  avatarInput.value = '';\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(avatarPopup);\n});\ndocument.querySelector('.profile__edit-button').addEventListener('click', function () {\n  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(formProfile, validationConfig);\n});\ndocument.querySelector('.profile__add-button').addEventListener('click', function () {\n  if (newCardForm) {\n    newCardForm.reset();\n  }\n  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(newCardForm, validationConfig);\n});\nPromise.all([(0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchUserData)(), (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchInitialCards)()]).then(function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 2),\n    userData = _ref2[0],\n    cards = _ref2[1];\n  profileName.textContent = userData.name;\n  profileDescription.textContent = userData.about;\n  profileImage.style.backgroundImage = \"url('\".concat(userData.avatar, \"')\");\n  cards.forEach(function (cardInfo) {\n    addCard(cardInfo);\n  });\n}).catch(function (err) {\n  return console.error(err);\n});\nfunction addCard(cardInfo) {\n  var cardElement = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_2__.createCard)(cardInfo, _components_card_js__WEBPACK_IMPORTED_MODULE_2__.deleteCard, handleCardImageClick, _components_card_js__WEBPACK_IMPORTED_MODULE_2__.handleLikeClick);\n  if (cardElement) {\n    placesList.append(cardElement);\n  } else {\n    console.error('Не удалось создать карточку из:', cardInfo);\n  }\n}\nfunction handleCardImageClick(cardInfo) {\n  var imagePopup = document.querySelector('.popup_type_image');\n  var popupImage = imagePopup.querySelector('.popup__image');\n  var popupCaption = imagePopup.querySelector('.popup__caption');\n  popupImage.src = cardInfo.link;\n  popupImage.alt = cardInfo.name;\n  popupCaption.textContent = cardInfo.name;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(imagePopup);\n}\ndocument.querySelectorAll('.popup').forEach(function (popup) {\n  return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.setupPopupListeners)(popup);\n});\ndocument.querySelector('.profile__edit-button').addEventListener('click', function () {\n  nameInput.value = profileName.textContent;\n  descriptionInput.value = profileDescription.textContent;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(editPopup);\n});\ndocument.querySelector('.profile__add-button').addEventListener('click', function () {\n  var newCardPopup = document.querySelector('.popup_type_new-card');\n  if (newCardPopup) {\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(newCardPopup);\n  }\n});\nformProfile.addEventListener('submit', function (event) {\n  event.preventDefault();\n  var submitButton = formProfile.querySelector(validationConfig.submitButtonSelector);\n  setLoadingState(submitButton, true);\n  var newUserData = {\n    name: nameInput.value,\n    about: descriptionInput.value\n  };\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.updateUserData)(newUserData).then(function (updatedUserData) {\n    profileName.textContent = updatedUserData.name;\n    profileDescription.textContent = updatedUserData.about;\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)(editPopup);\n  }).catch(function (err) {\n    console.error(err);\n  }).finally(function () {\n    setLoadingState(submitButton, false);\n  });\n});\nnewCardForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  var submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);\n  setLoadingState(submitButton, true);\n  var cardInfo = {\n    name: newCardNameInput.value,\n    link: linkInput.value\n  };\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.addNewCard)(cardInfo).then(function (createdCard) {\n    var cardElement = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_2__.createCard)(createdCard, _components_card_js__WEBPACK_IMPORTED_MODULE_2__.deleteCard, handleCardImageClick, _components_card_js__WEBPACK_IMPORTED_MODULE_2__.handleLikeClick);\n    if (cardElement) {\n      placesList.prepend(cardElement);\n      (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)(document.querySelector('.popup_type_new-card'));\n      newCardForm.reset();\n    }\n  }).catch(function (err) {\n    return console.error('Ошибка добавления карточки:', err);\n  }).finally(function () {\n    setLoadingState(submitButton, false);\n  });\n});\navatarForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  var submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);\n  setLoadingState(submitButton, true);\n  var newAvatarUrl = avatarInput.value;\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.updateAvatar)(newAvatarUrl).then(function (updatedUserData) {\n    profileImage.style.backgroundImage = \"url('\".concat(updatedUserData.avatar, \"')\");\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)(avatarPopup);\n  }).catch(function (err) {\n    console.error(err);\n  }).finally(function () {\n    setLoadingState(submitButton, false);\n  });\n});\nfunction setLoadingState(button, isLoading) {\n  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';\n}\n\n//# sourceURL=webpack://yandex_prakticum/./src/scripts/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex_prakticum/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;