import '../pages/index.css';

import { options, formChangeElement, urlAvatar, formChangeSubmitButton, profileButtonChange, popupAvatar, profileEditButton, addCardButton, formEditElement, formAddCardElement, popupEditProfile, profileTitleName, titleName, occupation, profileSubtitle, popupAddCard, myId } from './variables.js';
// import { openPopup } from './modal.js';
import { handleProfileFormSubmit, handleAddCardFormSubmit, renderProfile, handleChangeAvatarFormSubmit } from './formsHandlers.js';
import { createInitialCardsBlock } from './card.js';
// import { enableValidation } from './validate.js';
// import { getCards, getProfile } from './Api.js';

import { Api } from './Api.js';

// //listeners for profile and addcard button
// profileButtonChange.addEventListener('click', () => {
//   openPopup(popupAvatar);
// })

// profileEditButton.addEventListener('click', () => {
//   openPopup(popupEditProfile);
//   titleName.value = profileTitleName.textContent;
//   occupation.value = profileSubtitle.textContent;
// });
// addCardButton.addEventListener('click', () => { openPopup(popupAddCard); });

// //listeners for submit forms
// formEditElement.addEventListener('submit', handleProfileFormSubmit);
// formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);
// formChangeElement.addEventListener('submit', handleChangeAvatarFormSubmit);

// //connect validation
// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__button-submit',
//   inactiveButtonClass: 'form__button-submit_inactive',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__input-error_active'
// });

const api = new Api(options);

api.getData()
  .then(([profileData, cardsData]) => {
    myId.id = profileData._id;
    renderProfile(profileData.name, profileData.about, profileData.avatar);
    createInitialCardsBlock(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
