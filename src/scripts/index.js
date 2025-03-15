import { fetchUserData, fetchInitialCards, updateUserData, addNewCard, updateAvatar } from "./components/api.js";
import { openModal, closeModal, setupPopupListeners } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import "../pages/index.css";

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const placesList = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editPopup = document.querySelector(".popup_type_edit");
const formProfile = editPopup.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const descriptionInput = formProfile.querySelector(".popup__input_type_description");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const linkInput = newCardForm.querySelector(".popup__input_type_url");
const avatarPopup = document.querySelector(".popup_type_new-image");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");
const profileImage = document.querySelector(".profile__image");
let currentUserId = null;

document.querySelector(".profile__change-image-button").addEventListener("click", () => {
    clearValidation(avatarForm, validationConfig);
    avatarInput.value = "";
    openModal(avatarPopup);
});

document.querySelector(".profile__edit-button").addEventListener("click", () => {
    clearValidation(formProfile, validationConfig);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editPopup);
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    openModal(newCardPopup);
});

function handleImageClick(cardInfo) {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");
    popupImage.src = cardInfo.link;
    popupImage.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
    openModal(imagePopup);
}

document.querySelectorAll(".popup").forEach((popup) => setupPopupListeners(popup));

Promise.all([fetchUserData(), fetchInitialCards()])
    .then(([userData, cards]) => {
        currentUserId = userData._id;
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;
        cards.forEach((cardInfo) => {
            addCard(cardInfo);
        });
    })

    .catch((err) => console.error(err));

function addCard(cardInfo) {
    const cardElement = createCard(cardInfo, currentUserId, handleImageClick, deleteCard, likeCard);
    if (cardElement) {
        placesList.append(cardElement);
    } else {
        console.error("Не удалось создать карточку из:", cardInfo);
    }
}

formProfile.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = formProfile.querySelector(validationConfig.submitButtonSelector);
    setLoadingState(submitButton, true);
    const newUserData = {
        name: nameInput.value,
        about: descriptionInput.value,
    };

    updateUserData(newUserData)
        .then((updatedUserData) => {
            profileName.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
            closeModal(editPopup);
            formProfile.reset();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoadingState(submitButton, false);
        });
});

newCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);
    setLoadingState(submitButton, true);

    const cardInfo = {
        name: newCardNameInput.value,
        link: linkInput.value,
    };

addNewCard(cardInfo)
        .then((cardInfo) => {
            const cardElement = createCard(cardInfo, currentUserId, handleImageClick, deleteCard, likeCard);
            if (cardElement) {
                placesList.prepend(cardElement);
                closeModal(newCardPopup);
                newCardForm.reset();
            }
        })
        .catch((err) => console.error("Ошибка добавления карточки:", err))
        .finally(() => {
            setLoadingState(submitButton, false);
        });
});

avatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);
    setLoadingState(submitButton, true);
    const newAvatarUrl = avatarInput.value;
    updateAvatar(newAvatarUrl)
        .then((updatedUserData) => {
            profileImage.style.backgroundImage = `url('${updatedUserData.avatar}')`;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoadingState(submitButton, false);
        });
});

function setLoadingState(button, isLoading) {
    button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}