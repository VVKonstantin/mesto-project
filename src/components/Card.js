export default class Card {
  constructor(
    { item, handleAddLike, handleDelLike, handleDeleteCard, handleCardClick },
    cardTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.owner._id;
    this._cardId = item._id;

    this._handleAddLike = handleAddLike || function () { };
    this._handleDelLike = handleDelLike || function () { };
    this._handleDeleteCard = handleDeleteCard || function () { };
    this._handleCardClick = handleCardClick || function () { };

    this._template = cardTemplate;
  }

  _getElement() {
    return this._template.querySelector('.element').cloneNode(true);
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

  _pressButtonLike() {
    this._likeButton.classList.contains('element__button-like_active') ?
      this._handleDelLike(this._cardId, this._likesCount, this._likeButton) :
      this._handleAddLike(this._cardId, this._likesCount, this._likeButton);
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
        this._likeButton.classList.add('element__button-like_active');
      }
    })
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._pressButtonDel());
    this._likeButton.addEventListener("click", () => this._pressButtonLike());
    this._elementImage.addEventListener("click", () => this._handleCardClick());
  }

  redraw(length, count, button, addOrDel) {
    count.textContent = length;
    addOrDel ? button.classList.add('element__button-like_active') : button.classList.remove('element__button-like_active');
  }

  deleteCardElement() {
    this._card.remove();
  }
}
