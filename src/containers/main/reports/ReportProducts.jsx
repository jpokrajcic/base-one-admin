import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, CardHeader } from 'reactstrap';
import ReportProductTableRow from './ReportProductTableRow';
import { formatCurrency } from '../../../common/utils/NumberUtils';

function ReportProducts(props) {
  const { products, productsSummary } = props;
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className='border-0'>
            <Row>
              <h3 className='mb-0 my-auto col-auto'>Products</h3>
            </Row>
          </CardHeader>
          <div className='table-responsive'>
            <table className='table align-items-center table-flush'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>NAME</th>
                  <th scope='col'>SKU</th>
                  <th scope='col'>QTY SOLD</th>
                  <th scope='col'>QTY RETURNED</th>
                  <th scope='col'>REVENUE</th>
                  <th scope='col'>REFUNDS</th>
                </tr>
              </thead>
              <tbody className='list'>
                {products.map((product, index) => (
                  <ReportProductTableRow key={product.id} product={product} />
                ))}
              </tbody>
              {productsSummary && (
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{productsSummary.quantitySold}</td>
                    <td>{productsSummary.quantityReturned}</td>
                    <td className={'revenue'}>{formatCurrency(productsSummary.revenue)}</td>
                    <td className={'refunds'}>{formatCurrency(productsSummary.refunds)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

ReportProducts.propTypes = {
  products: PropTypes.array.isRequired,
  productsSummary: PropTypes.object.isRequired,
};

export default ReportProducts;
