// eslint-disable-next-line import/prefer-default-export
export class Popup {
  constructor(popup) {
    this.popup = popup;
    // eslint-disable-next-line no-underscore-dangle
    this._init();
  }

  // eslint-disable-next-line no-underscore-dangle
  _init() {
    this.close = this.close.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._pressEscape = this._pressEscape.bind(this);
  }

  open(callback = false) {
    if (callback) {
      callback(this);
    }

    this.popup.classList.add('popup_is-opened');
    // eslint-disable-next-line no-underscore-dangle
    this._addListeners();
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    // eslint-disable-next-line no-underscore-dangle
    this._removeListeners();
  }

  // eslint-disable-next-line no-underscore-dangle
  _pressEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _addListeners() {
    // eslint-disable-next-line no-undef,no-underscore-dangle
    document.addEventListener('keydown', this._pressEscape);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  // eslint-disable-next-line no-underscore-dangle
  _removeListeners() {
    // eslint-disable-next-line no-undef,no-underscore-dangle
    document.removeEventListener('keydown', this._pressEscape);
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
  }
}
