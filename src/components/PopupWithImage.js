import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, selector) {
    super(selector);
    this._name = name;
    this._link = link;
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-subtitle')
  }

  open({name, link}) {
    this._name = name;
    this._link = link;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
    super.open();
  }
}
