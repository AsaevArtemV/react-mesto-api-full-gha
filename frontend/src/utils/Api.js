class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Проверяет на ошибку
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

//Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

//Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

//Устанавливает новые имя и профессию текущего пользователя
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(res => this._checkResponse(res))
  }

//Добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(res => this._checkResponse(res))
  }

// добавить лайк карточки
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

// удалить лайк карточки
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return api.addLike(id);
    }
    return api.deleteLike(id);
  }

//Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

//Обновление аватара пользователя
  setUserAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then(res => this._checkResponse(res))
  }
}

//Настройки для подключения к серверу
export const api = new Api({
  baseUrl: 'https://mesto.arteva.nomoredomains.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    'Content-Type': 'application/json'
  }
});
