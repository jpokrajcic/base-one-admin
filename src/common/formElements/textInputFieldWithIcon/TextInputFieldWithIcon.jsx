import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import SimpleTextInputFieldWithIcon from './SimpleTextInputFieldWithIcon';

export default function TextInputFieldWithIcon(props) {
  const { fieldName, isRequired, validator } = props;

  function validateRequired(value) {
    const val = value && value.trim();
    return !val && isRequired ? 'Required' : undefined;
  }

  return (
    <Field
      component={SimpleTextInputFieldWithIcon}
      name={fieldName}
      validate={validator || validateRequired}
      {...props}
    />
  );
}

TextInputFieldWithIcon.propTypes = {
  fieldName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  validator: PropTypes.func,
};
