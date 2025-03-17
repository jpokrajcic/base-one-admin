import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import List from 'list.js';
import { Row, Col, Card, CardHeader } from 'reactstrap';
import OrderTableRow from './OrderTableRow';
import Pagination from '../../../components/pagination/Pagination';
import { DEFAULT_LISTJS_PROPS } from '../../../common/constants/GeneralConstants';

const LIST_CONTAINER_ID = 'list-container-id';
function OrdersTable(props) {
  const { orders, paginationData, onResultsPerPageChange, onPageChange } = props;

  const LIST_PROPS = Object.assign(DEFAULT_LISTJS_PROPS, {
    valueNames: ['reference', 'total', 'refundsTotal', 'financialStatus', 'createdAt', 'details'],
  });

  useEffect(() => {
    if (orders) {
      const _list = new List(LIST_CONTAINER_ID, LIST_PROPS);
    }
  }, [orders, LIST_PROPS]);

  return (
    <Fragment>
      <Row id={LIST_CONTAINER_ID}>
        <Col>
          <Card>
            <CardHeader className='border-0'>
              <Row>
                <h3 className='mb-0 my-auto col-auto'>Orders</h3>
              </Row>
            </CardHeader>
            <div className='table-responsive'>
              <table className='table align-items-center table-flush'>
                <thead className='thead-light'>
                  {/* To enable column sort add data-sort='fieldname' to each <th> element  */}
                  <tr>
                    <th scope='col' className='sort'>
                      ORDER
                    </th>
                    <th scope='col' className='sort'>
                      TOTAL
                    </th>
                    <th scope='col' className='sort'>
                      REFUND
                    </th>
                    <th scope='col' className='sort'>
                      STATUS
                    </th>
                    <th scope='col' className='sort'>
                      CREATED
                    </th>
                    <th scope='col' className='sort'>
                      DETAILS
                    </th>
                  </tr>
                </thead>
                {orders && (
                  <tbody className='list'>
                    {orders && orders.map((order) => <OrderTableRow key={order._id} order={order} />)}
                  </tbody>
                )}
              </table>
            </div>
          </Card>
          {paginationData && (
            <Pagination
              paginationData={paginationData}
              onResultsPerPageChange={(pageSize) => onResultsPerPageChange(pageSize)}
              onPageChange={(page) => onPageChange(page)}
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  resultsPerPageChange: PropTypes.func.isRequired,
  paginationChange: PropTypes.func.isRequired,
};

export default OrdersTable;
