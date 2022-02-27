import { addElements, addElement } from "./card";
import { addProfile, renderLoading, renderSave, buttonTextSave, buttonTextCreate } from "./utils";

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  },
  userId : ''
}

export const getProfile = new Promise ((resolve, reject) => {
  return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(res => {
        if (res.ok) {
          resolve(res.json())
        }
        reject(`Ошибка: ${res.status}`);
      })
})

export const getInitialCards = new Promise ((resolve, reject) => {
  return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
        .then(res => {
          if (res.ok) {
            resolve(res.json())
          }
          reject(`Ошибка: ${res.status}`);
        })
})

export const getAll = () => {
  Promise.all([getProfile, getInitialCards]).then(result => {
    addProfile(result[0])
    config.userId = result[0]._id
    addElements(result[1])
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => renderLoading());
} 

export const editProfile = (popup, name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        renderSave(popup, buttonTextSave, true)
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result
      })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderSave(popup, buttonTextSave, false))
}

export const editAvatar = (popup, avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(res => {
      if (res.ok) {
        renderSave(popup, buttonTextSave, true)
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
      })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
    .finally(() => renderSave(popup, buttonTextSave, false))
}

export const addCard = (popup, name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        renderSave(popup, buttonTextCreate, true)
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        addElement(result)
      })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
    .finally(() => renderSave(popup, buttonTextCreate, false))
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
} 

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}