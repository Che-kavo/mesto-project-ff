import { deleteCardFromServer, handleLikeClick } from "./api.js";

export function createCard(cardInfo, currentUserId, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  setupDeleteButton(cardInfo, currentUserId, deleteButton, cardElement);
  setupLikeButton(cardInfo, currentUserId, likeButton, likeCounter);

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo);
  });

  return cardElement;
}

function setupDeleteButton(cardInfo, currentUserId, deleteButton, cardElement) {
  if (cardInfo.owner && cardInfo.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => deleteCard(cardInfo, cardElement));
  }
}

function deleteCard(cardInfo, cardElement) {
  if (cardInfo._id) {
    deleteCardFromServer(cardInfo._id)
      .then(() => cardElement.remove())
      .catch(err => console.error('Ошибка удаления карточки', err));
  } else {
    console.error('Ошибка cardInfo._id не определён');
  }
}

function setupLikeButton(cardInfo, currentUserId, likeButton, likeCounter) {
  updateLikeButtonState(cardInfo, currentUserId, likeButton, likeCounter);

  likeButton.addEventListener('click', () => likeCard(cardInfo, currentUserId, likeButton, likeCounter));
}

function updateLikeButtonState(cardInfo, currentUserId, likeButton, likeCounter) {
  const isLiked = cardInfo.likes.some(like => like._id === currentUserId);
  likeCounter.textContent = cardInfo.likes.length;
  likeButton.classList.toggle('card__like-button_is-active', isLiked);
}

function likeCard(cardInfo, currentUserId, likeButton, likeCounter) {
  const isLiked = cardInfo.likes.some(like => like._id === currentUserId);

  handleLikeClick(cardInfo._id, isLiked)
    .then(updatedCardInfo => {
      cardInfo.likes = updatedCardInfo.likes; 
      updateLikeButtonState(updatedCardInfo, currentUserId, likeButton, likeCounter); 
    })
    .catch(err => {
      console.error('Ошибка обновления лайков', err);
    });
}