import { makeAutoObservable, runInAction } from 'mobx';
import { ReportsAgent as Agent } from '../agent';

const LOAD_ERROR = `Error loading data`;

const mockReports = [
  // {
  //   id: '1234567890',
  //   name: 'April 2021',
  //   grossSales: 100000,
  //   returns: 20000,
  //   taxes: 15000,
  //   shipping: 5000,
  //   total: 140000,
  // },
  // {
  //   id: '2345678901',
  //   name: 'May 2021',
  //   grossSales: 200000,
  //   returns: 40000,
  //   taxes: 30000,
  //   shipping: 10000,
  //   total: 280000,
  // },
  // {
  //   id: '3456789012',
  //   name: 'June 2021',
  //   grossSales: 300000,
  //   returns: 60000,
  //   taxes: 45000,
  //   shipping: 15000,
  //   total: 420000,
  // },
  {
    year: 2020,
    month: 3,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
  {
    year: 2020,
    month: 2,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
  {
    year: 2020,
    month: 1,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
  {
    year: 2019,
    month: 12,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
  {
    year: 2019,
    month: 11,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
  {
    year: 2019,
    month: 10,
    grossSales: 999.99,
    returns: 123.12,
    taxes: 34.22,
    shipping: 55.56,
    total: 966.65,
  },
];

const mockReport = {
  products: [
    {
      name: 'Product 1',
      sku: 'AAA-BB1',
      quantitySold: 1233,
      quantityReturned: 20,
      revenue: 123300,
      refunds: 2000,
    },
    {
      name: 'Product 1',
      sku: 'AAA-BB1',
      quantitySold: 1433,
      quantityReturned: 34,
      revenue: 143300,
      refunds: 3400,
    },
    {
      name: 'Product 1',
      sku: 'AAA-BB1',
      quantitySold: 987,
      quantityReturned: 54,
      revenue: 98700,
      refunds: 5400,
    },
    {
      name: 'Product 1',
      sku: 'AAA-BB1',
      quantitySold: 555,
      quantityReturned: 22,
      revenue: 55500,
      refunds: 2200,
    },
  ],
  productsSummary: {
    quantitySold: 4208,
    quantityReturned: 130,
    revenue: 420800,
    refunds: 13000,
  },
  ordersSummary: {
    year: 2021,
    month: 4,
    grossSales: 430220.99,
    returns: 13400.12,
    taxes: 340.22,
    shipping: 550.56,
    total: 426800.65,
  },
};
//   id: '1234567890',
//   name: 'April 2021',
//   products: [
//     {
//       id: '1',
//       name: 'Product 1',
//       sku: 'XXX-AAA-1',
//       quantitySold: 100,
//       revenue: 1000,
//       quantityReturned: 10,
//       refunds: 100,
//     },
//     {
//       id: '2',
//       name: 'Product 2',
//       sku: 'XXX-AAA-2',
//       quantitySold: 200,
//       revenue: 2000,
//       quantityReturned: 20,
//       refunds: 200,
//     },
//     {
//       id: '3',
//       name: 'Product 3',
//       sku: 'XXX-AAA-3',
//       quantitySold: 300,
//       revenue: 3000,
//       quantityReturned: 30,
//       refunds: 300,
//     },
//   ],
//   grossSales: 100000,
//   refunds: 20000,
//   netSales: 75000,
//   shipping: 5000,
//   taxes: 5000,
//   total: 140000,
// };

export default class ReportsStore {
  _report = null;
  _reports = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get reports() {
    return this._reports;
  }
  get report() {
    return this._report;
  }

  async getReports(startTimestamp, endTimestamp) {
    try {
      // REMOVE COMMENTS
      // const res = await Agent.getReports({startTimestamp:startTimestamp, endTimestamp:endTimestamp});
      // runInAction(() => {
      //   this._reports = res.data;
      // });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._reports = mockReports;
      });
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }

  async getMonthlyReport(id) {
    try {
      // REMOVE COMMENTS
      // const res = await Agent.getReportById(id);
      // runInAction(() => {
      //   this._reports = res.data;
      // });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._report = mockReport;
      });

      return mockReport; //res.data;
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}

// import { makeAutoObservable, runInAction } from 'mobx';
// import { ReportsAgent as Agent } from '../agent';

// const LOAD_ERROR = `Error loading data`;

// export default class ReportsStore {
//   _report = null;
//   _reports = [];

//   constructor(rootStore) {
//     makeAutoObservable(this);

//     this.rootStore = rootStore;
//   }

//   get reports() {
//     return this._reports;
//   }
//   get report() {
//     return this._report;
//   }

//   async getReports(fromDate, toDate) {
//     try {
//       const res = await Agent.getReports(fromDate, toDate);
//       runInAction(() => {
//         this._reports = res.data.data;
//       });

//       return res.data.data;
//     } catch (err) {
//       this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
//       throw err;
//     }
//   }

//   async getMonthlyReport(year, month) {
//     try {
//       const res = await Agent.getMonthlyReport(year, month);
//       runInAction(() => {
//         this._report = res.data.data;
//       });

//       return res.data.data;
//     } catch (err) {
//       this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
//       throw err;
//     }
//   }
// }
