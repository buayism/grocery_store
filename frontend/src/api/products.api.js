import api from './axios';

export async function getProducts(params = {}) {
  const res = await api.get('/products', { params });
  return res.data;
}

export async function getCurrentHarvest(params = {}) {
  const res = await api.get('/products/harvest', { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function getCategories() {
  const res = await api.get('/products/categories');
  return res.data;
}
