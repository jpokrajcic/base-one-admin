import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Label, Row, Col, CardHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BASE_URL, REPORTS, REPORT_DETAILS } from '../../../common/constants/RouteConstants';
import { formatCurrency } from '../../../common/utils/NumberUtils';
import moment from 'moment';
export default function ReportListRow(props) {
  const { report } = props;

  const { id, year, month, grossSales, returns, taxes, shipping, total } = report;

  const redirectRoute = `${BASE_URL}/${REPORTS}/${year}/${month}/${REPORT_DETAILS}`;

  function downloadSpreadsheetHandler() {}

  function downloadPdfHandler() {}

  return (
    <li key={id}>
      <Card>
        <CardHeader>
          <Row className='align-items-center'>
            <Col xs='8'>
              <Link to={redirectRoute}>
                <h3 className='mb-0'>{`${moment().month(month).format('MMMM')} ${year}`}</h3>
              </Link>
            </Col>
            <Col className='text-right' xs='4'>
              <Button color='primary' href='#pablo' onClick={downloadSpreadsheetHandler} size='md'>
                <i className={'fas fa-file-excel'} />
              </Button>
              <Button color='primary' href='#pablo' onClick={downloadPdfHandler} size='md'>
                <i className={'fas fa-file-pdf'} />
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row style={{ margin: 'auto' }}>
            <Col md={4}>
              <Label>Gross sales</Label>
            </Col>
            <Col md={4} className='text-right'>
              <Label>{formatCurrency(grossSales)}</Label>
            </Col>
          </Row>

          <Row style={{ margin: 'auto' }}>
            <Col md={4}>
              <Label>Returns</Label>
            </Col>
            <Col md={4} className='text-right'>
              <Label>{formatCurrency(returns)}</Label>
            </Col>
          </Row>

          <Row style={{ margin: 'auto' }}>
            <Col md={4}>
              <Label>Taxes</Label>
            </Col>
            <Col md={4} className='text-right'>
              <Label>{formatCurrency(taxes)}</Label>
            </Col>
          </Row>

          <Row style={{ margin: 'auto' }}>
            <Col md={4}>
              <Label>Shipping</Label>
            </Col>
            <Col md={4} className='text-right'>
              <Label>{formatCurrency(shipping)}</Label>
            </Col>
          </Row>

          <Row style={{ margin: 'auto' }}>
            <Col md={4}>
              <Label>Total</Label>
            </Col>
            <Col md={4} className='text-right'>
              <Label>{formatCurrency(total)}</Label>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </li>
  );

  // return (
  //   <li key={id}>
  //     <Card>
  //       <CardBody>
  //         <CardTitle>
  //           <Link className={'name'} to={redirectRoute}>
  //             {name}
  //           </Link>
  //         </CardTitle>
  //         <Row style={{ margin: 'auto' }}>
  //           <Col className='col-6'>
  //             <Row>
  //               <Label>Gross sales</Label>
  //             </Row>
  //             <Row>
  //               <Label>Returns</Label>
  //             </Row>
  //             <Row>
  //               <Label>Taxes</Label>
  //             </Row>
  //             <Row>
  //               <Label>Shipping</Label>
  //             </Row>
  //             <Row>
  //               <Label>Total</Label>
  //             </Row>
  //           </Col>
  //           <Col className='col-6'>
  //             <Row>
  //               <Label>{formatCurrency(grossSales)}</Label>
  //             </Row>
  //             <Row>
  //               <Label>{formatCurrency(returns)}</Label>
  //             </Row>
  //             <Row>
  //               <Label>{formatCurrency(taxes)}</Label>
  //             </Row>
  //             <Row>
  //               <Label>{formatCurrency(shipping)}</Label>
  //             </Row>
  //             <Row>
  //               <Label>{formatCurrency(total)}</Label>
  //             </Row>
  //           </Col>
  //         </Row>
  //       </CardBody>
  //     </Card>
  //   </li>
  // );
}

ReportListRow.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    grossSales: PropTypes.number.isRequired,
    returns: PropTypes.number.isRequired,
    taxes: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }),
};
