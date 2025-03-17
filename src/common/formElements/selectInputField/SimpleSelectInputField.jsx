import React from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, Input } from 'reactstrap';

export default function SimpleSelectInputField(props) {
  const { choices, id, label, firstOptionEmpty = false, input, meta = {}, disabled, onSelectionChange } = props;

  const { onChange } = input;

  const mergedOnChange = (event) => {
    if (onSelectionChange) onSelectionChange(event);
    onChange(event);
  };

  const newInput = { ...input, onChange: mergedOnChange };

  return (
    <FormGroup>
      <Label htmlFor={id} className='form-control-label'>
        {label}
      </Label>
      <div>
        <Input {...newInput} id={id} disabled={disabled} type='select' invalid={meta && meta.error && meta.touched}>
          {firstOptionEmpty && <option value='' />}
          {choices.map((choice) => (
            <option key={`${id}-${choice[0]}`} value={choice[0]}>
              {choice[1]}
            </option>
          ))}
        </Input>
        {meta && meta.error && <div className='invalid-feedback'>{meta.error}</div>}
      </div>
    </FormGroup>
  );
}

SimpleSelectInputField.propTypes = {
  choices: PropTypes.array,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  firstOptionEmpty: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  onSelectionChange: PropTypes.func,
};
