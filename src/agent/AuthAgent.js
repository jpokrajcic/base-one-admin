import { qs } from 'url-parse';
import { AUTH_HEADER, requests } from './agent';

const AuthAgent = {
  getUserProfile: async () => requests.get(`/userProfile`),
  // login: async (data) => requests.post('/login', qs.stringify(data)),
  login: async (data) => requests.post('/login', data, AUTH_HEADER),
};

export default AuthAgent;
