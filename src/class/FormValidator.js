// eslint-disable-next-line import/prefer-default-export
export class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    // eslint-disable-next-line no-underscore-dangle
    this._init();
  }

  // eslint-disable-next-line no-underscore-dangle
  _init() {
    // eslint-disable-next-line no-underscore-dangle
    this._inputs = Array.from(this.form.querySelectorAll('input'));
    // eslint-disable-next-line no-underscore-dangle
    this._btn = this.form.querySelector('[type="submit"]');
    // eslint-disable-next-line no-underscore-dangle
    this._errorItems = Array.from(this.form.querySelectorAll('.popup__error'));
    // eslint-disable-next-line no-underscore-dangle
    this._setEventListeners();
  }

  // eslint-disable-next-line no-underscore-dangle
  _validateForm() {
    // eslint-disable-next-line no-underscore-dangle
    const isValidForm = !this._inputs.some((item) => !this._isValidate(item));
    // eslint-disable-next-line no-underscore-dangle
    this._setSubmitButtonState(isValidForm);
  }

  // eslint-disable-next-line no-underscore-dangle
  _isValidate(element) {
    const errorBlock = this.form.querySelector(`#error-${element.name}`);
    if ((element.validity.tooShort || element.validity.tooLong) && element.type === 'text') {
      errorBlock.textContent = this.errorMessages.tooShort;
      // eslint-disable-next-line no-underscore-dangle
      this._checkInputValidity(errorBlock, false);
      return false;
      // Можно лучше
      // После return уже не нужен else
    } if (element.validity.typeMismatch && element.type === 'url') {
      errorBlock.textContent = this.errorMessages.typeMismatch;
      // eslint-disable-next-line no-underscore-dangle
      this._checkInputValidity(errorBlock, false);
      return false;
    }

    if (!element.checkValidity()) {
      errorBlock.textContent = this.errorMessages.valueMissing;
      // eslint-disable-next-line no-underscore-dangle
      this._checkInputValidity(errorBlock, false);
      return false;
    }
    errorBlock.textContent = '';
    // eslint-disable-next-line no-underscore-dangle
    this._checkInputValidity(errorBlock);

    return true;
  }

  // eslint-disable-next-line no-underscore-dangle,class-methods-use-this
  _checkInputValidity(errorBlock, isValid = true) {
    if (isValid) {
      errorBlock.classList.remove('popup__error_invalid');
    } else {
      errorBlock.classList.add('popup__error_invalid');
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _setSubmitButtonState(isValid) {
    if (isValid) {
      // eslint-disable-next-line no-underscore-dangle
      this._btn.disabled = false;
    } else {
      // eslint-disable-next-line no-underscore-dangle
      this._btn.disabled = true;
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _setEventListeners() {
    this.form.addEventListener('input', () => {
      // eslint-disable-next-line no-underscore-dangle
      this._validateForm();
    });
  }

  resetErrors() {
    // eslint-disable-next-line no-underscore-dangle
    this._errorItems.forEach((element) => element.classList.remove('popup__error_invalid'));
  }
}
