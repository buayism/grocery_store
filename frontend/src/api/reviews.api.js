import api from './axios';

export async function createReview(data) {
  const res = await api.post('/reviews', data);
  return res.data;
}

export async function getProductReviews(productId) {
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data;
}
