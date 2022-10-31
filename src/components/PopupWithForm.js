import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._inputList = document.querySelectorAll('.form__input');
    this._handleSubmitForm = (evt) => {
      evt.preventDefault();
      handleSubmitForm(this._getInputValues());
    };
  }

  _getInputValues() {
    this._inputs = {};
    this._inputList.forEach((item) => {
      this._inputs[item.name] = item.value;
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(text) {
      this._submitButton.textContent = text;
    }
}
