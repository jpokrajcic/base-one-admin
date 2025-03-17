import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'reactstrap';
import { BASE_URL, DASHBOARD } from '../../common/constants/RouteConstants';
import { AbilityContext } from '../../common/PermissionContext';
import { updateAbility } from '../../common/ability';
import { useAbility } from '@casl/react';
import history from '../../common/history';
import { TextInputFieldWithIcon } from '../../common/formElements';

function Login(props) {
  const { Store } = props;
  const ability = useAbility(AbilityContext);

  const submitHandler = async (values) => {
    try {
      await Store.login(values.email, values.password, values.rememberMe);

      // Update ability rules based on logged in user permissions
      updateAbility(ability, Store.userProfile);

      history.push(`${BASE_URL}/${DASHBOARD}`);
    } catch (err) {}
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={submitHandler}
        render={({ handleSubmit }) => {
          return (
            <Form role='form'>
              <TextInputFieldWithIcon
                id={'input-user-email'}
                fieldName={'email'}
                placeholder={'Email'}
                icon={'envelope'}
                classModifier={'mb-3'}
                type={'email'}
                isRequired={true}
              />
              <TextInputFieldWithIcon
                id='input-user-password'
                fieldName='password'
                placeholder='Password'
                icon='lock'
                type='password'
                isRequired={true}
              />
              <div className='text-center'>
                <button type='submit' className='btn btn-primary mt-4' onClick={handleSubmit}>
                  Sign in
                </button>
              </div>
            </Form>
          );
        }}
      />
    </Fragment>
  );
}

export default inject((root) => ({ Store: root.RootStore.authStore }))(observer(Login));
