export class Api {

  constructor( {baseUrl, headers} ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _touchServer(method, url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers
    })
  }

  _touchServerWithBody(method, url, body) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body)
    })
  }

  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getProfile() {
    return this._touchServer('GET', 'users/me')
      .then(this._isOk)
  }

  _getCards() {
    return this._touchServer('GET', 'cards')
      .then(this._isOk)
  }

  getData() {
    return Promise.all([this._getProfile(), this._getCards()])
  }

  editProfile(body) {
    return this._touchServerWithBody('PATCH', 'users/me', body)
      .then(this._isOk)
  }

  addCardServer(body) {
    return this._touchServerWithBody('POST', 'cards', body)
      .then(this._isOk)
  }

  deleteCard(id) {
    return this._touchServer('DELETE', `cards/${id}`)
      .then(this._isOk)
  }

  addLike(id) {
    return this._touchServer('PUT', `cards/likes/${id}`)
      .then(this._isOk)
  }

  delLike(id) {
    return this._touchServer('DELETE', `cards/likes/${id}`)
      .then(this._isOk)
  }

  changeAvatar(body) {
    const newBody = {avatar: body};
    return this._touchServerWithBody('PATCH', 'users/me/avatar', newBody)
    .then(this._isOk)
  }

}


