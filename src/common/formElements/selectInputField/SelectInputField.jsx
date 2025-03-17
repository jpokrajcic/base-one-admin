import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import SimpleSelectInputField from './SimpleSelectInputField';

export default function SelectInputField(props) {
  const { fieldName, isRequired } = props;

  function validateRequired(value) {
    return !value && isRequired ? 'Required' : undefined;
  }

  return <Field component={SimpleSelectInputField} name={fieldName} validate={validateRequired} {...props} />;
}

SelectInputField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};
