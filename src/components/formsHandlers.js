
import { closePopup } from "./modal.js";
//import { addCard } from "./card.js";
import { urlAvatar, titleCard, linkCard, elements, popupAddCard, titleName, occupation, profileTitleName, profileSubtitle, profileAvatar, popupEditProfile, formAddSubmitButton, myId, popupAvatar, formChangeSubmitButton } from "./variables.js";
//import { editProfile, addCardServer, changeAvatar } from './Api.js';

function createCardObject() {
  const card = {};
  card.name = titleCard.value;
  card.link = linkCard.value;
  return card;
}

// handler to submit edit profile
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  const body = {};
  body.name = titleName.value;
  body.about = occupation.value;

  editProfile(body)
    .then((data) => {
      profileTitleName.textContent = data.name;
      profileSubtitle.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.submitter, false);
    })
}

// handler to submit add card
export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  addCardServer(createCardObject())
    .then((data) => {
      addCard({ name: data.name, link: data.link, owner: data.owner, likes: data.likes, _id: data._id }, elements)
      evt.target.reset();
      formAddSubmitButton.classList.add('form__button-submit_inactive');
      formAddSubmitButton.disabled = true;
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.submitter, false);
    })
}

// export function handleChangeAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   renderLoading(evt.submitter, true);
//   const body = {};
//   body.avatar = urlAvatar.value;
//   changeAvatar(body)
//     .then((data) => {
//       profileAvatar.src = data.avatar;
//       evt.target.reset();
//       formChangeSubmitButton.classList.add('form__button-submit_inactive');
//       formChangeSubmitButton.disabled = true;
//       closePopup(popupAvatar);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(evt.submitter, false);
//     })
// }

// export function renderProfile(name, occupation, url) {
//   profileTitleName.textContent = name;
//   profileSubtitle.textContent = occupation;
//   profileAvatar.src = url;
// }

export function renderLoading(button, isLoading) {
  if(isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  }
}
