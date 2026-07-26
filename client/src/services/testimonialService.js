import api from '../api/axios';

export const submitTestimonial = async (data) => {
  const response = await api.post('/testimonials', data);
  return response.data;
};

export const getApprovedTestimonials = async () => {
  const response = await api.get('/testimonials/approved');
  return response.data;
};

export const getAllTestimonials = async (statusFilter = 'all', searchQuery = '') => {
  const params = {};
  if (statusFilter && statusFilter !== 'all') {
    params.status = statusFilter;
  }
  if (searchQuery) {
    params.search = searchQuery;
  }
  const response = await api.get('/testimonials', { params });
  return response.data;
};

export const approveTestimonial = async (id) => {
  const response = await api.patch(`/testimonials/${id}/approve`);
  return response.data;
};

export const rejectTestimonial = async (id) => {
  const response = await api.patch(`/testimonials/${id}/reject`);
  return response.data;
};
