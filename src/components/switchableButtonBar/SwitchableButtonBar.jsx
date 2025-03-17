import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'reactstrap';
import { DELETE } from '../../common/ability';
import { PermissionContext } from '../../common/PermissionContext';

export default function SwitchableButtonBar({
  updateAction,
  removeAction,
  archiveAction,
  isNew,
  labelUpdate = 'Update',
  labelArchive = 'Archive',
  labelRemove = 'Delete',
  permissionTarget,
}) {
  return (
    <Row className='align-items-center'>
      <Col className='text-left'>
        <Button color='primary' href='#pablo' onClick={updateAction} type='submit'>
          {isNew ? 'Save' : labelUpdate}
        </Button>
      </Col>
      {removeAction && (
        <PermissionContext I={DELETE} a={permissionTarget}>
          <Button className='btn text-danger btn-neutral' onClick={removeAction}>
            <i className='fas fa-trash mr-1' />
            {isNew ? 'Cancel' : labelRemove}
          </Button>
        </PermissionContext>
      )}
    </Row>
  );
}

SwitchableButtonBar.propTypes = {
  updateAction: PropTypes.func,
  archiveAction: PropTypes.func,
  removeAction: PropTypes.func,
  isNew: PropTypes.bool,
  labelUpdate: PropTypes.string,
  labelRemove: PropTypes.string,
  permissionTarget: PropTypes.string,
};
