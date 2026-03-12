import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.request.use(async (config) => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  if (!access) return config;

  const decoded = jwtDecode(access);
  const isExpired = decoded.exp * 1000 < Date.now();

  if (isExpired && refresh) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = axios.post(
        "http://localhost:8000/api/auth/token/refresh/",
        { refresh }
      ).then(res => {
        localStorage.setItem("access_token", res.data.access);
        isRefreshing = false;
        return res.data.access;
      }).catch(() => {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
      });
    }

    const newAccess = await refreshPromise;
    config.headers.Authorization = `Bearer ${newAccess}`;
  } else {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

export default api;