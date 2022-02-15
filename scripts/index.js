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

const editPopup = document.querySelector('#popup_edit-profile');
const addPopup = document.querySelector('#popup_add-element');
const imgPopup = document.querySelector('#popup_element-image');
const avatarPopup = document.querySelector('#popup_edit-avatar');

const forms = document.forms;
  
const popupImage = document.querySelector('.popup__image');
const popupPlaceName = document.querySelector('.popup__place-name');

const editProfileBtn = document.querySelector('.profile__edit-button');
const addElementBtn = document.querySelector('.profile__add-button');

const avatarImg = document.querySelector('.profile__avatar-img');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const avatarLinkPopup = avatarPopup.querySelector('[name="avatar-link"]');
const profileNamePopup = editPopup.querySelector('[name="profile-name"]');
const profileInfoPopup = editPopup.querySelector('[name="profile-info"]');

const imgLink = addPopup.querySelector('[name="image-link"]');
const placeName = addPopup.querySelector('[name="place-name"]');

const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.elements__template').content;
const elementLike = document.querySelector('.element__like');

// ФУНКЦИИ

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');

  if (popup.querySelector('form')) {
    const form = popup.querySelector('form');
    const inputList = Array.from(popup.querySelectorAll('.form__input'));
    const buttonElement = popup.querySelector('button')

    inputList.forEach(input => {
      if (input.value !== '') {
        isValid(form, input);
      } else {
        input.classList.remove('form__input_type_error')
        popup.querySelector(`.${input.id}-error`).textContent = '';
      }
    })
  
    hasInvalidInput(inputList);
    toggleButtonState(inputList, buttonElement);
  } 

}

// Закрытие модального окна
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

// Закрытие модального окна через кнопку крестик
// function closePopupBtn(popup) {
//   popup.querySelector('.popup__close').addEventListener('click', () => {
//     closePopup(popup);
//   });
// }

// ===========================

function closePopupEvents(popup) {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
    else {
      return
    }
  });
  popup.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popup);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup)
    }
  })
}

// closePop(addPopup)
// closePop(editPopup)
// closePop(imgPopup)

// function closePopupEsc(popup) {
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//       closePopup(popup)
//     }
//   })
// }

// closePopupEsc(addPopup)
// closePopupEsc(editPopup)
// closePopupEsc(imgPopup)

// ===========================

// Функция создания карточки места
function createCard(placeName, imgUrl) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = imgUrl;
  card.querySelector('.element__image').alt = placeName;
  card.querySelector('.element__title').textContent = placeName;

  card.querySelector('.element__trash').addEventListener('click', () => {
    card.remove();
  });

  const elementLike = card.querySelector('.element__like');
    elementLike.addEventListener('click', () => {
      if (elementLike.classList.contains('element__like_active')) {
        elementLike.classList.remove('element__like_active');
      } else {
        elementLike.classList.add('element__like_active');
      }
  });

  card.querySelector('.element__image').addEventListener('click', () => {
    popupImage.src = card.querySelector('.element__image').src;
    popupImage.alt = card.querySelector('.element__title').textContent;
    popupPlaceName.textContent = card.querySelector('.element__title').textContent;
    openPopup(imgPopup);
  });

  return card;
}

// Функция отправки данных из формы
function submitForm(popup, func) {
  popup.querySelector('.form').addEventListener('submit', func); 
}

// Добавление карточек при загрузки страницы
function addElements(arrCards) {
    arrCards.forEach((item) => {
      const cardElement = createCard(item.name, item.link);
      elements.prepend(cardElement);
    });
    
}

// Добавление данных из формы редактирования профиля
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
}

// Добавление данных из формы редактирования аватара
function editAvatarSubmit(evt) {
    evt.preventDefault();
    avatarImg.src = avatarLinkPopup.value;
    closePopup(avatarPopup);
}

// Модальное окно редактирования аватара
function editAvatarPopup() {
  
  openPopup(avatarPopup);
}

// Добавление данных из формы добавления карточек
function addElementSubmit(evt) {
  evt.preventDefault();
  if (imgLink.value !== '' && placeName.value !== '') {
      const cardElement = createCard(placeName.value, imgLink.value);
      elements.prepend(cardElement);
      closePopup(addPopup);
  };
}

// Модальное окно добавления карточек
function addElementPopup() {
  imgLink.value = '';
  placeName.value = '';
  openPopup(addPopup);
}

// ВАЛИДАЦИЯ ФОРМ

const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}; 

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
 
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });

}; 

const enableValidation = () => {

  const formList = Array.from(forms);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });

};

enableValidation(); 

// ВЫЗОВЫ ФУНКЦИЙ

// Вызов функции формирования карточек при загрузке страницы
addElements(initialCards);

// Вызов модального окна редактирования профиля
editProfileBtn.addEventListener('click', editProfilePopup);

// Вызов модального окна добавления карточек
addElementBtn.addEventListener('click', addElementPopup);

// Вызов функций закрытия модального окна через кнопку крестик
closePopupEvents(editPopup);
closePopupEvents(addPopup);
closePopupEvents(imgPopup);
closePopupEvents(avatarPopup);

// Отправка данных из формы редактирования профиля
submitForm(editPopup, editProfileSubmit);

// Отправка данных из формы добавления карточек
submitForm(addPopup, addElementSubmit);


avatarImg.addEventListener('click', editAvatarPopup)
submitForm(avatarPopup, editAvatarSubmit)