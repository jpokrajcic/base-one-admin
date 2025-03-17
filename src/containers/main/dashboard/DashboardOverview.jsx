import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import StatCard from './OverviewCard';
import { formatCurrency } from '../../../common/utils/NumberUtils';

function DashboardOverview(props) {
  const { overallStats } = props;

  // THINK about moving number formatting in the display component
  // Not sure yet ie. emailValue is in the format 333/44
  const yearToDate = overallStats.yearToDate ? formatCurrency(overallStats.yearToDate) : '-';
  const lastMonth = overallStats.lastMonth ? formatCurrency(overallStats.lastMonth) : '-';
  const monthToDate = overallStats.monthToDate ? formatCurrency(overallStats.monthToDate) : '-';

  return (
    <Row>
      <StatCard title='YEAR TO DATE' value={yearToDate} />
      <StatCard title='LAST MONTH' value={lastMonth} />
      <StatCard title='MONTH TO DATE' value={monthToDate} />
    </Row>
  );
}

DashboardOverview.propTypes = {
  overallStats: PropTypes.object.isRequired,
};

export default DashboardOverview;
