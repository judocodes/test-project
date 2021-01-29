import React, { PropsWithChildren, ReactElement } from 'react';
import { Router } from '@reach/router';
import Dashboard from '../client-only/Dashboard';

function Index(props: PropsWithChildren<Props>): ReactElement {
  return (
    <Router basepath="/">
      <Dashboard />
    </Router>
  );
}

interface Props {}

export default Index;
