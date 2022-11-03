export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close()
      }
    }
    this._handleOverlay = (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    }

  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners()
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', this._handleOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlay);
  }
}
