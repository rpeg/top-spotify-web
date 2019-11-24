import React from 'react';
import axios from 'axios';
import { createStore } from 'redux';
import { Button } from 'react-bootstrap';
import { useQueryParam, BooleanParam } from 'use-query-params';

import app from './reducers/reducers';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyTopMusic from './components/SpotifyTopMusic';
import MainHeader from './components/MainHeader';

const store = createStore(app);

const App = () => {
  const [isLoggedIn] = useQueryParam('login', BooleanParam);

  const loginSpotify = (e) => {
    e.preventDefault();
    axios
      .get('http://localhost:3000/login')
      .then((res) => { window.location.href = res.data; })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Button
        variant="outline-primary"
        onClick={loginSpotify}
        hidden={isLoggedIn}
      >
        Login to Spotify
      </Button>
      {isLoggedIn && <MainHeader />}
      {isLoggedIn && <SpotifyTopMusic title="All-time" timeRange="long" />}
    </div>
  );
};

export default App;
