import axiosInstance from "./axiosConfig";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile', {
      withCredentials: true,
    });
    const { userId } = response.data;
    window.location.href = `/users/${userId}`; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};


export const findUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};


export const updateUser = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, updateData, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};
