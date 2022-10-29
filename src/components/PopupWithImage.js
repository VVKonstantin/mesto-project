import Popup from "./Popup.js";
import { popupImage, captionImage } from "./variables.js";

export class PopupWithImage extends Popup {
    constructor({ item }, selector) {
        this._name = item.name;
        this._link = item.link;
        super(selector)
    }
    open() {
        super.oper();
        popupImage.src = this._link;
        popupImage.alt = this._name;
        captionImage.textContent = this._name;
    }
}