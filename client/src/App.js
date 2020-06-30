import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import LiveSketch from "./components/LiveSketch.js";
import Progress from "./components/Progress";
import Chat from "./components/Chat/Chat";
import EditForm from './components/EditForm'
import MainWork from './components/MainWork'
import UserWork from './components/UserWork'
import AddWork from './components/AddWork'
import AddCommission from './components/AddCommission'
import DetailWork from './components/DetailWork'
import DetailCommission from './components/DetailCommission'
import MainCommission from './components/MainCommission'
import UserCommission from './components/UserCommission'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css'

function App() {
  return (
    <Router>
      <div className="header">
        <Navbar />
      </div>
      <div className="content">
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
          <Route path="/livesketch">
            <LiveSketch />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path={["/progress-client", "/progress-artist"]}>
            <Progress />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <div className='little-footie page-footer font-small blue fixed-bottom'>
          <p className='footie-text'>Copyright © Elixir Fox Alpha Team 2020</p>
      </div>
    </Router>
  );
}

export default App;
