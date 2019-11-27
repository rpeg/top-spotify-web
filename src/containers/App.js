import React from 'react';
import io from 'socket.io-client';

import OAuth from '../components/OAuth';
import { API_URL } from '../config';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHeader from '../components/MainHeader';
import SpotifyTopMusic from '../components/SpotifyTopMusic';

const socket = io(API_URL);

const App = () => (
  <div className="App">
    <OAuth socket={socket} />
    <MainHeader />
    <SpotifyTopMusic socket={socket} />
  </div>
);

export default App;
