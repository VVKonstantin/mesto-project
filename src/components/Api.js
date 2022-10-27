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

}

export function editProfile(body) {
  return touchServerWithBody(options, 'PATCH', 'users/me', body)
    .then(isOk)
}

export function addCardServer(body) {
  return touchServerWithBody(options, 'POST', 'cards', body)
    .then(isOk)
}

export function deleteCard(id) {
  return touchServer(options, 'DELETE', `cards/${id}`)
    .then(isOk)
}

export function addLike(id) {
  return touchServer(options, 'PUT', `cards/likes/${id}`)
    .then(isOk)
}

export function delLike(id) {
  return touchServer(options, 'DELETE', `cards/likes/${id}`)
    .then(isOk)
}

export function changeAvatar(body) {
  return touchServerWithBody(options, 'PATCH', 'users/me/avatar', body)
  .then(isOk)
}
