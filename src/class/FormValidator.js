export class FormValidator {

  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this._init();
  }

  _init() {
    this._inputs = Array.from(this.form.querySelectorAll('input'));
    this._btn = this.form.querySelector('[type="submit"]');
    this._errorItems = Array.from(this.form.querySelectorAll('.popup__error'));
    this._setEventListeners();
  }

  _validateForm() {
    const isValidForm = !this._inputs.some((item) => !this._isValidate(item));
    this._setSubmitButtonState(isValidForm);
  }

  _isValidate(element) {
    const errorBlock = this.form.querySelector(`#error-${element.name}`);
    if ((element.validity.tooShort || element.validity.tooLong) && element.type === 'text') {
      errorBlock.textContent = this.errorMessages.tooShort;
      this._checkInputValidity(errorBlock, false);
      return false;
      // Можно лучше
      // После return уже не нужен else
    } else if (element.validity.typeMismatch && element.type === 'url') {
      errorBlock.textContent = this.errorMessages.typeMismatch;
      this._checkInputValidity(errorBlock, false);
      return false;
    }

    if (!element.checkValidity()) {
      errorBlock.textContent = this.errorMessages.valueMissing;
      this._checkInputValidity(errorBlock, false);
      return false;
    }
    errorBlock.textContent = '';
    this._checkInputValidity(errorBlock);

    return true;
  }

  _checkInputValidity(errorBlock, isValid = true) {
    if (isValid) {
      errorBlock.classList.remove('popup__error_invalid');
    } else {
      errorBlock.classList.add('popup__error_invalid');
    }
  }

  _setSubmitButtonState(isValid) {
    if (isValid) {
      this._btn.disabled = false;
    } else {
      this._btn.disabled = true;
    }
  }

  _setEventListeners() {
    this.form.addEventListener('input', () => {
      this._validateForm();
    });
  }

  resetErrors() {
    this._errorItems.forEach(element => element.classList.remove('popup__error_invalid'));
  }
}
