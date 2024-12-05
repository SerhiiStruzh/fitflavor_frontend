import axiosInstance from './axiosConfig';

export const createPost = async (title, body) => {
    const response = await axiosInstance.post('/posts', { title, body }, { withCredentials: true });
    return response.data;
};

export const updatePost = async (postId, title, body) => {
    const response = await axiosInstance.put(`/posts/${postId}`, { title, body }, { withCredentials: true });
    return response.data;
};

export const deletePost = async (postId) => {
    await axiosInstance.delete(`/posts/${postId}`, { withCredentials: true });
};

export const getUserPosts = async (userId) => {
    const response = await axiosInstance.get(`/posts/user/${userId}`, { withCredentials: true });
    return response.data;
};

export const searchPosts = async (query) => {
    const response = await axiosInstance.get('/posts/search', { params: { q: query }, withCredentials: true });
    return response.data;
};

export const getAllPosts = async () => {
    const response = await axiosInstance.get('/posts', { withCredentials: true });
    return response.data;
};

export const getPostById = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}`, { withCredentials: true });
    return response.data;
};

export const getPopularPosts = async () => {
    const response = await axiosInstance.get(`/posts/search/popular`, { withCredentials: true });
    return response.data;
}

export const getNewestPosts = async () => {
    const response = await axiosInstance.get(`/posts/search/newest`, { withCredentials: true });
    return response.data;
}
