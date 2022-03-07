export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  },
}

// Обработка ответа от сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// Получение данных профиля с сервера
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(res => checkResponse(res))
}

// Получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(res => checkResponse(res))
}

// Отправка данных на сервер при редактировании профиля
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => checkResponse(res))
}

// Отправка данных на сервер при редактировании аватара
export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => checkResponse(res))
}

// Отправка данных на сервер при добавлении карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => checkResponse(res))
}

// Отправка данных на сервер при удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res))
} 

// Отправка данных на сервер при добавлении лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => checkResponse(res))
}

// Отправка данных на сервер при удалении лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res))
}