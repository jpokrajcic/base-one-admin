import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import RangePicker from '../../../components/rangePicker/RangePicker';
import SimpleTextInputField from '../../../common/formElements/textInputField/SimpleTextInputField';

function OrderFilters(props) {
  const { fromDate, toDate, searchValue, rangeChange, searchChange, getData } = props;

  return (
    <Fragment>
      <Row>
        <RangePicker fromDate={fromDate} toDate={toDate} rangeChange={rangeChange} />
        <Col className='col-4'>
          <SimpleTextInputField
            id='input-customer-search'
            placeholder='Customer'
            label='Customer'
            type='text'
            input={{ value: searchValue, onChange: (event) => searchChange(event.target.value) }}
          />
        </Col>
        <div className='col-auto mt-auto'>
          <Row>
            <Col className='col-12 col-sm-6'>
              <FormGroup>
                <Button color='primary' onClick={getData}>
                  Get data
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Row>
    </Fragment>
  );
}

OrderFilters.propTypes = {
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  searchValue: PropTypes.string,
  rangeChange: PropTypes.func,
  searchChange: PropTypes.func,
  getData: PropTypes.func,
};

export default OrderFilters;
