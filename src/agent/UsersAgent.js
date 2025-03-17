import { requests } from './agent';
const ENDPOINT = '/user-administration';

const UsersAgent = {
  all: (filter = {}) => requests.post(`${ENDPOINT}/all-users`, filter),
  getById: (userId) => requests.get(`${ENDPOINT}/admin-user/${userId}`),
  create: (data) => requests.post(`${ENDPOINT}/create`, data),
  update: (userId, data) => requests.patch(`${ENDPOINT}/admin-user/${userId}`, data),
  remove: (userId) => requests.remove(`${ENDPOINT}/admin-user/${userId}`),
  getRoles: () => requests.get(`/permissions/roles`),
};

export default UsersAgent;
