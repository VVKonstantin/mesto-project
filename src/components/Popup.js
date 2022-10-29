export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector)
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners()
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
      }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
          }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            this.close();
          }
        });
    }
}
