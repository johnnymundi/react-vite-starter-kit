import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.VITE_DJANGO_API_URL}`, // one more time, this case used Django API as example...
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function getStorageToken() {
  const token = localStorage.getItem("@SomeBullshitName:token");
  return token ? JSON.parse(token) : "";
}

export function applyToken(token?: string): void {
  if (token) {
    api.defaults.headers.Authorization = `Token ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
}

// this interceptor makes every request a bit longer...but is necessary for erros in login, logout.
api.interceptors.request.use(
  (config) => {
    const token = getStorageToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Makes sure to apply every individual API case (like Bearer 'token', e.g.)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
