import '../pages/index.css';

import { cardTemplate, elements, options, formChangeElement, urlAvatar, formChangeSubmitButton, profileButtonChange, popupAvatar, profileEditButton, addCardButton, formEditElement, formAddCardElement, popupEditProfile, profileTitleName, titleName, occupation, profileSubtitle, popupAddCard, myId } from './variables.js';
import { openPopup } from './modal.js';
import { handleProfileFormSubmit, handleAddCardFormSubmit, renderProfile, handleChangeAvatarFormSubmit } from './formsHandlers.js';
//import { createInitialCardsBlock } from './card.js';
// import { enableValidation } from './validate.js';
// import { getCards, getProfile } from './Api.js';

import { Api } from './Api.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// //listeners for profile and addcard button
// profileButtonChange.addEventListener('click', () => {
//   openPopup(popupAvatar);
// })

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  titleName.value = profileTitleName.textContent;
  occupation.value = profileSubtitle.textContent;
});
//addCardButton.addEventListener('click', () => { openPopup(popupAddCard); });

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
    //попробуем нарисовать карточки
      const cardSection = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card({
          item: item,
          handleAddLike: (id, count, button) => {
              api.addLike(id)
              .then((item) => {
                count.textContent = item.likes.length;
                button.classList.add('element__button-like_active');
              })
              .catch((err) => {
                console.log(err);
              })
          },
          handleDelLike: (id, count, button) => {
            api.delLike(id)
            .then((item) => {
              count.textContent = item.likes.length;
              button.classList.remove('element__button-like_active');
            })
            .catch((err) => {
              console.log(err);
            })
          },
          handleDeleteCard: () => {},
          handleCardClick: () => {}
        },
        cardTemplate);
        const cardElem = card.createCard(myId.id);
        cardSection.addItem(cardElem);
        },
      },
      elements
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const form = document.querySelector('.form');
//console.log(form);
const validateForm = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }, form);

  validateForm.enableValidation();
