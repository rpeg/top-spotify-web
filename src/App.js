import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import io from 'socket.io-client';

import OAuth from './components/OAuth';
import { API_URL } from './config';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './reducers/reducers';
import SpotifyTopMusic from './components/SpotifyTopMusic';
import MainHeader from './components/MainHeader';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const socket = io(API_URL);

const App = () => (
  <div className="App">
    <OAuth socket={socket} />
    {/* {isLoggedIn && <MainHeader />}
      {isLoggedIn && <SectionTemplate title="All-time" timeRange="long" />} */}
  </div>
);

export default App;
