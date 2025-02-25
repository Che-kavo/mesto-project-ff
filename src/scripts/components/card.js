export function createCard(cardInfo, deleteCallback, handleImageClick, handleLikeClick) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardElement.querySelector('.card__image').src = cardInfo.link;
  cardElement.querySelector('.card__image').alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.addEventListener('click', () => {
    handleImageClick(cardInfo);
  });

  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
