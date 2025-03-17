import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import ActionBar from '../../../components/actionBar/ActionBar';
import RangePicker from '../../../components/rangePicker/RangePicker';
import ReportListRow from './ReportListRow';

function Reports(props) {
  const { ReportsStore } = props;

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const reports = ReportsStore.reports;

  useEffect(() => {
    setFromDate(new Date());
    setToDate(new Date());
    ReportsStore.getReports(moment().startOf('year').toDate(), moment().endOf('year').toDate());
  }, [ReportsStore]);

  function getDataHandler() {
    const from = fromDate ? moment(fromDate, 'YYYY/MM/DD', true).format() : '';
    const to = toDate ? moment(toDate, 'YYYY/MM/DD', true).format() : '';
    ReportsStore.getReports(from, to);
  }

  function rangeChangeHandler(rangeFrom, rangeTo) {
    setFromDate(rangeFrom);
    setToDate(rangeTo);
  }

  return (
    <Fragment>
      <ActionBar label='Reports' />
      <Row>
        <RangePicker fromDate={fromDate} toDate={toDate} rangeChange={rangeChangeHandler} />
        <Col className='col-auto mt-auto'>
          <FormGroup>
            <Button color='primary' onClick={getDataHandler}>
              Get data
            </Button>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className='list-unstyled'>
            {reports.map((report) => (
              <ReportListRow key={report.id} report={report} />
            ))}
          </ul>
        </Col>
      </Row>
    </Fragment>
  );
}

Reports.propTypes = {
  ReportsStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  ReportsStore: root.RootStore.reportsStore,
}))(observer(Reports));
