import { deleteCardFromServer, config } from './api.js';

export function createCard(cardInfo, deleteCallback, handleImageClick, handleLikeClick) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  const currentUserId = 'af5c7ab0a829d02dcb5d9835';
  cardTitle.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  if (cardInfo.owner && cardInfo.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      if (cardInfo._id) {
        deleteCard(cardInfo._id, cardElement, deleteCallback);
      } else {
        console.error('Ошибка cardInfo._id не определён');
      }
    });
  }

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo);
  });

  let isLiked = cardInfo.likes.some(like => like._id === currentUserId);
  let likeCount = cardInfo.likes.length;
  likeCounter.textContent = likeCount;

  updateLikeButtonState();

  likeButton.addEventListener('click', () => {
    handleLikeClick(cardInfo._id, isLiked)
      .then(updatedCardInfo => {
        isLiked = updatedCardInfo.likes.some(like => like._id === currentUserId); 
        likeCount = updatedCardInfo.likes.length; 
        likeCounter.textContent = likeCount || 0;
        updateLikeButtonState();
      })
      .catch(err => console.error('Ошибка обновления лайков:', err));
  });

  function updateLikeButtonState() {
    likeButton.classList.toggle('card__like-button_is-active', isLiked);
  }

  return cardElement;
}

export function deleteCard(cardId, cardElement, deleteCallback) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      deleteCallback();
    })
    .catch(err => console.error('Ошибка удаления карточки:', err));
}

export function handleLikeClick(cardId, isLiked) {
  const method = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json(); 
    })
    .catch(error => {
      console.error('Ошибка при обновлении лайков:', error);
      return Promise.reject(error);
    });
}
