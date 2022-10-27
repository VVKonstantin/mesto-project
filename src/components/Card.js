export class Card {

  constructor({data, handleAddLike, handleDelLike, handleDelCard, handlePopupImage }, cardTemplate)
    {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._cardId = data._id;

    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this._handleDelCard = handleDelCard;
    this._handlePopupImage = handlePopupImage;

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

