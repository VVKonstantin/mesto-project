
import { closePopup } from "./modal.js";
import { addCard } from "./card.js";
import { titleCard, linkCard, elements, popupAddCard, titleName, occupation, profileTitleName, profileSubtitle, popupEditProfile, formAddSubmitButton } from "./variables.js";


function createCardObject() {
  const card = {};
  card.name = titleCard.value;
  card.link = linkCard.value;
  return card;
}

// handler to submit edit profile
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = titleName.value;
  profileSubtitle.textContent = occupation.value;
  closePopup(popupEditProfile);
}

// handler to submit add card
export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(createCardObject(), elements);
  titleCard.value = '';
  linkCard.value = '';
  formAddSubmitButton.classList.add('form__button-submit_inactive');
  closePopup(popupAddCard);
}
