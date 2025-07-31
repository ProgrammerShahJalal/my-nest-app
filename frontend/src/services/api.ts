import axios from 'axios';
import { 
  User, CreateUserDto, UpdateUserDto, 
  Cat, CreateCatDto, UpdateCatDto, CatStatistics,
  Blog, CreateBlogDto, UpdateBlogDto, BlogStatistics 
} from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls
export const userApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Get users by role
  getByRole: async (role: string): Promise<User[]> => {
    const response = await api.get(`/users?role=${role}`);
    return response.data;
  },

  // Create user
  create: async (userData: CreateUserDto): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user
  update: async (id: number, userData: UpdateUserDto): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// Cat API calls
export const catApi = {
  // Get all cats
  getAll: async (): Promise<Cat[]> => {
    const response = await api.get('/cats');
    return response.data;
  },

  // Get cat by ID
  getById: async (id: number): Promise<Cat> => {
    const response = await api.get(`/cats/${id}`);
    return response.data;
  },

  // Get cats by breed
  getByBreed: async (breed: string): Promise<Cat[]> => {
    const response = await api.get(`/cats?breed=${breed}`);
    return response.data;
  },

  // Get cats by owner
  getByOwner: async (owner: string): Promise<Cat[]> => {
    const response = await api.get(`/cats?owner=${owner}`);
    return response.data;
  },

  // Get vaccinated cats
  getVaccinated: async (vaccinated: boolean): Promise<Cat[]> => {
    const response = await api.get(`/cats?vaccinated=${vaccinated}`);
    return response.data;
  },

  // Get statistics
  getStatistics: async (): Promise<CatStatistics> => {
    const response = await api.get('/cats/statistics');
    return response.data;
  },

  // Create cat
  create: async (catData: CreateCatDto): Promise<Cat> => {
    const response = await api.post('/cats', catData);
    return response.data;
  },

  // Update cat
  update: async (id: number, catData: UpdateCatDto): Promise<Cat> => {
    const response = await api.put(`/cats/${id}`, catData);
    return response.data;
  },

  // Delete cat
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/cats/${id}`);
    return response.data;
  },
};

// Blog API calls
export const blogApi = {
  // Get all blogs
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data;
  },

  // Get published blogs only
  getPublished: async (): Promise<Blog[]> => {
    const response = await api.get('/blogs/published');
    return response.data;
  },

  // Get blog by ID
  getById: async (id: number): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Get blogs by category
  getByCategory: async (category: string): Promise<Blog[]> => {
    const response = await api.get(`/blogs?category=${category}`);
    return response.data;
  },

  // Get blogs by author
  getByAuthor: async (author: string): Promise<Blog[]> => {
    const response = await api.get(`/blogs?author=${author}`);
    return response.data;
  },

  // Get blogs by tag
  getByTag: async (tag: string): Promise<Blog[]> => {
    const response = await api.get(`/blogs?tag=${tag}`);
    return response.data;
  },

  // Search blogs
  search: async (query: string): Promise<Blog[]> => {
    const response = await api.get(`/blogs?search=${query}`);
    return response.data;
  },

  // Get statistics
  getStatistics: async (): Promise<BlogStatistics> => {
    const response = await api.get('/blogs/statistics');
    return response.data;
  },

  // Create blog
  create: async (blogData: CreateBlogDto): Promise<Blog> => {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  // Update blog
  update: async (id: number, blogData: UpdateBlogDto): Promise<Blog> => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete blog
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};
