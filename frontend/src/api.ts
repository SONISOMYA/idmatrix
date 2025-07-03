import axios from 'axios';
import type { User } from './types';

const API_URL = 'http://127.0.0.1:8000';

export const getUsers = async () => {
  const res = await axios.get<User[]>(`${API_URL}/users`);
  return res.data;
};

export const createUser = async (user: Omit<User, 'id'>) => {
  return axios.post(`${API_URL}/users`, user);
};

export const updateUser = async (id: number, user: Omit<User, 'id'>) => {
  return axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

export async function uploadUsers(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://localhost:8000/upload-users', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw { response: { json: () => error } };
  }
}

export const downloadSample = async () => {
  const res = await axios.get(`${API_URL}/users/sample-template`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'sample_template.xlsx');
  document.body.appendChild(link);
  link.click();
};