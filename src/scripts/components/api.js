export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
  headers: {
      authorization: 'f242107a-6a11-4c21-ac69-65ef4e378d36',
      'Content-Type': 'application/json'
  }
};

export function fetchUserData() {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
      .then(checkResponse);
}

export function fetchInitialCards() {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
      .then(checkResponse);
}

export function updateUserData(newData) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(newData)
  }).then(checkResponse);
}

export function addNewCard(cardInfo) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(cardInfo)
  }).then(checkResponse);
}

export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  }).then(checkResponse);
}

export function updateAvatar(avatarUrl) {
  console.log('Отправляем URL аватара:', avatarUrl);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl })
  })
  .then((response) => {
      console.log('Ответ сервера:', response);
      return checkResponse(response);
  })
  .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
  });
}

export function checkResponse(response) {
  if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}
