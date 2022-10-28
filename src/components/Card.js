export class Card {
  constructor({item, handleAddLike, handleDelLike, handleDeleteCard, handleCardClick}, cardTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.owner._id;
    this._cardId = item._id;
    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardClick = handleCardClick;
    this._template = cardTemplate;
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
    this._setButtonDel(userId);
    this._setButtonLike(userId);
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._pressButtonDel()
    );
    this._likeButton.addEventListener("click", () => this._pressButtonLike());
    this._elementImage .addEventListener("click", () => {
      this._handleCardClick();
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
    this._handleDeleteCard(this._cardId, this._card);
  }

  _setButtonDel(id) {
    if (id === this._id) {
      this._deleteButton.classList.add('element__button-delete_active');
    }
  }
  
  _setButtonLike(id) {
    this._likes.forEach((like) => {
      if (like._id === id) {
        this._buttonLike.classList.add('element__button-like_active');
    } 
    });
  }
}
  
