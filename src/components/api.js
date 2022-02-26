import { addElements } from "./card";
import { addProfile } from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        addElements(result)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        addProfile(result)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
} 

export {config}