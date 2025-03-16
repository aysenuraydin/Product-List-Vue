import axios from "axios";
import { auth } from "@/plugins/FirebaseConfig";
import session from "@/plugins/session";

const API_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

  apiClient.interceptors.request.use(async (config) => {
  let token = session.getSession();

  if (!token && auth.currentUser) {
    token = await auth.currentUser.getIdToken();
    session.setSession(token);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
