import Cookies from 'universal-cookie';
import axios from 'axios';
import history from '../common/history';
import { BASE_URL, AUTH, AUTH_LOGIN } from '../common/constants/RouteConstants';
import { AUTH_COOKIE, APP_API_ROOT } from '../common/constants/ApiConstants';

const AUTH_HEADER = 'AUTH_HEADER';
const REGULAR_HEADER = 'REGULAR_HEADER';

const cookies = new Cookies();

function getHeaders() {
  return {
    Authorization: 'Bearer ' + cookies.get(AUTH_COOKIE),
    //Authorization: 'Bearer ' + cookies.get(AUTH_COOKIE),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  };
}

function getLoginHeaders() {
  return {
    Authorization: 'None ',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  };
}

function getConfig(params, headerType) {
  const headers = headerType === AUTH_HEADER ? getLoginHeaders() : getHeaders();
  return {
    headers: headers,
    params: params,
  };
}

function handleError(err) {
  if (err.response) {
    if (err.response.status === 401) {
      history.push(`${BASE_URL}/${AUTH}/${AUTH_LOGIN}`);
    }
  }
  throw err;
}

const requests = {
  remove: (url) => axios.delete(`${APP_API_ROOT}${url}`, getConfig()).catch((err) => handleError(err)),
  get: (url, params) => axios.get(`${APP_API_ROOT}${url}`, getConfig(params)).catch((err) => handleError(err)),
  patch: (url, body) => axios.patch(`${APP_API_ROOT}${url}`, body, getConfig()).catch((err) => handleError(err)),
  post: (url, body, headerType = REGULAR_HEADER) =>
    axios.post(`${APP_API_ROOT}${url}`, body, getConfig(null, headerType)).catch((err) => handleError(err)),
  upload: (url, file) => axios.post(`${APP_API_ROOT}${url}`, file, getConfig()).catch((err) => handleError(err)),
};

export { requests, AUTH_HEADER };
