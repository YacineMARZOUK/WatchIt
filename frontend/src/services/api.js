import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // The Gateway URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Configure Interceptors for JWT authorization
api.interceptors.request.use(
    (config) => {
        // Later, you can get the token from localStorage or a state management library
        // const token = localStorage.getItem('watchit_token');
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const videoService = {
    getAllVideos: () => api.get('/videos'),
    getVideoById: (id) => api.get(`/videos/${id}`),
};

export const userService = {
    getWatchlist: (userId) => api.get(`/users/${userId}/watchlist`),
    addToWatchlist: (userId, videoId) => api.post(`/users/${userId}/watchlist/${videoId}`),
    removeFromWatchlist: (userId, videoId) => api.delete(`/users/${userId}/watchlist/${videoId}`),
};

export default api;
