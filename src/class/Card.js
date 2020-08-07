// eslint-disable-next-line import/prefer-default-export
export class Card {
  constructor(item, templateCart, viewImage, api, userInfo) {
    this.item = item;
    this.templateCart = templateCart;
    this.viewImage = viewImage;
    this.api = api;
    this.userInfo = userInfo;
    // eslint-disable-next-line no-underscore-dangle
    this._init();
  }

  // eslint-disable-next-line no-underscore-dangle
  _init() {
    // eslint-disable-next-line no-underscore-dangle
    this._like = this._like.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._remove = this._remove.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._imageOpen = this._imageOpen.bind(this);
  }

  // eslint-disable-next-line no-underscore-dangle
  _countLikes() {
    this.api.getInitialCards().then((items) => {
      // eslint-disable-next-line no-shadow,no-underscore-dangle
      const item = items.filter((item) => item._id === this.cart.dataset.id);

      this.cart.querySelector('.place-card__like-count').textContent = item[0].likes.length;
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  _like() {
    const btnLike = this.cart.querySelector('.place-card__like-icon');

    if (this.item.likes) {
      if (btnLike.classList.contains('place-card__like-icon_liked')) {
        this.api.removeLike(this.cart.dataset.id)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            // eslint-disable-next-line no-underscore-dangle
            this._countLikes();
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log('ERROR', err.message));
      } else {
        this.api.addLike(this.cart.dataset.id)
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            // eslint-disable-next-line no-underscore-dangle
            this._countLikes();
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log('ERROR', err.message));
      }
    } else if (!btnLike.classList.contains('place-card__like-icon_liked')) {
      this.api.addLike(this.cart.dataset.id)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          btnLike.classList.toggle('place-card__like-icon_liked');
          // eslint-disable-next-line no-underscore-dangle
          this._countLikes();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('ERROR', err.message));
    } else {
      this.api.removeLike(this.cart.dataset.id)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          btnLike.classList.toggle('place-card__like-icon_liked');
          // eslint-disable-next-line no-underscore-dangle
          this._countLikes();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('ERROR', err.message));
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _imageOpen(event) {
    if (event.target.className !== 'place-card__delete-icon') {
      this.viewImage(this.item.link);
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _remove() {
    // eslint-disable-next-line no-restricted-globals,no-undef,no-alert
    if (confirm('Удалить карточку?')) {
      this.api.removeCart(this.cart.dataset.id)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-underscore-dangle
          this._removeListeners();
          this.cart.remove();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('ERROR', err.message));
    }
  }

  // eslint-disable-next-line no-unused-vars
  create(id = false) {
    this.cart = this.templateCart.content.cloneNode(true).querySelector('.place-card');
    // eslint-disable-next-line no-underscore-dangle
    this.cart.dataset.id = this.item._id;

    this.cart.querySelector('.place-card__name').textContent = this.item.name;
    this.cart.querySelector('.place-card__image').style.backgroundImage = `url(${this.item.link})`;

    this.btnLike = this.cart.querySelector('.place-card__like-icon');
    this.btnDelete = this.cart.querySelector('.place-card__delete-icon');
    this.image = this.cart.querySelector('.place-card__image');

    if (this.item.likes) {
      // eslint-disable-next-line no-underscore-dangle
      const isLike = this.item.likes.some((item) => item._id === this.userInfo.id);

      if (isLike) {
        this.cart.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
      }

      this.cart.querySelector('.place-card__like-count').textContent = this.item.likes.length;
    }

    // eslint-disable-next-line no-underscore-dangle
    this._addListeners();

    return this.cart;
  }

  // eslint-disable-next-line no-underscore-dangle
  _addListeners() {
    // eslint-disable-next-line no-underscore-dangle
    this.btnLike.addEventListener('click', this._like);
    // eslint-disable-next-line no-underscore-dangle
    this.btnDelete.addEventListener('click', this._remove);
    // eslint-disable-next-line no-underscore-dangle
    this.image.addEventListener('click', this._imageOpen);
  }

  // eslint-disable-next-line no-underscore-dangle
  _removeListeners() {
    // eslint-disable-next-line no-underscore-dangle
    this.btnLike.removeEventListener('click', this._like);
    // eslint-disable-next-line no-underscore-dangle
    this.btnDelete.removeEventListener('click', this._remove);
    // eslint-disable-next-line no-underscore-dangle
    this.image.removeEventListener('click', this._imageOpen);
  }
}
