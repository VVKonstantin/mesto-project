import '../pages/index.css';

import { urlAvatar, profileConfig, cardTemplate, elements, options, formChangeElement, formChangeSubmitButton, profileButtonChange, popupAvatar, profileEditButton, addCardButton, formEditElement, formAddCardElement, popupEditProfile, profileTitleName, titleName, occupation, profileSubtitle, popupAddCard, myId } from './variables.js';
import { openPopup } from './modal.js';
import { handleProfileFormSubmit, handleAddCardFormSubmit, renderProfile } from './formsHandlers.js';
import { renderLoading } from './formsHandlers.js';
//import { createInitialCardsBlock } from './card.js';
// import { enableValidation } from './validate.js';
// import { getCards, getProfile } from './Api.js';

import { Api } from './Api.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { FormValidator } from './FormValidator.js';
import { UserInfo } from './UserInfo';

// popups and listeners to open
const profileEditPopup = new PopupWithForm('.popup_type_edit');
profileEditButton.addEventListener('click', () => {
  profileEditPopup.open();
  titleName.value = profileTitleName.textContent;
  occupation.value = profileSubtitle.textContent;
});

const addCardPopup = new PopupWithForm('.popup_type_add');
addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});

const changeAvatarPopup = new PopupWithForm('.popup_type_change');
profileButtonChange.addEventListener('click', () => {
  changeAvatarPopup.open();
});

const imagePopup = new PopupWithImage({name: '', link: ''}, '.popup_type_image');

const api = new Api(options);
const profile = new UserInfo(profileConfig);

//formChangeElement.addEventListener('submit', handleChangeAvatarFormSubmit);

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

api.getData()
  .then(([profileData, cardsData]) => {
    myId.id = profileData._id;
    profile.getUserInfo(profileData);
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
          handleCardClick: () => {
            imagePopup._name = item.name;
            imagePopup._link = item.link;
            imagePopup.open();
          }
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
