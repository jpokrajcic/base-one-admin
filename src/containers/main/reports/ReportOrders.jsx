import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, CardHeader, CardBody, Label } from 'reactstrap';
import { formatCurrency } from '../../../common/utils/NumberUtils';

function ReportOrders(props) {
  const { ordersSummary } = props;
  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <h3 className='mb-0 my-auto col-auto'>Orders</h3>
            </Row>
          </CardHeader>
          <CardBody>
            <Row style={{ margin: 'auto' }}>
              <Col md={4}>
                <Label>Gross sales</Label>
              </Col>
              <Col md={4} className='text-right'>
                <Label>{formatCurrency(ordersSummary.grossSales)}</Label>
              </Col>
            </Row>

            <Row style={{ margin: 'auto' }}>
              <Col md={4}>
                <Label>Returns</Label>
              </Col>
              <Col md={4} className='text-right'>
                <Label>{formatCurrency(ordersSummary.returns)}</Label>
              </Col>
            </Row>

            <Row style={{ margin: 'auto' }}>
              <Col md={4}>
                <Label>Taxes</Label>
              </Col>
              <Col md={4} className='text-right'>
                <Label>{formatCurrency(ordersSummary.taxes)}</Label>
              </Col>
            </Row>

            <Row style={{ margin: 'auto' }}>
              <Col md={4}>
                <Label>Shipping</Label>
              </Col>
              <Col md={4} className='text-right'>
                <Label>{formatCurrency(ordersSummary.shipping)}</Label>
              </Col>
            </Row>

            <Row style={{ margin: 'auto' }}>
              <Col md={4}>
                <Label>Total</Label>
              </Col>
              <Col md={4} className='text-right'>
                <Label>{formatCurrency(ordersSummary.total)}</Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

ReportOrders.propTypes = {
  ordersSummary: PropTypes.object.isRequired,
};

export default ReportOrders;
