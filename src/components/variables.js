export const myId = {};

export const closeButtons = document.querySelectorAll('.popup__button-close');
export const cardTemplate = document.querySelector('#card-template').content;
export const elements = document.querySelector('.elements');

export const profileTitleName = document.querySelector('.profile__title-name');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileButtonChange = document.querySelector('.profile__button-change');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileEditButton = document.querySelector('.profile__button-edit');

export const popupAvatar = document.querySelector('.popup_type_change');
export const formChangeElement = popupAvatar.querySelector('.form');
export const urlAvatar = popupAvatar.querySelector('.form__input_type_link-avatar');
export const formChangeSubmitButton = document.querySelector('#change-button');

export const popupEditProfile = document.querySelector('.popup_type_edit');
export const formEditElement = popupEditProfile.querySelector('.form');
export const titleName = popupEditProfile.querySelector('.form__input_type_title-name');
export const occupation = popupEditProfile.querySelector('.form__input_type_occupation');
export const formAddSubmitButton = document.querySelector('#add-button');

export const addCardButton = document.querySelector('.profile__button-add');

export const popupAddCard = document.querySelector('.popup_type_add');
export const formAddCardElement = popupAddCard.querySelector('.form');
export const titleCard = popupAddCard.querySelector('.form__input_type_title-card');
export const linkCard = popupAddCard.querySelector('.form__input_type_link-card');

export const popupImage = document.querySelector('.popup_type_image');
export const imageInPopup = popupImage.querySelector('.popup__image');
export const captionImage = popupImage.querySelector('.popup__image-subtitle');

export const popups = document.querySelectorAll('.popup');

export const options = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15/',
  headers: {
    authorization: '9e001846-a8d2-4f41-9753-96fcc2007821',
    'Content-Type': 'application/json',
  }
}

export const profileConfig = {
  userNameSelector: '.profile__title-name',
  userAboutSelector: '.profile__subtitle'
}

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
