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

function App() {
  return (
    <Router>
      <div className="header">
        <Navbar />
      </div>
      <div className="content">
        <Switch>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/liveSketch">
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
          <Route path="/progress-client">
            <Progress />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
