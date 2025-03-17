import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useAbility } from '@casl/react';
import history from './common/history';
import { AbilityContext } from './common/PermissionContext';
import { updateAbility } from './common/ability';
import {
  BASE_URL,
  AUTH,
  AUTH_LOGIN,
  DASHBOARD,
  PRODUCTS,
  ORDERS,
  REPORTS,
  INTEGRATIONS,
  USERS,
  ACCOUNT,
} from './common/constants/RouteConstants';
import Auth from './containers/auth/Auth';
import Main from './containers/main/Main';

function App(props) {
  const { AuthStore, location } = props;
  const ability = useAbility(AbilityContext);

  // Load user profile on app init
  useEffect(() => {
    // Skip loading user profile if still on login page
    if (location.pathname.indexOf(`/${AUTH}/`) >= 0) {
      return;
    }
    AuthStore.init().then((userProfile) => {
      if (!AuthStore.userProfile) {
        history.push(`${BASE_URL}/${AUTH}/${AUTH_LOGIN}`);
      } else {
        updateAbility(ability, userProfile);
      }
    });
  }, [AuthStore, location.pathname, ability]);

  return (
    <Switch>
      <Route path={`${BASE_URL}/${AUTH}`} component={Auth} />
      <Route exact path={`${BASE_URL}/${DASHBOARD}`} component={Main} />
      <Route exact path={`${BASE_URL}/${PRODUCTS}`} component={Main} />
      <Route exact path={`${BASE_URL}/${ORDERS}`} component={Main} />
      <Route path={`${BASE_URL}/${REPORTS}`} component={Main} />
      <Route exact path={`${BASE_URL}/${INTEGRATIONS}`} component={Main} />
      <Route path={`${BASE_URL}/${USERS}`} component={Main} />
      <Route path={`${BASE_URL}/${ACCOUNT}`} component={Main} />
      <Redirect from='*' to={`${BASE_URL}/${DASHBOARD}`} />
    </Switch>
  );
}

export default inject((root) => ({ AuthStore: root.RootStore.authStore }))(observer(App));
