import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import SimpleDatePickerInputField from './SimpleDatePickerInputField';

export default function DatePickerInputField(props) {
  const { fieldName, isRequired } = props;

  function validateRequired(value) {
    return !value && isRequired ? 'Required' : undefined;
  }

  return <Field component={SimpleDatePickerInputField} name={fieldName} validate={validateRequired} {...props} />;
}

DatePickerInputField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};
