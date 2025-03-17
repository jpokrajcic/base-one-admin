export const BASE_URL = '/system';

export const AUTH = 'auth';
export const AUTH_LOGIN = 'login';

export const DASHBOARD = 'dashboard';
export const PRODUCTS = 'products';
export const ORDERS = 'orders';
export const REPORTS = 'reports';
export const REPORT_DETAILS = 'report-details';
export const INTEGRATIONS = 'integrations';
export const USERS = 'users';
export const EDIT_USER = 'edit-user';
export const NEW_USER = 'new-user';
export const ACCOUNT = 'accounts';
export const BANK_ACCOUNTS = 'bank-accounts';
export const TRANSACTIONS = 'transactions';

function mapRouteToLabel(route) {
  switch (route) {
    case DASHBOARD:
      return 'Dashboard';
    case PRODUCTS:
      return 'Products';
    case ORDERS:
      return 'Orders';
    case REPORTS:
      return 'Reports';
    case INTEGRATIONS:
      return 'Integrations';
    case USERS:
      return 'Users';
    case ACCOUNT:
      return 'Account';
    case BANK_ACCOUNTS:
      return 'Bank accounts';
    case TRANSACTIONS:
      return 'Transactions';
    default:
      return 'Navigation';
  }
}

export const routeToLabel = mapRouteToLabel;
