import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import './App.css';
import AddWork from './components/AddWork';
import AddCommission from './components/AddCommission';
import MainCommission from './components/MainCommission';
import MainWork from './components/MainWork';


function App() {
  return (
    <Router>
      <header>
        <nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/'>Login</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/register'>Register</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/addwork'>New Work</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/addcommission'>New Commission</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/works'>Works</Link></button>
    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to='/commissions'>Commissions</Link></button>
  </form>
</nav>
          
          
      </header>

      <Switch>
        <Route 
          exact
          path='/'
          component={LoginForm}
        />
        <Route
          path="/register"
          component={RegisterForm}
          />
          <Route
          path='/addwork'
          component={AddWork}/>
          <Route
          path='/addcommission'
          component={AddCommission}/>
          <Route
          path='/commissions'
          component={MainCommission}/>
          <Route
          path='/works'
          component={MainWork}/>
      </Switch>
    </Router>
  );
}

export default App;
