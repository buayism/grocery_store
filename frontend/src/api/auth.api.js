import api from './axios';

export async function signup(data) {
  const res = await api.post('/auth/signup', data);
  return res.data;
}

export async function login(data) {
  const res = await api.post('/auth/login', data);
  return res.data;
}

export async function getProfile() {
  const res = await api.get('/auth/me');
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.put('/auth/profile', data);
  return res.data;
}
