import { makeAutoObservable, runInAction } from 'mobx';
import { DashboardAgent as Agent } from '../agent';

const LOAD_ERROR = `Error loading data`;

const mockDashboard = {
  yearToDate: 1100.99,
  lastMonth: 2200.99,
  monthToDate: 3300.99,
};

export default class DashboardStore {
  _dashboard = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get dashboard() {
    return this._dashboard;
  }

  async getDashboardData() {
    try {
      // REMOVE COMMENTS
      //   const res = await Agent.getDashboardData();
      //   runInAction(() => {
      //     this._dashboard = res.data;
      //   });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._dashboard = mockDashboard;
      });

      return mockDashboard; //res.data;
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}
