// eslint-disable-next-line import/prefer-default-export
export class Api {
  constructor(url, config) {
    // eslint-disable-next-line no-underscore-dangle
    this._url = url;
    this.config = config;
  }

  // eslint-disable-next-line no-underscore-dangle,class-methods-use-this
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(res.status));
  }

  // eslint-disable-next-line no-underscore-dangle,class-methods-use-this
  _getResponseError(err) {
    return Promise.reject(new Error(err.message));
  }

  getInitialCards() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/cards`, {
      headers: this.config.headers,
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  getInitialUser() {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/users/me`, {
      headers: this.config.headers,
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  editUser(name, about) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  editAvatar(avatar) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  addCart(name, link) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  addLike(id) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.config.headers,
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  removeLike(id) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.config.headers,
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }

  removeCart(id) {
    // eslint-disable-next-line no-underscore-dangle
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.config.headers,
    })
      // eslint-disable-next-line no-underscore-dangle
      .then((res) => this._getResponseData(res))
      // eslint-disable-next-line no-underscore-dangle
      .catch((err) => this._getResponseError(err));
  }
}
