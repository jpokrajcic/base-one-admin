import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import RangePickerOverlay from './RangePickerOverlay';

export default function SimpleDatePickerInputField(props) {
  const {
    id,
    label,
    input,
    meta,
    disabled,
    placeholder,
    dayPickerProps,
    onDayChange,
    value,
    showCalendar,
    returnDayEndTime = false,
  } = props;
  const inputEl = useRef(null);

  useEffect(() => {
    if (showCalendar && inputEl.current && inputEl.current.input) {
      inputEl.current.input.focus();
      inputEl.current.showDayPicker();
    }
  }, [showCalendar]);

  useEffect(() => {
    if (inputEl && inputEl.current) inputEl.current.hideDayPicker();
  }, [value]);

  function handleChange(day) {
    // DayPickerInput returns local date/time but always with time 12:00
    let selectedDate;
    if (day) {
      if (returnDayEndTime) {
        selectedDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
      } else {
        selectedDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
      }
    }

    input ? input.onChange(selectedDate) : onDayChange(selectedDate);
  }

  return (
    <FormGroup className='col-6' data-testid={`${id}-wrapper`}>
      <Label className='form-control-label' data-testid={`${id}-group-label`}>
        {label}
      </Label>

      <div className='InputFromTo input-group'>
        <DayPickerInput
          {...input}
          id={id}
          ref={inputEl}
          value={input ? input.value : value}
          data-testid={`${id}-date-picker`}
          disabled={disabled}
          placeholder={placeholder}
          onDayChange={(day) => handleChange(day)}
          dayPickerProps={dayPickerProps}
          inputProps={{ className: 'form-control' }}
          overlayComponent={RangePickerOverlay}
          classNames={{ container: 'DayPickerInput w-100', overlay: '' }}
        />
        {meta && (
          <div className='invalid-feedback' data-testid={`${id}-error`}>
            {meta.error}
          </div>
        )}
      </div>
    </FormGroup>
  );
}

SimpleDatePickerInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  dayPickerProps: PropTypes.object,
  onDayChange: PropTypes.func,
  value: PropTypes.object,
  showCalendar: PropTypes.bool,
  returnDayEndTime: PropTypes.bool,
};
