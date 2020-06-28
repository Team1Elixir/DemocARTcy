import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Progress from './components/Progress'
import EditForm from './components/EditForm'
import MainWork from './components/MainWork'
import UserWork from './components/UserWork'
import AddWork from './components/AddWork'
import AddCommission from './components/AddCommission'
import DetailWork from './components/DetailWork'
import DetailCommission from './components/DetailCommission'
import MainCommission from './components/MainCommission'
import UserCommission from './components/UserCommission'
import './App.css'

function App() {
  return (
    <Router>
    <div className='App'>
      <div className="header">
        <Navbar />
      </div>
      {/* <div className="content"> */}
        <Switch>
          <Route path="/profile/edit/:username">
            <EditForm />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/works/user/:username">
            <UserWork />
          </Route>
          <Route path="/commissions/user/:username">
            <UserCommission />
          </Route>
          <Route path="/works/detail/:id">
            <DetailWork />
          </Route>
          <Route path="/commissions/detail/:id">
            <DetailCommission />
          </Route>
          <Route path="/works/add">
            <AddWork />
          </Route>
          <Route path="/commissions/add">
            <AddCommission />
          </Route>
          <Route path="/works">
            <MainWork />
          </Route>
          <Route path="/commissions">
            <MainCommission />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/progress-client">
            <Progress />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    {/* </div> */}
    </Router>
  );
}

export default App;
