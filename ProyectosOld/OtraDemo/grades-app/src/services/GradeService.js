import http from '../http-common';

const getAll = () => {
  return http.get('/grades');
};

const get = (id) => {
  return http.get(`/grades/${id}`);
};

const create = (data) => {
  return http.post('/grades', data);
};

const update = (id, data) => {
  return http.put(`/grades/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/grades/${id}`);
};

const removeAll = () => {
  return http.delete(`/grades`);
};

const findByName = (name) => {
  return http.get(`/grades/name/${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
