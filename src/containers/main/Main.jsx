import React, { useRef, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import {
  BASE_URL,
  DASHBOARD,
  PRODUCTS,
  ORDERS,
  USERS,
  REPORTS,
  REPORT_DETAILS,
  INTEGRATIONS,
  NEW_USER,
  EDIT_USER,
  ACCOUNT,
} from '../../common/constants/RouteConstants';
import Sidebar from '../../components/sidebar/Sidebar';
import TopMainNavbar from '../../components/navbars/TopMainNavbar';

import Dashboard from './dashboard/Dashboard';
import Products from './products/Products';
import Orders from './orders/Orders';
import Reports from './reports/Reports';
import ReportDetails from './reports/ReportDetails';
import Integrations from './integrations/Integrations';
import Users from './users/Users';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';
import Account from './account/Account';

function Main(props) {
  const location = useLocation();
  const history = useHistory();

  const [sidenavOpen, changeSidenavOpen] = useState(true);
  const mainContentRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('g-sidenav-pinned');
  }, []);

  useEffect(() => {
    if (history.pathname !== location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContentRef.current.scrollTop = 0;
    }
  }, [history.pathname, location.pathname]);

  function toggleSidenav() {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    changeSidenavOpen(!sidenavOpen);
  }

  return (
    <React.Fragment>
      <Sidebar toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} />

      <div className='main-content' ref={mainContentRef}>
        <TopMainNavbar theme={'dark'} toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} />
        <div className='container-fluid'>
          <Switch>
            <Route exact path={`${BASE_URL}/${DASHBOARD}`} component={Dashboard} />
            <Route exact path={`${BASE_URL}/${PRODUCTS}`} component={Products} />
            <Route exact path={`${BASE_URL}/${ORDERS}`} component={Orders} />
            <Route exact path={`${BASE_URL}/${REPORTS}`} component={Reports} />
            <Route exact path={`${BASE_URL}/${REPORTS}/:year/:month/${REPORT_DETAILS}`} component={ReportDetails} />
            <Route exact path={`${BASE_URL}/${INTEGRATIONS}`} component={Integrations} />
            <Route exact path={`${BASE_URL}/${USERS}`} component={Users} />
            <Route exact path={`${BASE_URL}/${USERS}/${NEW_USER}`} component={UserCreate} />
            <Route exact path={`${BASE_URL}/${USERS}/:userId/${EDIT_USER}`} component={UserEdit} />

            <Route path={`${BASE_URL}/${ACCOUNT}`} component={Account} />
          </Switch>
        </div>
      </div>

      {sidenavOpen ? <div className='backdrop d-xl-none' onClick={toggleSidenav} /> : null}
    </React.Fragment>
  );
}

export default Main;
