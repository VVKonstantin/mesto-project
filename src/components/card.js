// import { openPopup } from "./modal.js";
// import { cardTemplate, elements, popupImage, imageInPopup, captionImage, myId } from "./variables.js";
// import { deleteCard, delLike, addLike } from "./api.js";

// function checkButtonLike(button, count, id) {
//   if (button.classList.contains('element__button-like_active')) {
//     delLike(id, count)
//       .then((item) => {
//         count.textContent = item.likes.length;
//         button.classList.remove('element__button-like_active');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
//   else {
//     addLike(id, count)
//       .then((item) => {
//         count.textContent = item.likes.length;
//         button.classList.add('element__button-like_active');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
// }

// function createCard(item) {

//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

//   const elementImage = cardElement.querySelector('.element__image');
//   const elementCaption = cardElement.querySelector('.element__caption-text');
//   const deleteButton = cardElement.querySelector('.element__button-delete');
//   const likesCount = cardElement.querySelector('.element__count-like');
//   const likeButton = cardElement.querySelector('.element__button-like');

//   elementImage.setAttribute('src', item.link);
//   elementImage.setAttribute('alt', item.name);
//   elementCaption.textContent = item.name;
//   likesCount.textContent = item.likes.length;

//   item.likes.forEach((i) => {
//     if (i._id === myId.id) {
//       likeButton.classList.add('element__button-like_active');
//     }
//   });

//   if (myId.id === item.owner._id) {
//     deleteButton.classList.add('element__button-delete_active')
//   }

//   deleteButton.addEventListener('click', () => {
//     deleteCard(item._id)
//       .then(() => {
//         deleteButton.closest('.element').remove();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   likeButton.addEventListener('click', (evt) => {
//     checkButtonLike(evt.target, likesCount, item._id)
//   })

//   elementImage.addEventListener('click', () => {
//     openPopup(popupImage);
//     imageInPopup.src = elementImage.src;
//     imageInPopup.alt = elementImage.alt;
//     captionImage.textContent = elementCaption.textContent;
//   });

//   return cardElement;
// }

// export function addCard(item, container) {
//   const cardElement = createCard(item);
//   container.prepend(cardElement);
// }

// export function createInitialCardsBlock(cards) {
//   cards.reverse().forEach((item) => {
//     addCard(item, elements);
//   });
// }



export class Card {
  constructor(
    {data, handleAddLike, handleDelLike, handleDelCard, handlePopupImage },
    CardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._cardId = data._id;

    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this._handleDelCard = handleDelCard;
    this._handlePopupImage = handlePopupImage;

    this._template = cardTemplateSelector;
  }

  _getElement() {
    return this._template.content.querySelector('.element').cloneNode(true);
  }

  createCard(userId) {
    this._card = this._getElement();
    this._elementImage = this._card.querySelector('.element__image');
    this._elementCaption = this._card.querySelector('.element__caption-text');
    this._likesCount = this._card.querySelector('.element__count-like');
    this._likeButton = this._card.querySelector('.element__button-like');
    this._deleteButton = this._card.querySelector('.element__button-delete');
    
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._likesCount.textContent = this._likes.length;
    this._elementCaption.textContent = this._name;

    this._setButtonDelState(userId);
    this._setButtonLikeState(userId);
    this._setEventListeners();
    
    return this._card;
  }

  
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._pressButtonDel()
    );
    this._likeButton.addEventListener("click", () => this._pressButtonLike());
    this._elementImage .addEventListener("click", () => {
      this._handlePopupImage();
    });
  }

  _pressButtonLike() {
    if (this._likeButton.classList.contains('element__button-like')) {
      this._handleDelLike(this._cardId, this._likesCount, this._likeButton);
    } else {
      this._handleAddLike(this._cardId, this._likesCount, this._likeButton);
    }
  }

  _pressButtonDel() {
    this._handleDelCard(this._cardId, this._card);
  }

  _setButtonDelState(id) {
    if (id === this._id) {
      this._deleteButton.classList.add('element__button-delete_active');
    }
  }
  

  _setButtonLikeState(id) {
    this._likes.forEach((like) => {
      if (like._id === id) {
        this._buttonLike.classList.add('element__button-like_active');
        return true;
      } else {
        return false;
      }
    });
  }
}
  
