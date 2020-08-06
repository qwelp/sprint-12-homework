export class Popup {

  constructor(popup) {
    this.popup = popup;
  }

  open(callback = false) {
    if (callback) {
      callback(this);
    }

    this.popup.classList.add('popup_is-opened');
    this._addListeners();
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
    this._removeListeners();
  }

  _pressEscape = event => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _addListeners() {
    document.addEventListener('keydown', this._pressEscape);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  _removeListeners() {
    document.removeEventListener('keydown', this._pressEscape);
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
  }
}
