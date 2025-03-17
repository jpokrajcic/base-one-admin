import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import RootStore from './store/RootStore';
import history from './common/history';
import ability from './common/ability';
import { AbilityContext } from './common/PermissionContext';
import reportWebVitals from './reportWebVitals';

import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import 'toastr/build/toastr.css';
import './assets/scss/argon-dashboard-pro-react.scss?v1.0.0';

configure({
  enforceActions: 'observed',
});

ReactDOM.render(
  <React.StrictMode>
    <AbilityContext.Provider value={ability}>
      <Provider RootStore={new RootStore()}>
        <Router history={history}>
          <Route path='/' component={App} />
        </Router>
      </Provider>
    </AbilityContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
