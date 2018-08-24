import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './home';
import Admin from './admin';
import Callback from './callback';
import Auth from './auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = () => (
  <Router history={history} component={Home}>
    <div>
      {/* / route is the main route which renders the HOME component */}
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      {/* /home route also renders the HOME component, this is the same route 
      the user is redirected to after authentication */}
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      {/* Prevent access to admin routes unless user is an admin */}
      <Route path="/admin" render={(props) => (
        auth.userHasScopes(['write:messages']) ? (
          <Admin auth={auth} {...props} />
        ) : (
          <Home auth={auth} {...props} />
        )
      )} />
      {/* /callback route renders the Callback component and runs the
      handleAuthentcation function to parse the toek ninformation from
      Auth0's redirect URL */}
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </div>
  </Router>
);

export default Routes;