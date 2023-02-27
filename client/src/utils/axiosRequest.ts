import axios, { AxiosRequestConfig } from "axios";
import { STORAGE } from "../constants/storage";

export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const axiosRequest = async (config: AxiosRequestConfig) => {
  const axiosConfig: AxiosRequestConfig = {
    ...config,
    baseURL: BACKEND_URL
  };
  const token = localStorage.getItem(STORAGE.TOKEN);
  if (token) {
    axiosConfig.headers = {
      Authorization: `Bearer ${token}`
    };
  }

  return axios(axiosConfig);
};
