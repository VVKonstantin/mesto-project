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

//to create new card
function createNewCard(item, cardTemplate) {
  const card = new Card({
    item: item,
    handleAddLike: (id, count, button) => {
      api.addLike(id)
        .then((item) => {
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

//global variables
const api = new Api(options);
const profile = new UserInfo(profileConfig);
const validAvatar = new FormValidator(validationConfig, formChangeElement);
validAvatar.enableValidation();
const validProfile = new FormValidator(validationConfig, formEditElement);
validProfile.enableValidation();
const validCardForm = new FormValidator(validationConfig, formAddCardElement);
validCardForm.enableValidation();

const cardSection = new Section({
  renderer: (item) => {
    const card = createNewCard(item, cardTemplate);
    const cardElem = card.createCard(myId.id);
    cardSection.addItem(cardElem);
  }
},
  elements
)

//popups
const imagePopup = new PopupWithImage('.popup_type_image');
const avatarForm = new PopupWithForm('.popup_type_change',
  (inputs) => {
    avatarForm.renderLoading("Сохранение...");
    api.changeAvatar(inputs['link-avatar'])
      .then((data) => {
        profileAvatar.src = data.avatar;
        validAvatar.disableButton();
        avatarForm.close();
      })
      .catch((err) => { console.log(err); })
      .finally(() => {
        avatarForm.renderLoading("Сохранить");
      });
  })

const profileForm = new PopupWithForm('.popup_type_edit',
  (inputs) => {
    profileForm.renderLoading("Сохранение...");
    api.editProfile([inputs['title-name'], inputs['occupation']])
      .then((data) => {
        profile.setUserInfo(data);
        validProfile.disableButton();
        profileForm.close();
      })
      .catch((err) => { console.log(err); })
      .finally(() => {
        profileForm.renderLoading("Сохранить");
      });
  })

const addCardPopup = new PopupWithForm('.popup_type_add',
  (inputs) => {
    addCardPopup.renderLoading("Сохранение...");
    api.addCardServer([inputs['title-card'], inputs['link-card']])
      .then((data) => {
        const card = createNewCard(data, cardTemplate);
        const cardElem = card.createCard(myId.id);
        cardSection.addItemAhead(cardElem);
        validCardForm.disableButton();
        addCardPopup.close();
      })
      .catch((err) => { console.log(err); })
      .finally(() => {
        addCardPopup.renderLoading("Сохранить");
      });
  })

//start
api.getData()
  .then(([profileData, cardsData]) => {
    myId.id = profileData._id;
    profileAvatar.src = profileData.avatar;
    profile.setUserInfo(profileData);
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//listener to change avatar
profileButtonChange.addEventListener('click', () => {
  avatarForm.open();
})

//listener to update profile info
profileEditButton.addEventListener('click', () => {
  profileForm.open();
  const userData = profile.getUserInfo();
  titleName.value = userData.name;
  occupation.value = userData.about;
})

//listener to add new card
addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});
