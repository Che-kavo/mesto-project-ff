(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"f242107a-6a11-4c21-ac69-65ef4e378d36","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}function c(e){e.target.classList.contains("popup_is-opened")&&n(e.currentTarget)}function a(e,t,r,n,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter");return u.textContent=e.name,a.src=e.link,a.alt=e.name,n(e,t,i,c),a.addEventListener("click",(function(){r(e)})),o(e,t,l,s),c}function u(r,n,o,c){r&&o&&c&&(r.owner&&r.owner._id!==n?o.remove():o.addEventListener("click",(function(){var n;r._id?(n=r._id,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)).then((function(){return c.remove()})).catch((function(e){return console.error("Ошибка удаления карточки",e)})):console.error("Ошибка cardInfo._id не определён")})))}function i(r,n,o,c){var a=r.likes.some((function(e){return e._id===n})),u=r.likes.length;function i(){o.classList.toggle("card__like-button_is-active",a)}c.textContent=u,i(),o.addEventListener("click",(function(){(function(r,n){var o=n?"DELETE":"PUT";return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:o,headers:e.headers}).then(t)})(r._id,a).then((function(e){a=!a,u=e.likes.length,c.textContent=u||0,i()})).catch((function(e){console.error("Ошибка обновления лайков",e)}))}))}function l(e,t){var r=e.form.querySelector(".".concat(e.name,"-error"));e.classList.remove(t.inputErrorClass),r.classList.remove(t.errorClass),r.textContent=""}function s(e,t,r){var n=e.every((function(e){return e.validity.valid}));t.disabled=!n,t.classList.toggle(r,!n)}function p(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(e){l(e,t)})),s(r,n,t.inactiveButtonClass)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){var t=document.querySelectorAll(e.formSelector);Array.from(t).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);s(r,n,t.inactiveButtonClass),r.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?l(e,t):function(e,t){var r=e.form.querySelector(".".concat(e.name,"-error"));e.classList.add(t.inputErrorClass),r.textContent=e.validationMessage,r.classList.add(t.errorClass)}(e,t)}(e,t),s(r,n,t.inactiveButtonClass)}))}))}(t,e)}))}(f);var _=document.querySelector(".places__list"),m=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),v=document.querySelector(".popup_type_edit"),h=v.querySelector(".popup__form"),S=h.querySelector(".popup__input_type_name"),b=h.querySelector(".popup__input_type_description"),q=document.querySelector(".popup_type_new-card .popup__form"),g=document.querySelector(".popup_type_new-card"),E=q.querySelector(".popup__input_type_card-name"),C=q.querySelector(".popup__input_type_url"),L=document.querySelector(".popup_type_new-image"),k=L.querySelector(".popup__form"),A=k.querySelector(".popup__input_type_url"),x=document.querySelector(".profile__image"),w=null;function U(e){var t=document.querySelector(".popup_type_image"),n=t.querySelector(".popup__image"),o=t.querySelector(".popup__caption");n.src=e.link,n.alt=e.name,o.textContent=e.name,r(t)}function B(e,t){e.textContent=t?"Сохранение...":"Сохранить"}document.querySelector(".profile__change-image-button").addEventListener("click",(function(){p(k,f),A.value="",r(L)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){p(h,f),S.value=m.textContent,b.value=y.textContent,r(v)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){q.reset(),p(q,f),r(g)})),document.querySelectorAll(".popup").forEach((function(e){return function(e){e.addEventListener("mousedown",c);var t=e.querySelector(".popup__close");t&&t.addEventListener("click",(function(){return n(e)})),e.classList.add(".popup_is-animated")}(e)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];w=o._id,m.textContent=o.name,y.textContent=o.about,x.style.backgroundImage="url('".concat(o.avatar,"')"),c.forEach((function(e){!function(e){var t=a(e,w,U,u,i);t?_.append(t):console.error("Не удалось создать карточку из:",e)}(e)}))})).catch((function(e){return console.error(e)})),h.addEventListener("submit",(function(r){r.preventDefault();var o,c=h.querySelector(f.submitButtonSelector);B(c,!0),(o={name:S.value,about:b.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(o)}).then(t)).then((function(e){m.textContent=e.name,y.textContent=e.about,n(v),h.reset()})).catch((function(e){console.error(e)})).finally((function(){B(c,!1)}))})),q.addEventListener("submit",(function(r){r.preventDefault();var o,c=q.querySelector(f.submitButtonSelector);B(c,!0),(o={name:E.value,link:C.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(o)}).then(t)).then((function(e){var t=a(e,w,U,u,i);t&&(_.prepend(t),n(g),q.reset())})).catch((function(e){return console.error("Ошибка добавления карточки:",e)})).finally((function(){B(c,!1)}))})),k.addEventListener("submit",(function(r){r.preventDefault();var o,c=k.querySelector(f.submitButtonSelector);B(c,!0),(o=A.value,console.log("Отправляем URL аватара:",o),fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){x.style.backgroundImage="url('".concat(e.avatar,"')"),n(L),k.reset()})).catch((function(e){console.error(e)})).finally((function(){B(c,!1)}))}))})();