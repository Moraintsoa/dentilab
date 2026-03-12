// features/auth/services/ApiServices.js
import api from "../../../shared/services/Api";

const login = async (credentials) => {
  const response = await api.post("auth/token/", credentials);
  return response.data;
};

const refreshToken = async (refresh) => {
  const response = await api.post("auth/token/refresh/", { refresh });
  return response.data;
};

export default {
  login,
  refreshToken,
};