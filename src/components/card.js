import { openPopup } from "./modal.js";
import { cardTemplate, elements, popupImage, imageInPopup, captionImage } from "./variables.js";

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function createCard(item) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardElement.querySelector('.element__caption-text');
  const deleteButton = cardElement.querySelector('.element__button-delete');
  const likeButton = cardElement.querySelector('.element__button-like');

  elementImage.setAttribute('src', item.link);
  elementImage.setAttribute('alt', item.name);
  elementCaption.textContent = item.name;

  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });

  elementImage.addEventListener('click', () => {
    openPopup(popupImage);
    imageInPopup.src = elementImage.src;
    imageInPopup.alt = elementImage.alt;
    captionImage.textContent = elementCaption.textContent;
  });

  return cardElement;
}

export function addCard(item, container) {
  const cardElement = createCard(item);
  container.prepend(cardElement);
}

export function createInitialCardsBlock(cards) {
  cards.forEach((item) => {
    addCard(item, elements);
  });
}
