import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import SimpleTextInputField from './SimpleTextInputField';

export default function TextInputField(props) {
  const { fieldName, isRequired, validator } = props;

  function validateRequired(value) {
    const val = value && value.trim();
    return !val && isRequired ? 'Required' : undefined;
  }

  return (
    <Field component={SimpleTextInputField} name={fieldName} validate={validator || validateRequired} {...props} />
  );
}

TextInputField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  validator: PropTypes.func,
};
