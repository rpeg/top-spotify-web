import React from 'react';
import { createStore } from 'redux';
import io from "socket.io-client";

import OAuth from "./components/OAuth";
import { API_URL } from "./config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import app from './reducers/reducers';
import SpotifyTopMusic from './components/SpotifyTopMusic';
import MainHeader from './components/MainHeader';

const store = createStore(app);

const socket = io(API_URL);

const App = () => {
  return (
    <div className="App">
      <OAuth socket={socket} />
      {/* {isLoggedIn && <MainHeader />}
      {isLoggedIn && <SectionTemplate title="All-time" timeRange="long" />} */}
    </div>
  );
};

export default App;
