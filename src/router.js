import React from 'react';
import { Route, Switch } from 'react-router';

import App from './components/App';

export const routes = (
  <Switch>
    <Route component={App} />
  </Switch>
);
