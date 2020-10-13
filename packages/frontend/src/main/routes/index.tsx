import React from 'react';
import { Switch } from 'react-router-dom';

import AccountLog from '../../presentation/pages/AccountLog';
import Dashboard from '../../presentation/pages/Dashboard';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={AccountLog} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
