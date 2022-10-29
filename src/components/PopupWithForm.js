import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, handleSubmitForm) {
        super(selector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__button-submit');
    }

    _getInputValues() {
        
    }

    setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
        });
    }

    close() {
    super.close();
    this._form.reset()
    }
}