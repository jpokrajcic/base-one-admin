import React from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, Input } from 'reactstrap';

function SimpleTextInputField(props) {
  const { disabled, id, input, label, maxLength, meta = {}, placeholder, type = 'text' } = props;

  return (
    <FormGroup>
      <Label htmlFor={id} className='form-control-label'>
        {label}
      </Label>
      <div>
        <Input
          {...input}
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          type={type}
          invalid={meta.error && meta.touched}
        />
        <div className='invalid-feedback'>{meta.error}</div>
      </div>
    </FormGroup>
  );
}

SimpleTextInputField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  maxLength: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default SimpleTextInputField;
