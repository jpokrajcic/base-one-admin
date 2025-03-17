import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ActionBar from '../../../components/actionBar/ActionBar';
import UserForm from './UserForm';

function UserCreate(props) {
  const { UsersStore } = props;

  const roles = UsersStore.roles;

  useEffect(() => {
    UsersStore.getRoles();
  }, [UsersStore]);

  return (
    <Fragment>
      <ActionBar label='New user' />
      <UserForm user={null} roles={roles} />
    </Fragment>
  );
}

UserCreate.propTypes = {
  UsersStore: PropTypes.object.isRequired,
};

export default inject((root) => ({ UsersStore: root.RootStore.usersStore }))(observer(UserCreate));
