import { deleteCardFromServer, handleLikeClick } from "./api.js";

export function createCard(cardInfo, currentUserId, handleImageClick, deleteCard, likeCard) {
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

  deleteCard(cardInfo, currentUserId, deleteButton, cardElement);

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo);
  });

  likeCard(cardInfo, currentUserId, likeButton, likeCounter);

  return cardElement;
}

export function deleteCard(cardInfo, currentUserId, deleteButton, cardElement) {
  if (!cardInfo || !deleteButton || !cardElement) return;

  if (cardInfo.owner && cardInfo.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      if (cardInfo._id) {
        deleteCardFromServer(cardInfo._id)
          .then(() => cardElement.remove())
          .catch(err => console.error('Ошибка удаления карточки', err));
      } else {
        console.error('Ошибка cardInfo._id не определён');
      }
    });
  }
}

export function likeCard(cardInfo, currentUserId, likeButton, likeCounter) {
  let isLiked = cardInfo.likes.some(like => like._id === currentUserId);
  let likeCount = cardInfo.likes.length;
  likeCounter.textContent = likeCount;

  function updateLikeButtonState() {
    likeButton.classList.toggle('card__like-button_is-active', isLiked);
  }

  updateLikeButtonState();

  likeButton.addEventListener('click', () => {
    handleLikeClick(cardInfo._id, isLiked)
      .then(updatedCardInfo => {
        isLiked = !isLiked;
        likeCount = updatedCardInfo.likes.length;
        likeCounter.textContent = likeCount || 0;
        updateLikeButtonState();
      })
      .catch(err => {
        console.error('Ошибка обновления лайков', err);
      });
  });
}