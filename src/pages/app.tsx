import React, { ReactElement } from 'react';
import { Router } from '@reach/router';
import Dashboard from '../client-only/Dashboard';
import { PrivateRoute } from '../routing/PrivateRoute';

interface Props {}

function app({}: Props): ReactElement {
  return (
    <Router basepath="/app">
      <PrivateRoute path="/dashboard" component={<Dashboard />} />
    </Router>
  );
}

export default app;
