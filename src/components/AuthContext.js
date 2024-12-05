import React, { createContext, useState, useContext, useEffect } from "react";
import { refreshAccessToken } from "../api/authApi";
import { useError } from "./ErrorContext";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showError } = useError();

  const saveToken = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("accessToken", jwtToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  const refreshToken = async () => {
    try {
      const response = await refreshAccessToken();
      saveToken(response.accessToken);
    } catch (error) {
      showError("Failed to refresh token");
      clearToken();
      window.location.reload();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      refreshToken();
    }

    if (!axiosInstance.interceptors.request.handlers.length) {
      axiosInstance.interceptors.request.use(
        (config) => {
          const jwtToken = localStorage.getItem("accessToken");
          if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (!localStorage.getItem("accessToken")) {
            return Promise.reject(error);
          }

          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const refreshResponse = await axiosInstance.post(
                "/auth/refresh",
                null,
                { withCredentials: true }
              );

              const newAccessToken = refreshResponse.data.accessToken;
              saveToken(newAccessToken);

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              clearToken();
              window.location.href = "/login";
              return Promise.reject(refreshError);
            }
          }

          return Promise.reject(error);
        }
      );
    }

    setIsInitialized(true); 
  }, []);

  useEffect(() => {
    const timeToRefresh = 14 * 60 * 1000;
    if (token) {
      const intervalId = setInterval(() => {
        refreshToken();
      }, timeToRefresh);

      return () => clearInterval(intervalId);
    }
  }, [token]);

  if (!isInitialized) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

