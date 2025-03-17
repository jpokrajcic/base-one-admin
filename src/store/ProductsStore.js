import { makeAutoObservable, runInAction } from 'mobx';
import { ProductsAgent as Agent } from '../agent';

const LOAD_ERROR = `Error loading orders`;

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    sku: 'XXX-AAA-1',
    price: 100.99,
  },
  {
    id: '2',
    name: 'Product 2',
    sku: 'XXX-AAA-2',
    price: 200.99,
  },
  {
    id: '3',
    name: 'Product 3',
    sku: 'XXX-AAA-3',
    price: 300.99,
  },
];

export default class ProductsStore {
  _products = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get products() {
    return this._products;
  }

  async getProducts() {
    try {
      const res = await Agent.getProducts();
      runInAction(() => {
        this._products = res.data.data;
      });

      return res.data.data;
      // REMOVE ALL CODE BELOW
      // runInAction(() => {
      //   this._products = mockProducts;
      // });

      // return mockProducts;
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}
