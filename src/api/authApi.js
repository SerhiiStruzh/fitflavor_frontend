import axiosInstance from "./axiosConfig";

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.get("/auth/refresh", {
      withCredentials: true,
    });
    return response.data; 
  } catch (error) {
    console.error("Error during token refresh:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", null, {
      withCredentials: true, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
