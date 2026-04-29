import api from './axios';

export async function createOrder(data) {
  const res = await api.post('/orders', data);
  return res.data;
}

export async function getOrders() {
  const res = await api.get('/orders');
  return res.data;
}

export async function getOrder(id) {
  const res = await api.get(`/orders/${id}`);
  return res.data;
}

export async function getOrderTracking(id) {
  const res = await api.get(`/orders/${id}/track`);
  return res.data;
}

export async function cancelOrder(id) {
  const res = await api.post(`/orders/${id}/cancel`);
  return res.data;
}
