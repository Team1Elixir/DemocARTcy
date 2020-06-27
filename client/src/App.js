import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'

import './App.css';


function App() {
  return (
    <Router>
      <header>
        <nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/'>Login</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/register'>Register</Link></button>
  </form>
</nav>
          
          
      </header>

      <Switch>
        <Route 
          exact
          path='/'
          component={Login}
        />
        <Route
          path="/register"
          component={Register}
          />
      </Switch>
    </Router>
  );
}

export default App;
