import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SimpleDatePickerInputField from '../../common/formElements/datePicker/SimpleDatePickerInputField';
import {
  THIS_WEEK,
  LAST_WEEK,
  THIS_MONTH,
  LAST_MONTH,
  RESET,
} from '../../common/formElements/datePicker/RangePickerOverlay';
import { Col } from 'reactstrap';

export default function RangePicker(props) {
  const { fromDate, toDate, rangeChange } = props;
  const [showToCalendar, setShowToCalendar] = useState(false);

  const modifiers = { start: fromDate, end: toDate };

  function handleFromChange(from) {
    rangeChange(from, toDate);
    if (!toDate) setShowToCalendar(true);
  }

  function handleToChange(to) {
    rangeChange(fromDate, to);
  }

  function predefinedRangeSelectHandler(predefinedPeriod) {
    let periodStart;
    let periodEnd;
    switch (predefinedPeriod) {
      case THIS_WEEK:
        periodStart = moment().startOf('week').toDate();
        periodEnd = moment().endOf('week').toDate();
        break;
      case LAST_WEEK:
        periodStart = moment().subtract(1, 'weeks').startOf('week').toDate();
        periodEnd = moment().subtract(1, 'weeks').endOf('week').toDate();
        break;
      case THIS_MONTH:
        periodStart = moment().startOf('month').toDate();
        periodEnd = moment().endOf('month').toDate();
        break;
      case LAST_MONTH:
        periodStart = moment().subtract(1, 'months').startOf('month').toDate();
        periodEnd = moment().subtract(1, 'months').endOf('month').toDate();
        break;
      case RESET:
      default:
        periodStart = '';
        periodEnd = '';
        break;
    }

    rangeChange(periodStart, periodEnd);
  }

  return (
    <Col className='col-6'>
      <div className='d-flex date-range-group row'>
        <SimpleDatePickerInputField
          id='input-range-from-date'
          value={fromDate}
          placeholder='From'
          label='From'
          dayPickerProps={{
            selectedDays: [fromDate, { from: fromDate, to: toDate }],
            disabledDays: { after: toDate },
            toMonth: toDate,
            modifiers,
            numberOfMonths: 1,
            onPredefinedRangeSelect: predefinedRangeSelectHandler,
            showOverlayComponent: true,
          }}
          onDayChange={handleFromChange}
        />
        <SimpleDatePickerInputField
          id='input-range-to-date'
          value={toDate}
          placeholder='To'
          label='To'
          dayPickerProps={{
            selectedDays: [fromDate, { from: fromDate, to: toDate }],
            disabledDays: { before: fromDate },
            modifiers,
            month: toDate,
            fromMonth: fromDate,
            numberOfMonths: 1,
            onPredefinedRangeSelect: predefinedRangeSelectHandler,
            showOverlayComponent: true,
          }}
          onDayChange={handleToChange}
          showCalendar={showToCalendar}
          returnDayEndTime={true}
        />
      </div>
    </Col>
  );
}

RangePicker.propTypes = {
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  rangeChange: PropTypes.func,
};
