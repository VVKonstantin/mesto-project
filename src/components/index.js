import '../pages/index.css';

import { urlAvatar, formAddSubmitButton, profileAvatar, validationConfig, profileConfig, cardTemplate, elements, options, formChangeElement, formChangeSubmitButton, profileButtonChange, popupAvatar, profileEditButton, addCardButton, formEditElement, formAddCardElement, popupEditProfile, profileTitleName, titleName, occupation, profileSubtitle, popupAddCard, myId } from './variables.js';
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
//import { concat } from 'core-js/core/array';

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
    profileAvatar.src = profileData.avatar;
    profile.setUserInfo(profileData);
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
          handleDeleteCard: (id, card) => {
            api.deleteCard(id)
            .then(() => {
              card.remove();
            })
            .catch((err) => {
              console.log(err);
            })
          },
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


// popups and listeners to open
// const changeAvatarPopup = new PopupWithForm('.popup_type_change');
// profileButtonChange.addEventListener('click', () => {
//   changeAvatarPopup.open();
// });

const imagePopup = new PopupWithImage({name: '', link: ''}, '.popup_type_image');

//listener to change avatar
profileButtonChange.addEventListener('click', () => {
  const validAvatar = new FormValidator(validationConfig, formChangeElement);
  validAvatar.enableValidation();

  const avatarForm = new PopupWithForm('.popup_type_change',
    (inputs) => {
      renderLoading(formChangeSubmitButton, true);
      api.changeAvatar(inputs['link-avatar'])
        .then((data) => {
          profileAvatar.src = data.avatar;
          formChangeSubmitButton.classList.add('form__button-submit_inactive');
          formChangeSubmitButton.disabled = true;
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          renderLoading(formChangeSubmitButton, false);
          avatarForm.close();
        });
    });
  avatarForm.open();
})

//listener to update profile info
profileEditButton.addEventListener('click', () => {
  const validProfile = new FormValidator(validationConfig, formEditElement);
  validProfile.enableValidation();

  const profileForm = new PopupWithForm('.popup_type_edit',
    (inputs) => {
      renderLoading(formAddSubmitButton, true);
      api.editProfile([inputs['title-name'], inputs['occupation']])
      .then((data) => {
        profile.setUserInfo(data);
        formAddSubmitButton.classList.add('form__button-submit_inactive');
        formAddSubmitButton.disabled = true;
      })
      .catch((err) => { console.log(err); })
      .finally(() => {
        renderLoading(formAddSubmitButton, false);
        profileForm.close();
      });
    })
  profileForm.open();
  titleName.value = profile.getUserInfo().name;
  occupation.value = profile.getUserInfo().about;
})


// const profileEditPopup = new PopupWithForm('.popup_type_edit');
// profileEditButton.addEventListener('click', () => {
//   profileEditPopup.open();
//   titleName.value = profileTitleName.textContent;
//   occupation.value = profileSubtitle.textContent;
// });



//listener to add new card
addCardButton.addEventListener('click', () => {
  const validCardForm = new FormValidator(validationConfig, formAddCardElement);
  validCardForm.enableValidation();

  const addCardPopup = new PopupWithForm('.popup_type_add',
    (inputs) => {
      renderLoading(formAddSubmitButton, true);
      api.addCardServer([inputs['title-card'], inputs['link-card']])
        .then((data) => {
          const card = new Card({
            item: data,
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
            handleDeleteCard: (id, card) => {
              api.deleteCard(id)
                .then(() => {
                  card.remove();
                })
                .catch((err) => {
                  console.log(err);
                })
            },
            handleCardClick: () => {
              console.log(imagePopup);
              imagePopup._name = data.name;
              imagePopup._link = data.link;
              imagePopup.open();
            }
          },
            cardTemplate);
          const cardElem = card.createCard(myId.id);
          elements.prepend(cardElem);
          formAddSubmitButton.classList.add('form__button-submit_inactive');
          formAddSubmitButton.disabled = true;
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          renderLoading(formAddSubmitButton, false);
          addCardPopup.close();
        });
    });

  addCardPopup.open();
});
