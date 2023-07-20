class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }
  
    //Проверяет на ошибку
    _checkResponse(res) {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
  
      //reject promise
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    //Устанавливает новые имя и профессию текущего пользователя
    async setUserInfo(data) {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
      return this._checkResponse(response);
    }
  
    //Загрузка информации о пользователе с сервера
    async getUserInfo() {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
      });
      return this._checkResponse(response);
    }
  
    //Загрузка карточек с сервера
    async getInitialCards() {
      const response = await fetch(`${this._baseUrl}/cards`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
      });
      return this._checkResponse(response);
    }
  
    //Добавление новой карточки
    async addNewCard(data) {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
      });
      return this._checkResponse(response);
    }
  
    //Удаление карточки
    async deleteCard(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
      });
      return this._checkResponse(response);
    }
  
    //добавить лайк карточки
    async addLike(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
      });
      return this._checkResponse(response);
    }
  
    //удалить лайк карточки
    async deleteLike(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
      });
      return this._checkResponse(response);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
          return api.addLike(cardId);
        }
        return api.deleteLike(cardId);
      }
  
    //avatar update avatar
    async setUserAvatar({ link }) {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${localStorage.getItem('JWT')}`,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return this._checkResponse(response);
    }
  }
  
  //connect api
  export const api = new Api({
    baseUrl: "https://mesto.arteva.nomoredomains.xyz",
  });
