import axios from 'axios';

// Configure your Spring Boot backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  create: (data: ProjectDTO) => api.post('/admin/projects', data),
  update: (id: number, data: ProjectDTO) => api.put(`/admin/projects/${id}`, data),
  delete: (id: number) => api.delete(`/admin/projects/${id}`),
};

// Achievements API
export const achievementsApi = {
  getAll: () => api.get('/achievements'),
  create: (data: AchievementDTO) => api.post('/admin/achievements', data),
  update: (id: number, data: AchievementDTO) => api.put(`/admin/achievements/${id}`, data),
  delete: (id: number) => api.delete(`/admin/achievements/${id}`),
};

// Contact API
export const contactApi = {
  send: (data: ContactDTO) => api.post('/contact', data),
};

// Types
export interface ProjectDTO {
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl?: string;
}

export interface Project extends ProjectDTO {
  id: number;
  createdAt?: string;
}

export interface AchievementDTO {
  title: string;
  year: string;
  description: string;
}

export interface Achievement extends AchievementDTO {
  id: number;
}

export interface ContactDTO {
  name: string;
  email: string;
  message: string;
}

export default api;
