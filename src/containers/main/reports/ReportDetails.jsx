import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ActionBar from '../../../components/actionBar/ActionBar';
import moment from 'moment';
import ReportProducts from './ReportProducts';
import ReportOrders from './ReportOrders';

function ReportDetails(props) {
  const { ReportsStore, match } = props;

  const [products, setProducts] = useState([]);
  const [productsSummary, setProductsSummary] = useState();
  const [ordersSummary, setOrdersSummary] = useState({
    grossSales: '-',
    returns: '-',
    taxes: '-',
    shipping: '-',
    total: '-',
  });

  const year = match.params.year;
  const month = match.params.month;

  useEffect(() => {
    ReportsStore.getMonthlyReport(year, month).then((result) => {
      if (result) {
        setProducts(result.products);
        setProductsSummary(result.productsSummary);
        setOrdersSummary(result.ordersSummary);
      }
    });
  }, [year, month, ReportsStore]);

  return (
    <Fragment>
      <ActionBar label={`Report for ${moment().month(month).format('MMMM')} ${year}`} />
      <ReportOrders ordersSummary={ordersSummary} />
      <ReportProducts products={products} productsSummary={productsSummary} />
    </Fragment>
  );
}

ReportDetails.propTypes = {
  ReportsStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  ReportsStore: root.RootStore.reportsStore,
}))(observer(ReportDetails));
