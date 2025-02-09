export function createCard(cardInfo, deleteCallback ) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardElement.querySelector('.card__image').src = cardInfo.link;
  cardElement.querySelector('.card__image').alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
