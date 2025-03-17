import { makeAutoObservable, runInAction } from 'mobx';
import { UsersAgent as Agent } from '../agent';
import history from '../common/history';
import { BASE_URL, USERS } from '../common/constants/RouteConstants';

const ITEM_LABEL = 'user';
const LOAD_ERROR = `Error loading ${ITEM_LABEL}`;
const CREATE_SUCCESS = `New ${ITEM_LABEL} added`;
const CREATE_ERROR = `Error creating ${ITEM_LABEL}`;
const UPDATE_SUCCESS = 'Saved';
const UPDATE_ERROR = `Error saving ${ITEM_LABEL}`;
const DELETE_SUCCESS = 'User removed';
const DELETE_ERROR = `Error deleting ${ITEM_LABEL}`;

const mockRoles = [
  {
    id: 'SUPER_ADMIN',
    label: 'Super Admin',
    permissions: ['CAN_CREATE_ADMIN_USERS', 'CAN_CREATE_NON_ADMIN_USERS'],
  },
  {
    id: 'ADMINISTRATOR',
    label: 'Admin',
    permissions: ['CAN_CREATE_NON_ADMIN_USERS'],
  },
  {
    id: 'ACCOUNT_MANAGER',
    label: 'Account Manager',
    permissions: [],
  },
];

const mockUsers = [
  {
    id: '1234567890',
    email: 'superadmin@base_one.com',
    name: 'Super Joe',
    role: {
      id: 'SUPER_ADMIN',
      label: 'Super Admin',
      permissions: ['CAN_CREATE_ADMIN_USERS', 'CAN_CREATE_NON_ADMIN_USERS'],
    },
  },
  {
    id: '234567891',
    email: 'admin@base_one.com',
    name: 'Admin Mark',
    role: {
      id: 'ADMIN',
      label: 'Admin',
      permissions: ['CAN_CREATE_NON_ADMIN_USERS'],
    },
  },
  {
    id: '345678912',
    email: 'account_manager@base_one.com',
    name: 'AM Robert',
    role: {
      id: 'ACCOUNT_MANAGER',
      label: 'Account manager',
      permissions: [],
    },
  },
  {
    id: '456789123',
    email: 'user@base_one.com',
    name: 'User Lars',
    role: {
      id: 'USER',
      label: 'User',
      permissions: [],
    },
  },
];

export default class UsersStore {
  _user = null;
  _users = [];
  _roles = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get users() {
    return this._users;
  }
  get user() {
    return this._user;
  }
  get roles() {
    const preparedRoles = [];
    for (const role of this._roles) {
      preparedRoles.push([role.id, role.label]);
    }
    preparedRoles.sort((a, b) => a[1].localeCompare(b[1]));

    return preparedRoles;
  }

  async getAll() {
    try {
      // REMOVE COMMENTS
      // const res = await Agent.all();
      // runInAction(() => {
      //   this._users = res.data;
      // });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._users = mockUsers;
      });
      return mockUsers;
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }

  async getById(id) {
    try {
      // REMOVE COMMENTS
      // const res = await Agent.getById(id);
      // runInAction(() => {
      //   this._user = res.data;
      // });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._user = mockUsers[0];
      });
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }

  async create(data) {
    try {
      const res = await Agent.create(data);
      data.id = res.data.id;
      runInAction(() => {
        this._users.push(data);
      });
      this.rootStore.toastrStore.success(CREATE_SUCCESS);
      return data;
    } catch (err) {
      this.rootStore.toastrStore.error(CREATE_ERROR, null, err);
      throw err;
    }
  }

  async update(userId, data) {
    try {
      await Agent.update(userId, data);
      this.rootStore.toastrStore.success(UPDATE_SUCCESS);
      this.getById(userId);
    } catch (err) {
      this.rootStore.toastrStore.error(UPDATE_ERROR, null, err);
      throw err;
    }
  }

  async remove(userId) {
    try {
      await Agent.remove(userId);
      this.rootStore.toastrStore.success(DELETE_SUCCESS);
      history.push(`${BASE_URL}/${USERS}`);
    } catch (err) {
      this.rootStore.toastrStore.error(DELETE_ERROR, null, err);
      throw err;
    }
  }

  async getRoles() {
    try {
      // REMOVE COMMENTS
      // const res = await Agent.getRoles();
      // runInAction(() => {
      //   this._roles = res.data;
      // });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._roles = mockRoles;
      });
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}
