import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';

export default function IntegrationListRow(props) {
  const { department } = props;
  const { id, name, services } = department;

  return (
    <li key={id}>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3 className='mb-0'>{name}</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {services.map((service, index) => (
            <Fragment>
              <Row key={service.id}>
                <Col lg='3'>
                  <img alt='...' src={`/assets/images/${service.logo}.png`} style={{ width: '35%' }} />
                </Col>
                <Col lg='6'>
                  <label>{service.name}</label>
                </Col>
                <Col lg='3' className='text-center'>
                  {service.isIntegrated && <i className={'fas fa-check-circle text-primary'} />}
                </Col>
              </Row>
              {index !== services.length - 1 && <hr className='my-4' />}
            </Fragment>
          ))}
        </CardBody>
      </Card>
    </li>
  );
}

IntegrationListRow.propTypes = {
  department: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    services: PropTypes.array.isRequired,
  }),
};
