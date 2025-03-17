import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export default function SimpleTextInputFieldWithIcon(props) {
  const { classModifier = '', icon, placeholder, input, id, disabled } = props;
  return (
    <FormGroup className={`${classModifier}`}>
      <InputGroup className='input-group-merge input-group-alternative'>
        {icon && (
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className={`fas fa-${icon}`} />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          {...input}
          disabled={disabled}
          id={id}
          className={'form-control'}
          placeholder={placeholder}
          type={input.type}
        />
      </InputGroup>
    </FormGroup>
  );
}

SimpleTextInputFieldWithIcon.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  classModifier: PropTypes.string,
};
