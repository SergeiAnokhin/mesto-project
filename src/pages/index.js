import '../pages/index.css';
import Api from '../components/Api1.js';
import Card from '../components/Card1.js';
import FormValidator from '../components/FormValidator1.js';
import Section from '../components/Section1.js';
import PopupWithImage from '../components/PopupWithImage1.js';
import PopupWithForm from '../components/PopupWithForm1.js';
import UserInfo from '../components/UserInfo1.js';
import { cardListSection, selectors } from '../components/utils/constants';
import Popup from '../components/Popup1';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'a34ef1b9-3d1d-4a73-a9bd-379580b0d476',
    'Content-Type': 'application/json'
  }
}); 

const user = new UserInfo(selectors)

Promise.all([user.getUserInfo(api), api.getInitialCards()])
.then(res => {
console.log(res)
const cardsList = new Section({
      items: res[1],
      renderer: (cardItem) => {
        const card = new Card(cardItem, '.elements__template_type_card');
        const cardElement = card.generate();
        cardsList.addItem(cardElement);
      },
    },
    cardListSection); 
    cardsList.renderItems(); 
})
.catch(err => {
    console.log('Ошибка получения данных с сервера', err.message);
})

// const popup = new Popup('#popup_edit-profile');

// popup.setEventListeners()