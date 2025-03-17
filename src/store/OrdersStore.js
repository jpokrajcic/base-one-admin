import { makeAutoObservable, runInAction } from 'mobx';
import { OrdersAgent as Agent } from '../agent';

const LOAD_ERROR = `Error loading orders`;

const mockOrders = [
  {
    id: '1',
    reference: 'Order xzy 1',
    total: 100.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-01-01T20:00:00.000Z',
    details: 'This is a nice order for Bob',
  },
  {
    id: '2',
    reference: 'Order xzy 2',
    total: 200.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-02-02T00:00:00.000Z',
    details: 'This is a nice order for Joe',
  },
  {
    id: '3',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '4',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '5',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '31',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '32',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },

  {
    id: '33',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '34',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '35',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '36',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '37',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '38',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '39',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '311',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3112',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3113',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3114',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3115',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3116',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3117',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3118',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
  {
    id: '3119',
    reference: 'Order xzy 3',
    total: 300.99,
    refundsTotal: 0,
    financialStatus: 'paid',
    createdAt: '2021-03-03T01:00:00.000Z',
    details: 'This is a nice order for Thor',
  },
];

export default class OrdersStore {
  _orders = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get orders() {
    return this._orders;
  }

  async getOrders(fromDate, toDate, searchValue, page, pageSize) {
    try {
      runInAction(() => {
        this._orders = [];
      });

      const res = await Agent.getOrders(fromDate, toDate, searchValue, page, pageSize);
      runInAction(() => {
        this._orders = res.data.data.orders;
      });

      return { orders: res.data.data };
      //REMOVE ALL CODE BELOW
      // runInAction(() => {
      //   this._orders = { orders: mockOrders };
      // });
      // return { orders: mockOrders };
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}
