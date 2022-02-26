import { addElements, addElement } from "./card";
import { addProfile } from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}

let userId = '';

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
      // console.log(result)
      console.log(result.filter(item => {return item.owner._id === "ada2e669f5fc694dcb3dd0c1"}))
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
        userId = result._id
        addProfile(result)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const addCard = (name, link) => {
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
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        addElement(result)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

// export const deleteCard = () => {
//   return fetch(`${config.baseUrl}/cards/`, {
//     method: 'DELETE',
//     headers: config.headers,
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .then((result) => {
//         addElement(result)
//       })
//       .catch((err) => {
//         console.log(err); // выводим ошибку в консоль
//       }); 
// } 

export { config, userId }