import axios from 'axios';

const API_URL = 'https://soni-shashan-backend-api.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me'),
};

// Education API
export const educationAPI = {
    getAll: () => api.get('/education'),
    getOne: (id) => api.get(`/education/${id}`),
    create: (data) => api.post('/education', data),
    update: (id, data) => api.put(`/education/${id}`, data),
    delete: (id) => api.delete(`/education/${id}`),
};

// Project API
export const projectAPI = {
    getAll: () => api.get('/projects'),
    getOne: (id) => api.get(`/projects/${id}`),
    create: (formData) => api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/projects/${id}`),
};

// Contact API
export const contactAPI = {
    submit: (data) => api.post('/contact', data),
    getAll: () => api.get('/contact'),
    updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
    delete: (id) => api.delete(`/contact/${id}`),
};

export default api;
