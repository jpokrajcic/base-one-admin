import AuthStore from './AuthStore';
import ToastrStore from './ToastrStore';
import DashboardStore from './DashboardStore';
import OrdersStore from './OrdersStore';
import ProductsStore from './ProductsStore';
import ReportsStore from './ReportsStore';
import IntegrationsStore from './IntegrationsStore';
import UsersStore from './UsersStore';

export default class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.toastrStore = new ToastrStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.ordersStore = new OrdersStore(this);
    this.productsStore = new ProductsStore(this);
    this.reportsStore = new ReportsStore(this);
    this.integrationsStore = new IntegrationsStore(this);
    this.usersStore = new UsersStore(this);
  }
}
