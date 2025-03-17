import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import ActionBar from '../../../components/actionBar/ActionBar';
import { RESULTS_PER_PAGE } from '../../../components/pagination/Pagination';
import OrdersTable from './OrdersTable';
import OrderFilters from './OrderFilters';

function Orders(props) {
  const { OrdersStore } = props;

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [paginationData, setPaginationData] = useState({
    total: 199,
    numberOfPages: 10,
    numberOfItems: 25,
    pageSize: 25,
    currentPage: 1,
  });
  const [resultsPerPage, setResultsPerPage] = useState(RESULTS_PER_PAGE[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const [orders, setOrders] = useState();

  useEffect(() => {
    setFromDate(new Date());
    setToDate(new Date());

    OrdersStore.getOrders('', '', '', 0, RESULTS_PER_PAGE[0][1]).then((result) => {
      if (result) {
        if (result.orders.length > 0) setOrders(result.orders);

        const itemsPerPage = RESULTS_PER_PAGE.find((res) => res[1] === result.pageSize);

        if (result.total > 0)
          setPaginationData({
            // total: result.total,
            // numberOfPages: result.numberOfPages,
            // numberOfItems: result.numberOfItems,
            // pageSize: itemsPerPage,
            // currentPage: result.currentPage + 1,
            total: 199,
            numberOfPages: 10,
            numberOfItems: 25,
            pageSize: 25,
            currentPage: 1,
          });
      }
    });
  }, [OrdersStore]);

  function getData(startTime, endTime, filterString, page, pageSize) {
    const startTimeFormated = startTime ? moment(startTime, 'YYYY/MM/DD', true).format() : '';
    const endTimeFormated = endTime ? moment(endTime, 'YYYY/MM/DD', true).format() : '';
    OrdersStore.getOrders(startTimeFormated, endTimeFormated, filterString, page - 1, pageSize[1]).then((result) => {
      if (result) {
        if (result.orders.length > 0) setOrders(result.orders);

        const itemsPerPage = RESULTS_PER_PAGE.find((res) => res[1] === result.pageSize);

        if (result.total > 0)
          setPaginationData({
            total: result.total,
            numberOfPages: result.numberOfPages,
            numberOfItems: result.numberOfItems,
            pageSize: itemsPerPage,
            currentPage: result.currentPage + 1,
          });
      }
    });
  }

  function rangeChangeHandler(newFromDate, newToDate) {
    setFromDate(newFromDate);
    setToDate(newToDate);
  }

  function searchChangeHandler(newSearchValue) {
    setSearchValue(newSearchValue);
  }

  function resultsPerPageChangeHandler(newResultsPerPage) {
    const itemsPerPage = RESULTS_PER_PAGE.find((res) => res[0].toString() === newResultsPerPage);

    setResultsPerPage(itemsPerPage);
    setCurrentPage(1);
    setPaginationData({ ...paginationData, pageSize: itemsPerPage });

    getData(fromDate, toDate, searchValue, 1, itemsPerPage);
  }

  function pageChangeHandler(newPage) {
    setCurrentPage(newPage);
    setPaginationData({ ...paginationData, currentPage: newPage });

    getData(fromDate, toDate, searchValue, newPage, resultsPerPage);
  }

  return (
    <Fragment>
      <ActionBar label='Orders' />
      <OrderFilters
        fromDate={fromDate}
        toDate={toDate}
        searchValue={searchValue}
        rangeChange={(newFromDate, newToDate) => rangeChangeHandler(newFromDate, newToDate)}
        searchChange={(newSearchValue) => searchChangeHandler(newSearchValue)}
        getData={() => getData(fromDate, toDate, searchValue, 1, resultsPerPage)}
      />
      <OrdersTable
        orders={orders}
        paginationData={paginationData}
        onResultsPerPageChange={resultsPerPageChangeHandler}
        onPageChange={pageChangeHandler}
      />
    </Fragment>
  );
}

Orders.propTypes = {
  OrdersStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  OrdersStore: root.RootStore.ordersStore,
}))(observer(Orders));
