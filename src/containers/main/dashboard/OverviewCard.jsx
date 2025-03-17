import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, CardBody, CardTitle } from 'reactstrap';

function OverviewCard(props) {
  const { title, value } = props;

  return (
    <Col md='6' xl='3'>
      <Card className='card-stats'>
        <CardBody>
          <Row>
            <div className='col'>
              <CardTitle tag='h5' className='text-uppercase mb-0'>
                {title}
              </CardTitle>
              {value && <span className='h1 font-weight-bold mb-0'>{value}</span>}
            </div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}

OverviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default OverviewCard;
