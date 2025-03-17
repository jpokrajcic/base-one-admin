import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Card } from 'reactstrap';
import List from 'list.js';
import { DEFAULT_LISTJS_PROPS } from '../../../common/constants/GeneralConstants';
import UserTableRow from './UserTableRow';

const LIST_CONTAINER_ID = 'users-list-container';

function UsersTable(props) {
  const { users, searchValue } = props;

  const [list, setList] = useState();

  // Set list.js configuration
  const LIST_PROPS = Object.assign(DEFAULT_LISTJS_PROPS, { valueNames: ['name', 'email', 'role'] });

  useEffect(() => {
    if (users) {
      const _list = new List(LIST_CONTAINER_ID, LIST_PROPS);
      if (_list.size()) {
        _list.sort('name', { product: 'asc' });
      }

      setList(_list);
    }
  }, [users, LIST_PROPS]);

  useEffect(() => {
    if (list && searchValue) list.search(searchValue);
  }, [searchValue, list]);

  return (
    <Row className='row' id={LIST_CONTAINER_ID}>
      <div className='col-xl-12'>
        <Card className='card mb-0'>
          <div className='table-responsive'>
            <table className='table align-items-center table-flush'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col' data-sort='name' className='sort'>
                    NAME
                  </th>
                  <th scope='col' data-sort='email' className='sort'>
                    EMAIL
                  </th>
                  <th scope='col' data-sort='role' className='sort'>
                    ROLE
                  </th>
                  <th scope='col' className='text-right'>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              {users && (
                <tbody className='list'>
                  {users.map((user) => (
                    <UserTableRow key={user.id} user={user} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </Card>
        <nav aria-label='...'>
          <ul className='pagination my-4 pagination-alt'></ul>
        </nav>
      </div>
    </Row>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array,
  searchValue: PropTypes.string,
};

export default UsersTable;
