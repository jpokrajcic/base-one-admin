import { requests } from './agent';

const OrdersAgent = {
  getOrders: (fromDate, toDate, searchValue, page, pageSize) =>
    requests.post('/getOrders', {
      startTime: fromDate,
      endTime: toDate,
      filterString: searchValue,
      page: page,
      size: pageSize,
    }),
};

export default OrdersAgent;
