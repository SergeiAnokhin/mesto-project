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

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const editProfileBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const editPopup = document.getElementById('popup_edit-profile');
const addPopup = document.getElementById('popup_add-element');
const imgPopup = document.getElementById('popup_element-image');

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
    document.querySelector('.popup__image').src = element.querySelector('.element__image').src;
    document.querySelector('.popup__image').alt = element.querySelector('.element__title').textContent;
    document.querySelector('.popup__place-name').textContent = element.querySelector('.element__title').textContent;
    openPopup(imgPopup);
  });
  const popupCloseBtn = imgPopup.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', () => {
      closePopup(imgPopup);
    });
}

// Добавление карточек при загрузки страницы
function addElements() {
    initialCards.forEach((item) => {
        const cloneElement = templateElement.querySelector('.element').cloneNode(true);
        cloneElement.querySelector('.element__image').src = item.link;
        cloneElement.querySelector('.element__image').alt = item.name;
        cloneElement.querySelector('.element__title').textContent = item.name;
        
        elements.append(cloneElement);
        viewImagePopup(cloneElement);
        likeElement(cloneElement);
        removeElement(cloneElement);
    });
}

// Отправка данных из формы редактирования профиля
function editProfileSubmit(evt) {
  evt.preventDefault(); 

  const profileNamePopup = editPopup.querySelector('[name="popup__profile-name"]').value;
  const profileInfoPopup = editPopup.querySelector('[name="popup__profile-info"]').value;

    if (profileNamePopup !== '' && profileInfoPopup !== ''){
      profileName.textContent = profileNamePopup;
      profileInfo.textContent = profileInfoPopup;
      closePopup(editPopup);
    };
}

// Модальное окно редактирования профиля
function editProfilePopup() {

    editPopup.querySelector('[name="popup__profile-name"]').value = profileName.textContent;
    editPopup.querySelector('[name="popup__profile-info"]').value = profileInfo.textContent;

    openPopup(editPopup);

    const popupCloseBtn = editPopup.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', () => {
      closePopup(editPopup);
    });

    const popupForm = editPopup.querySelector('.popup__form');
    popupForm.addEventListener('submit', editProfileSubmit); 
}

// Отправка данных из формы добавления карточек
function addElementSubmit(evt) {
  evt.preventDefault();

  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  let imgLink = addPopup.querySelector('[name="popup__image-link"]').value;
  let placeName = addPopup.querySelector('[name="popup__place-name"]').value;

  if (imgLink !== '' && placeName !== '') {
      cloneElement.querySelector('.element__image').src = imgLink;
      cloneElement.querySelector('.element__image').alt = placeName;
      cloneElement.querySelector('.element__title').textContent = placeName;
  
      elements.prepend(cloneElement);
      viewImagePopup(cloneElement);
      likeElement(cloneElement);
      removeElement(cloneElement);
      closePopup(addPopup);
  };
}

// Модальное окно добавления карточек
function addElementPopup() {

  addPopup.querySelector('[name="popup__image-link"]').value = '';
  addPopup.querySelector('[name="popup__place-name"]').value = '';

  openPopup(addPopup);

    addPopup.querySelector('.popup__close').addEventListener('click', () => {
      closePopup(addPopup);
    });

    const popupForm = addPopup.querySelector('.popup__form');
    popupForm.addEventListener('submit', addElementSubmit); 
}


// ВЫЗОВЫ ФУНКЦИЙ

// Вызов функции формирования карточек при загрузке страницы
addElements();

// Вызов модального окна редактирования профиля
editProfileBtn.addEventListener('click', editProfilePopup);

// Вызов модального окна добавления карточек
addElementBtn.addEventListener('click', addElementPopup);




