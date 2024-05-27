import axios from "axios";

let token = getStorageToken();

function getStorageToken() {
  const storedData = localStorage.getItem("user");
  let token = "";

  if (storedData) {
    const userData = JSON.parse(storedData);
    token = userData.token;
  }
  return token;
}

function setAuthorizationHeader(token: string | null) {
  api.defaults.headers.Authorization = token ? `Token ${token}` : "";
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

setAuthorizationHeader(token);

export const applyToken = (newToken: string | null) => {
  var token = newToken;
  setAuthorizationHeader(token);
};
