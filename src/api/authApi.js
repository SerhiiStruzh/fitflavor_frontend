import axiosInstance from "./axiosConfig";

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout", null, {
    withCredentials: true, 
  });
  return response.data; 
};

export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/auth/refresh", null, {
    withCredentials: true, 
  });
  return response.data; 
};

