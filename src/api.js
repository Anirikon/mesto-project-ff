const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "c61b35b3-df45-4438-93f5-d738502d68af",
    "Content-Type": "application/json",
  },
};

export const userInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => res.json())
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};
