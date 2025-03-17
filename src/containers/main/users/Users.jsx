import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import history from '../../../common/history';
import { USER } from '../../../common/ability';
import { NEW_USER } from '../../../common/constants/RouteConstants';
import ActionBar from '../../../components/actionBar/ActionBar';
import UsersTable from './UsersTable';

function Users(props) {
  const { Store, match } = props;

  const [users, setUsers] = useState();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    Store.getAll().then((result) => {
      if (result) setUsers(result);
    });
  }, [Store]);

  function searchChangeHandler(newSearchValue) {
    setSearchValue(newSearchValue);
  }

  function addNew() {
    history.push(`${match.path}/${NEW_USER}`);
  }

  return (
    <Fragment>
      <ActionBar
        addNew={addNew}
        label='Manage users'
        hasButton={true}
        hasSearch={true}
        buttonLabel='New user'
        onSearchChange={searchChangeHandler}
        createPermission={USER}
      />
      <UsersTable users={users} searchValue={searchValue} />
    </Fragment>
  );
}

Users.propTypes = {
  Store: PropTypes.object.isRequired,
};

export default inject((root) => ({ Store: root.RootStore.usersStore }))(observer(Users));
