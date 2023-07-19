class Auth {
    constructor ({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    //Проверяет на ошибку
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  
    register({ email, password }) {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password })
      }).then(this._checkResponse)
    }
  
    authorize({ email, password }) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password })
      }).then(this._checkResponse);
    }
  
    checkToken(JWT) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          Authorization: `Bearer ${JWT}`
        }
      }).then(this._checkResponse)
    }
  }
  
  export const auth = new Auth({
    baseUrl: 'https://mesto.arteva.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json'
    }
  })