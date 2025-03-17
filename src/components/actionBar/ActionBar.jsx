import React from 'react';
import PropTypes from 'prop-types';
import { CREATE } from '../../common/ability';
import { PermissionContext } from '../../common/PermissionContext';

export default function ActionBar(props) {
  const {
    addNew,
    label,
    hasButton = false,
    hasSearch = false,
    buttonLabel = '',
    onSearchChange,
    createPermission,
  } = props;

  return (
    <div className='row align-items-center py-4'>
      <div className='col-sm-12 col-lg-6 col-6'>
        <h6 className='h2 d-inline-block mb-0'>{label}</h6>
      </div>
      <div className='col-sm-12 col-lg-6 col-6'>
        <div className='row align-items-center'>
          {hasSearch && (
            <div className='col'>
              <div className='input-group input-group-alternative'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fas fa-search' />
                  </span>
                </div>
                <input
                  className='form-control form-control-alternative search'
                  placeholder='Search'
                  type='text'
                  onChange={(event) => onSearchChange(event.target.value)}
                />
              </div>
            </div>
          )}
          {hasButton && (
            <PermissionContext I={CREATE} a={createPermission}>
              <div className='col-auto'>
                <button className='btn btn-primary' onClick={addNew}>
                  {buttonLabel}
                </button>
              </div>
            </PermissionContext>
          )}
        </div>
      </div>
    </div>
  );
}

ActionBar.propTypes = {
  addNew: PropTypes.func,
  label: PropTypes.string.isRequired,
  hasButton: PropTypes.bool,
  hasSearch: PropTypes.bool,
  buttonLabel: PropTypes.string,
  onSearchChange: PropTypes.func,
  createPermission: PropTypes.string,
};
