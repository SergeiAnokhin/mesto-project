import '../pages/index.css';
import Api from '../components/Api1.js';
import Card from '../components/Card1.js';
import FormValidator from '../components/FormValidator1.js';
import Section from '../components/Section1.js';
import PopupWithImage from '../components/PopupWithImage1.js';
import PopupWithForm from '../components/PopupWithForm1.js';
import UserInfo from '../components/UserInfo1.js';
import { cardsContainer } from '../components/utils/constants';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}); 

api.getInitialCards()
.then(res => {
  res.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generate();
    cardsContainer.append(cardElement);
  })
})
.catch(err => {
  console.log('Ошибка получения карточек с сервера', err.message);
})




