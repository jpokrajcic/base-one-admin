import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ActionBar from '../../../components/actionBar/ActionBar';
import UserForm from './UserForm';

function UserEdit(props) {
  const { UsersStore, match } = props;

  const userId = match.params.userId;
  const user = UsersStore.user;
  const roles = UsersStore.roles;

  useEffect(() => {
    if (userId) UsersStore.getById(userId);
    UsersStore.getRoles();
  }, [UsersStore, userId]);

  return (
    <Fragment>
      <ActionBar label='Update user' />
      <UserForm user={user} roles={roles} />
    </Fragment>
  );
}

UserEdit.propTypes = {
  UsersStore: PropTypes.object.isRequired,
};

export default inject((root) => ({ UsersStore: root.RootStore.usersStore }))(observer(UserEdit));
