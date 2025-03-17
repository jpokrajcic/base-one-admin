import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';

import { BANK_ACCOUNTS, TRANSACTIONS } from '../../../common/constants/RouteConstants';
import BankAccounts from './bankAccounts/BankAccounts';
import Transactions from './transactions/Transactions';

function Account(props) {
  const { match } = props;
  return (
    <div className='container-fluid'>
      <Switch>
        <Route exact path={`${match.path}/${BANK_ACCOUNTS}`} component={BankAccounts} />
        <Route exact path={`${match.path}/${TRANSACTIONS}`} component={Transactions} />
      </Switch>
    </div>
  );
}

export default inject((root) => ({ Store: root.RootStore.dummyStore }))(observer(Account));
