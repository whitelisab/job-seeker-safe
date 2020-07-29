import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Home from './Home.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
