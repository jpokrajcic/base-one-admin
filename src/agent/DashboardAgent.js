import { requests } from './agent';
const ENDPOINT = '/dashboard-administration';

const DashboardAgent = {
  getDashboardData: () => requests.get(`${ENDPOINT}/dashboard`),
};

export default DashboardAgent;
