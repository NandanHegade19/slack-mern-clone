import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from './Chat'
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <Header />
              <div className="app__body">
                <Sidebar />
                <Switch>
                  <Route path="/room/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                    <div className="homepage">
                      <h1>Welcome to Slack</h1>
                      <h3>Let's set up your team</h3>
                      <p>Add channels to begin</p>
                    </div>
                  </Route>
                </Switch>
              </div>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
