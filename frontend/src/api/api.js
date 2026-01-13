import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9090/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const projectsApi = {
  getAll: () => api.get("/projects"),
  getById: (id) => api.get(`/projects/${id}`),
  create: (project) => api.post("/projects", project),
  update: (id, project) => api.put(`/projects/${id}`, project),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const achievementsApi = {
  getAll: () => api.get("/achievements"),
  create: (achievement) => api.post("/achievements", achievement),
  update: (id, achievement) => api.put(`/achievements/${id}`, achievement),
  delete: (id) => api.delete(`/achievements/${id}`),
};

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
};

export const contactApi = {
  send: (data) => api.post("/contact", data),
};

export const contentApi = {
  getAll: () => api.get("/content"),
  getBySection: (section) => api.get(`/content/${section}`),
  create: (content) => api.post("/content", content),
  update: (id, content) => api.put(`/content/${id}`, content),
  delete: (id) => api.delete(`/content/${id}`),
  bulkUpdate: (contents) => api.put("/content/bulk", contents),
};

export const skillsApi = {
  getAll: () => api.get("/skills"),
  create: (category) => api.post("/skills", category),
  update: (id, category) => api.put(`/skills/${id}`, category),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const uploadApi = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};


export const experienceApi = {
  getAll: () => api.get("/experience"),
  create: (data) => api.post("/experience", data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

export const educationApi = {
  getAll: () => api.get("/education"),
  create: (data) => api.post("/education", data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`),
};

export default api;
