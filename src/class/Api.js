export class Api {
  constructor(url, config) {
    this._url = url;
    this.config = config;
  }

  _getResponseData = res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(res.status));
  }

  _getResponseError = err => {
    return Promise.reject(new Error(err.message));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this.config.headers
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  getInitialUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this.config.headers
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  editUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  addCart(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  addLike(id) {
    return fetch(`${this._url}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.config.headers
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.config.headers
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }

  removeCart(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.config.headers
    })
      .then(res => this._getResponseData(res))
      .catch(err => this._getResponseError(err));
  }
}
