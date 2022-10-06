import { openPopup } from "./modal.js";
import { cardTemplate, elements, popupImage, imageInPopup, captionImage, myId } from "./variables.js";
import { deleteCard, delLike, addLike } from "./api.js";

function checkButtonLike(button, count, id) {
  if (button.classList.contains('element__button-like_active')) {
    delLike(id, count)
      .then((item) => {
        count.textContent = item.likes.length;
        button.classList.remove('element__button-like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  else {
    addLike(id, count)
      .then((item) => {
        count.textContent = item.likes.length;
        button.classList.add('element__button-like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

function createCard(item) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardElement.querySelector('.element__caption-text');
  const deleteButton = cardElement.querySelector('.element__button-delete');
  const likesCount = cardElement.querySelector('.element__count-like');
  const likeButton = cardElement.querySelector('.element__button-like');

  elementImage.setAttribute('src', item.link);
  elementImage.setAttribute('alt', item.name);
  elementCaption.textContent = item.name;
  likesCount.textContent = item.likes.length;

  item.likes.forEach((i) => {
    if (i._id === myId.id) {
      likeButton.classList.add('element__button-like_active');
    }
  });

  if (myId.id === item.owner._id) {
    deleteButton.classList.add('element__button-delete_active')
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(item._id)
      .then(() => {
        deleteButton.closest('.element').remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  likeButton.addEventListener('click', (evt) => {
    checkButtonLike(evt.target, likesCount, item._id)
  })

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
  cards.reverse().forEach((item) => {
    addCard(item, elements);
  });
}
