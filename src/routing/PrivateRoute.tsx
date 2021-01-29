import React, { ReactElement, useState, ReactNode } from 'react';
import { navigate } from 'gatsby';
import { Auth } from 'aws-amplify';
import { GlobalLayout } from '../layout/GlobalLayout';

export function PrivateRoute({
  path,
  component: Component,
}: Props): ReactElement | null {
  var [authenticated, setAuthenticated] = useState(false);
  Auth.currentAuthenticatedUser()
    .then(function allowRoute() {
      setAuthenticated(true);
    })
    .catch(function redirectRoute() {
      navigate('/login');
    });

  if (!authenticated) {
    return null;
  } else {
    return <GlobalLayout>{Component}</GlobalLayout>;
  }
}

interface Props {
  path: string;
  component: ReactNode;
}
