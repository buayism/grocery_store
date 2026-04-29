import api from './axios';

export async function getCart() {
  const res = await api.get('/cart');
  return res.data;
}

export async function syncCart(items) {
  const res = await api.post('/cart/sync', { items });
  return res.data;
}

export async function clearCart() {
  const res = await api.delete('/cart');
  return res.data;
}
