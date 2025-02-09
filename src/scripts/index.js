// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from './components/cards.js';
import '../pages/index.css';
import { openModal, closeModal, setupPopupListeners } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';

const placesList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup_type_edit');
const formProfile = editPopup.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

initialCards.forEach(cardInfo => {
  addCard(cardInfo);
});

function addCard(cardInfo) {
  const cardElement = createCard(cardInfo, deleteCard);
  
  cardElement.querySelector('.card__image').addEventListener('click', (event) => {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupCaption.textContent = cardInfo.name;
    
    openModal(imagePopup);
  });
  
  placesList.append(cardElement);
}

document.querySelectorAll('.popup').forEach(popup => setupPopupListeners(popup));

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  const newCardPopup = document.querySelector('.popup_type_new-card');
  openModal(newCardPopup);
});

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cardInfo = {
    name: newCardNameInput.value,
    link: linkInput.value
  };

  const cardElement = createCard(cardInfo, deleteCard);
  placesList.prepend(cardElement);

  closeModal(document.querySelector('.popup_type_new-card'));

  newCardNameInput.value = '';
  linkInput.value = '';
});