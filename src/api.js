import axios from 'axios';

const API = axios.create({
  baseURL: '/',
});

export const getUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${id}`);
export const createUser = (user) => API.post('/users', user);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);
