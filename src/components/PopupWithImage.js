import Popup from "./Popup.js";
import { imageInPopup, captionImage } from "./variables.js";

export class PopupWithImage extends Popup {
    constructor({name, link}, selector) {
        super(selector);
        this._name = name;
        this._link = link;
    }

    open() {
        super.open();
        imageInPopup.src = this._link;
        imageInPopup.alt = this._name;
        captionImage.textContent = this._name;
    }
}
