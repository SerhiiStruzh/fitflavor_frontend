import axiosInstance from "./axiosConfig";

export const getUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile', {
    withCredentials: true,
  });
  const { userId } = response.data;
  window.location.href = `/users/${userId}`; 
};

export const findUserById = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data; 
};

export const updateUser = async (userId, name, linktree) => {
  const response = await axiosInstance.put(`/users/${userId}`, {name, linktree}, {
    withCredentials: true, 
  });
  return response.data;
};
