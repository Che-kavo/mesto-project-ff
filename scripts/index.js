// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function createCard(cardInfo, deleteCallback) {

    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardInfo.name;  
    cardElement.querySelector('.card__image').src = cardInfo.link;          
    cardElement.querySelector('.card__image').alt = cardInfo.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

const placesList = document.querySelector('.places__list');

initialCards.forEach(cardInfo => {
    const cardElement = createCard(cardInfo, deleteCard);
    placesList.append(cardElement);
});











