

export class Card {

  constructor(item, templateCart, viewImage, api, userInfo) {
    this.item = item;
    this.templateCart = templateCart;
    this.viewImage = viewImage;
    this.api = api;
    this.userInfo = userInfo;
  }

  _countLikes () {
    this.api.getInitialCards().then(items => {
      const item = items.filter(item => item._id === this.cart.dataset.id);

      this.cart.querySelector('.place-card__like-count').textContent = item[0].likes.length;
    });
  }

  _like = () => {
    const btnLike = this.cart.querySelector('.place-card__like-icon');

    if (this.item.likes) {

      if (btnLike.classList.contains('place-card__like-icon_liked')) {
        this.api.removeLike(this.cart.dataset.id)
          .then(res => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            this._countLikes();
          })
          .catch(err => console.log('ERROR', err.message));
      } else {
        this.api.addLike(this.cart.dataset.id)
          .then(res => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            this._countLikes();
          })
          .catch(err => console.log('ERROR', err.message));
      }

    } else {
      if (!btnLike.classList.contains('place-card__like-icon_liked')) {
        this.api.addLike(this.cart.dataset.id)
          .then(res => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            this._countLikes();
          })
          .catch(err => console.log('ERROR', err.message));
      } else {
        this.api.removeLike(this.cart.dataset.id)
          .then(res => {
            btnLike.classList.toggle('place-card__like-icon_liked');
            this._countLikes();
          })
          .catch(err => console.log('ERROR', err.message));
      }
    }
  }

  _imageOpen = event => {
    if (event.target.className !== 'place-card__delete-icon') {
      this.viewImage(this.item.link);
    }
  }

  _remove = () => {
    if (confirm(`Удалить карточку?`)) {
      this.api.removeCart(this.cart.dataset.id)
        .then(res => {
          this._removeListeners();
          this.cart.remove();
        })
        .catch(err => console.log('ERROR', err.message));
    }
  }

  create(id = false) {
    this.cart = this.templateCart.content.cloneNode(true).querySelector('.place-card');
    this.cart.dataset.id = this.item._id;

    this.cart.querySelector('.place-card__name').textContent = this.item.name;
    this.cart.querySelector('.place-card__image').style.backgroundImage = `url(${this.item.link})`;

    this.btnLike = this.cart.querySelector('.place-card__like-icon');
    this.btnDelete = this.cart.querySelector('.place-card__delete-icon');
    this.image = this.cart.querySelector('.place-card__image');

    if (this.item.likes) {
      const isLike = this.item.likes.some(item => item._id === this.userInfo.id);

      if (isLike) {
        this.cart.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
      }

      this.cart.querySelector('.place-card__like-count').textContent = this.item.likes.length;
    }

    this._addListeners();

    return this.cart;
  }

  _addListeners() {
    this.btnLike.addEventListener('click', this._like);
    this.btnDelete.addEventListener('click', this._remove);
    this.image.addEventListener('click', this._imageOpen);
  }

  _removeListeners() {
    this.btnLike.removeEventListener('click', this._like);
    this.btnDelete.removeEventListener('click', this._remove);
    this.image.removeEventListener('click', this._imageOpen);
  }
}