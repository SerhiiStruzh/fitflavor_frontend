import axiosInstance from "./axiosConfig";

export const createLike = async (postId) => {
    const response = await axiosInstance.post('/likes', { postId });
    return response.data;
};

export const deleteLike = async (postId) => {
    await axiosInstance.delete(`/likes/${postId}`);
};

export const getUserLikedPosts = async (userId) => {
    const response = await axiosInstance.get(`/likes/user/${userId}`);
    return response.data;
};
