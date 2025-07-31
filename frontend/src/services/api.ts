import axios from 'axios';
import { User, CreateUserDto, UpdateUserDto, Cat, CreateCatDto, UpdateCatDto, CatStatistics } from '../types';

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
