export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;      
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
    }
  
    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this._checkResponse(res))
    }
  
    editAvatar(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink
        })
      })
      .then(res => this._checkResponse(res))
    }
  
    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._checkResponse(res))
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
    
    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
  
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
    }
  }
