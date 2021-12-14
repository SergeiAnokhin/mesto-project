// ПЕРЕМЕННЫЕ

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const popup = document.querySelector('.popup');
const editPopup = document.getElementById('popup_edit-profile');
const addPopup = document.getElementById('popup_add-element');
const imgPopup = document.getElementById('popup_element-image');
  
const popupImage = document.querySelector('.popup__image');
const popupPlaceName = document.querySelector('.popup__place-name');

const editProfileBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const profileNamePopup = editPopup.querySelector('[name="popup__profile-name"]');
const profileInfoPopup = editPopup.querySelector('[name="popup__profile-info"]');

const imgLink = addPopup.querySelector('[name="popup__image-link"]');
const placeName = addPopup.querySelector('[name="popup__place-name"]');

const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.elements__template').content;
const elementLike = document.querySelector('.element__like');

// ФУНКЦИИ

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие модального окна
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

// Закрытие модального окна через кнопку крестик
function closePopupBtn(popup) {
  popup.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popup);
  });
}

// Удаление карточки
function removeElement(element) {
    element.querySelector('.element__trash').addEventListener('click', () => {
    element.remove();
    });
}

// Лайк карточки
function likeElement(element) {
    const elementLike = element.querySelector('.element__like');
    elementLike.addEventListener('click', () => {
      if (elementLike.classList.contains('element__like_active')) {
        elementLike.classList.remove('element__like_active');
      } else {
        elementLike.classList.add('element__like_active');
      }
  }); 
}

// Модальное окно с картинкой и названием места
function viewImagePopup(element) {
  element.querySelector('.element__image').addEventListener('click', () => {
    popupImage.src = element.querySelector('.element__image').src;
    popupImage.alt = element.querySelector('.element__title').textContent;
    popupPlaceName.textContent = element.querySelector('.element__title').textContent;
    openPopup(imgPopup);
  });
}

// Функция создания карточки места
function createCard(placeName, imgUrl) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = imgUrl;
  card.querySelector('.element__image').alt = placeName;
  card.querySelector('.element__title').textContent = placeName;

  return card;
}

// Функция отправки данных из формы
function formSubmit(popup, func) {
  popup.querySelector('.popup__form').addEventListener('submit', func); 
}

// Добавление карточек при загрузки страницы
function addElements(arrCards) {
    arrCards.forEach((item) => {
      const cardElement = createCard(item.name, item.link);

      viewImagePopup(cardElement);
      likeElement(cardElement);
      removeElement(cardElement);

      elements.prepend(cardElement);
    });
    
}

// Отправка данных из формы редактирования профиля
function editProfileSubmit(evt) {
  evt.preventDefault();

    if (profileNamePopup.value !== '' && profileInfoPopup.value !== '') {
      profileName.textContent = profileNamePopup.value;
      profileInfo.textContent = profileInfoPopup.value;
      closePopup(editPopup);
    };
}

// Модальное окно редактирования профиля
function editProfilePopup() {

    profileNamePopup.value = profileName.textContent;
    profileInfoPopup.value = profileInfo.textContent;

    openPopup(editPopup);

    formSubmit(editPopup, editProfileSubmit);
}

// Отправка данных из формы добавления карточек
function addElementSubmit(evt) {
  evt.preventDefault();

  if (imgLink.value !== '' && placeName.value !== '') {
      const cardElement = createCard(placeName.value, imgLink.value);

      viewImagePopup(cardElement);
      likeElement(cardElement);
      removeElement(cardElement);
  
      elements.prepend(cardElement);

      closePopup(addPopup);
  };
}

// Модальное окно добавления карточек
function addElementPopup() {

  imgLink.value = '';
  placeName.value = '';

  openPopup(addPopup);

  formSubmit(addPopup, addElementSubmit);
}


// ВЫЗОВЫ ФУНКЦИЙ

// Вызов функции формирования карточек при загрузке страницы
addElements(initialCards);

// Вызов модального окна редактирования профиля
editProfileBtn.addEventListener('click', editProfilePopup);

// Вызов модального окна добавления карточек
addElementBtn.addEventListener('click', addElementPopup);

// Вызов функций закрытия модального окна через кнопку крестик
closePopupBtn(editPopup);
closePopupBtn(addPopup);
closePopupBtn(imgPopup);