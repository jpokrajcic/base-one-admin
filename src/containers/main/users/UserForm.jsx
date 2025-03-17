import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Form } from 'react-final-form';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { useAbility } from '@casl/react';
import history from '../../../common/history';
import { ASSIGN, ADMIN_USER_ROLES, NON_ADMIN_USER_ROLES, USER } from '../../../common/ability';
import { BASE_URL, ACCOUNT, USERS, EDIT_USER } from '../../../common/constants/RouteConstants';
import { ROLE_IDS } from '../../../common/constants/RoleConstants';
import { SelectInputField, TextInputField } from '../../../common/formElements';
import { AbilityContext } from '../../../common/PermissionContext';
import SwitchableButtonBar from '../../../components/switchableButtonBar/SwitchableButtonBar';

function UserForm(props) {
  const { UsersStore, user, roles } = props;
  const userId = user ? user.id : null;

  const [defaultRole, setDefaultRole] = useState(null);
  const [allowedRoles, setAllowedRoles] = useState([]);

  const ability = useAbility(AbilityContext);

  const initialValues = userId
    ? {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    : {
        name: '',
        email: '',
        role: defaultRole,
      };

  useEffect(() => {
    if (roles.length > 0) {
      let role;

      const filteredRoles = [];
      for (const role of roles) {
        if (
          (role[0] === ROLE_IDS.ADMINISTRATOR && ability.can(ASSIGN, ADMIN_USER_ROLES)) ||
          (role[0] === ROLE_IDS.ACCOUNT_MANAGER && ability.can(ASSIGN, NON_ADMIN_USER_ROLES))
        )
          filteredRoles.push(role);
      }
      setAllowedRoles(filteredRoles);
      role = roles[0][0];

      setDefaultRole(role);
    }
  }, [roles, ability]);

  function onSubmit(values) {
    const user = {
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role,
    };

    if (userId) {
      UsersStore.update(userId, user);
    } else {
      UsersStore.create(user).then((createdUser) => {
        if (createdUser) history.push(`${BASE_URL}/${ACCOUNT}/${USERS}/${createdUser.id}/${EDIT_USER}`);
      });
    }
  }

  function deleteHandler() {
    if (!userId) history.goBack();

    UsersStore.remove(userId);
  }

  return (
    <Card>
      <CardHeader>
        <h3 className='mb-0'>User details</h3>
      </CardHeader>
      <CardBody>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ values, form, handleSubmit, submitting, pristine }) => {
            return (
              <form className='needs-validation' noValidate>
                <Row>
                  <Col md='4'>
                    <TextInputField
                      id='input-user-name'
                      placeholder='Enter name'
                      label='Name'
                      maxLength='80'
                      fieldName='name'
                      isRequired={true}
                      type='text'
                    />
                  </Col>
                  <Col md='4'>
                    <TextInputField
                      id='input-user-email'
                      placeholder='Enter e-mail'
                      label='E-mail'
                      maxLength='80'
                      fieldName='email'
                      isRequired={true}
                      type='text'
                    />
                  </Col>
                  <Col md='4'>
                    <SelectInputField
                      id='input-user-role'
                      label='Select role'
                      fieldName='role'
                      choices={allowedRoles}
                    />
                  </Col>
                </Row>

                <SwitchableButtonBar
                  updateAction={handleSubmit}
                  removeAction={deleteHandler}
                  isNew={!user}
                  labelRemove='Delete'
                  permissionTarget={USER}
                />
              </form>
            );
          }}
        />
      </CardBody>
    </Card>
  );
}

UserForm.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  UsersStore: PropTypes.object.isRequired,
};

export default inject((root) => ({ UsersStore: root.RootStore.usersStore }))(observer(UserForm));
