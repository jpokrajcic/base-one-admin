import { requests } from './agent';

const ReportsAgent = {
  getReports: (fromDate, toDate) =>
    requests.post('/getMonthlySalesSummaryReports', {
      startTime: fromDate,
      endTime: toDate,
    }),

  getMonthlyReport: (year, month) =>
    requests.post('/getMonthlySalesReport', {
      year: year,
      month: month,
    }),
};

export default ReportsAgent;
