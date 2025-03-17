import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAbility } from '@casl/react';
import { BASE_URL, USERS, EDIT_USER } from '../../../common/constants/RouteConstants';
import { EDIT, USER } from '../../../common/ability';
import { AbilityContext } from '../../../common/PermissionContext';

export default function UserTableRow(props) {
  const { user } = props;
  const { id, name, email, role } = user;
  const ability = useAbility(AbilityContext);
  const [redirectRoute, setRedirectRoute] = useState('');

  useEffect(() => {
    console.log('kojik');
    ability.can(EDIT, USER)
      ? setRedirectRoute(`${BASE_URL}/${USERS}/${id}/${EDIT_USER}`)
      : setRedirectRoute(`${BASE_URL}/${USERS}`);
  }, [id, ability]);

  return (
    <tr>
      <th scope='row'>
        <Link className={'name'} to={redirectRoute}>
          {name}
        </Link>
      </th>
      <td className={'email'}>{email}</td>
      <td className={'role'}>{role ? role.label : ''}</td>
      <td className='text-right'>
        {ability.can(EDIT, USER) && (
          <Link className='btn btn-sm btn-neutral' to={redirectRoute}>
            Edit
          </Link>
        )}
      </td>
    </tr>
  );
}

UserTableRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.object.isRequired,
  }).isRequired,
};
