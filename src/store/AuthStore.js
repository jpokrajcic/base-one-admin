import { makeAutoObservable, runInAction } from 'mobx';
import AES from 'crypto-js/aes';

import Cookies from 'universal-cookie';

import { AuthAgent as Agent } from '../agent';
import { AUTH_COOKIE } from '../common/constants/ApiConstants';

const cookies = new Cookies();
const COOKIE_OPTIONS = { path: '/' };

const LOGIN_ERROR = 'Authentication failed';

// REMOVE MOCK DATA
const mockUser = {
  id: '234325435345',
  email: 'superadmin@base_one.com',
  name: 'Super Joe',
  role: {
    id: 'SUPER_ADMIN',
    label: 'Super Admin',
    permissions: ['CAN_CREATE_ADMIN_USERS', 'CAN_CREATE_NON_ADMIN_USERS'],
  },
};

export default class AuthStore {
  _userProfile = {};
  rootStore = null;

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get userProfile() {
    return this._userProfile;
  }

  loadData(user) {
    runInAction(() => {
      this._userProfile = user;
    });
  }

  async init() {
    // REMOVE COMMENTS
    // return Agent.getUserProfile().then((res) => {
    //   this.loadData(res.data);
    //   return res.data;
    // });

    // REMOVE ALL CODE BELOW
    this.loadData(mockUser);
    return mockUser;
  }

  encryptPassword(clearPwd) {
    return AES.encrypt(clearPwd, 'tmpSalt').toString();
  }

  async login(email, clearPwd) {
    const encryptedPassword = this.encryptPassword(clearPwd);

    try {
      // REMOVE COMMENTS
      const res = await Agent.login({ username: email, password: clearPwd });
      //const res = await Agent.login();
      const token = res.data.data.token;
      cookies.set(AUTH_COOKIE, token, COOKIE_OPTIONS);

      // Load user profile
      await this.init();
    } catch (err) {
      this.rootStore.toastrStore.error(LOGIN_ERROR, null, err);

      throw err;
    }
  }

  logout() {
    cookies.remove(AUTH_COOKIE, COOKIE_OPTIONS);

    runInAction(() => {
      this._userProfile = {};
    });
  }
}
