import axiosInstance from './axiosConfig';

export const createComment = async (postId, commentText) => {
    const response = await axiosInstance.post('/comments', {
        postId,
        commentText,
    },
    { withCredentials: true });
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axiosInstance.delete(`/comments/${commentId}`, { withCredentials: true });
    return response.data;
};

export const getCommentsByPost = async (postId) => {
    const response = await axiosInstance.get(`/comments/post/${postId}`, { withCredentials: true });
    return response.data;
};
