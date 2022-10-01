import '../pages/index.css';

import { profileEditButton, addCardButton, formEditElement, formAddCardElement, popupEditProfile, profileTitleName, titleName, occupation, profileSubtitle, popupAddCard } from './variables.js';
import { openPopup } from './modal.js';
import { handleProfileFormSubmit, handleAddCardFormSubmit } from './formhandlers.js';
import { initialCards, createInitialCardsBlock } from './card.js';
import { enableValidation } from './validate.js';

//listeners for profile and addcard button
profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  titleName.value = profileTitleName.textContent;
  occupation.value = profileSubtitle.textContent;});
addCardButton.addEventListener('click', () => {openPopup(popupAddCard);});

//listeners for submit forms
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

//init default cards
createInitialCardsBlock(initialCards);

//connect validation
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
