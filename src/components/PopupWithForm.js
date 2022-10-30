import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button-submit');
  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.form__input');
    this._inputs = {};
    this._inputList.forEach((item) => {
      this._inputs[item.name] = item.value;
    });
    return this._inputs;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._bindHandler = this._handleSubmit.bind(this);
    this._form.addEventListener('submit', this._bindHandler);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._bindHandler);
    this._form.reset();
  }
}
