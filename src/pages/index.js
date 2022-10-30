import '../pages/index.css';

import {
  profileAvatar, validationConfig, profileConfig, cardTemplate,
  elements, options, formChangeElement, profileButtonChange, profileEditButton,
  addCardButton, formEditElement, formAddCardElement, titleName, occupation,
  myId
} from '../components/variables.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

function createNewCard(item, cardTemplate) {
  const card = new Card({
    item: item,
    handleAddLike: (id, count, button) => {
      api.addLike(id)
        .then((item) => {
          console.log(card);
          card.redraw(item.likes.length, count, button, true);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleDelLike: (id, count, button) => {
      api.delLike(id)
        .then((item) => {
          card.redraw(item.likes.length, count, button, false);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleDeleteCard: (id) => {
      api.deleteCard(id)
        .then(() => {
          card.deleteCardElement();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleCardClick: () => {
      imagePopup.open(item);
    }
  },
    cardTemplate);

  return card;
}

const api = new Api(options);
const profile = new UserInfo(profileConfig);

//start
api.getData()
  .then(([profileData, cardsData]) => {
    myId.id = profileData._id;
    profileAvatar.src = profileData.avatar;
    profile.setUserInfo(profileData);
    const cardSection = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = createNewCard(item, cardTemplate);
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

//popup for image
const imagePopup = new PopupWithImage({ name: '', link: '' }, '.popup_type_image');

//listener to change avatar
profileButtonChange.addEventListener('click', () => {
  const validAvatar = new FormValidator(validationConfig, formChangeElement);
  validAvatar.enableValidation();

  const avatarForm = new PopupWithForm('.popup_type_change',
    (inputs) => {
      avatarForm.renderLoading("Сохранение...");
      api.changeAvatar(inputs['link-avatar'])
        .then((data) => {
          profileAvatar.src = data.avatar;
          validAvatar.disableButton();
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          avatarForm.renderLoading("Сохранить");
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
      profileForm.renderLoading("Сохранение...");
      api.editProfile([inputs['title-name'], inputs['occupation']])
        .then((data) => {
          profile.setUserInfo(data);
          validProfile.disableButton();
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          profileForm.renderLoading("Сохранить");
          profileForm.close();
        });
    })
  profileForm.open();
  const userData = profile.getUserInfo();
  titleName.value = userData.name;
  occupation.value = userData.about;
})

//listener to add new card
addCardButton.addEventListener('click', () => {
  const validCardForm = new FormValidator(validationConfig, formAddCardElement);
  validCardForm.enableValidation();

  const addCardPopup = new PopupWithForm('.popup_type_add',
    (inputs) => {
      addCardPopup.renderLoading("Сохранение...");
      api.addCardServer([inputs['title-card'], inputs['link-card']])
        .then((data) => {
          const card = createNewCard(data, cardTemplate);
          const cardElem = card.createCard(myId.id);
          elements.prepend(cardElem);
          validCardForm.disableButton();
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          addCardPopup.renderLoading("Сохранить");
          addCardPopup.close();
        });
    });

  addCardPopup.open();
});
