import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActionBar from '../../../components/actionBar/ActionBar';
import { inject, observer } from 'mobx-react';
import DashboardOverview from './DashboardOverview';

function Dashboard(props) {
  const { DashboardStore } = props;
  const [overallStats, setOverallStats] = useState({});

  useEffect(() => {
    DashboardStore.getDashboardData().then((data) => {
      setOverallStats(data);
    });
  }, [DashboardStore]);

  return (
    <div className='container-fluid'>
      <ActionBar label='Dashboard' />
      <DashboardOverview overallStats={overallStats} />
    </div>
  );
}

Dashboard.propTypes = {
  DashboardStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  DashboardStore: root.RootStore.dashboardStore,
}))(observer(Dashboard));
