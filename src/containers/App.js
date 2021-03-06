import React from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import NavBar from '../components/NavBar';
import { BASE_API_URL, DB_URL } from '../config';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHeader from '../components/MainHeader';
import SpotifyTopMusic from '../components/SpotifyTopMusic';

import Controls from '../components/Controls';
import Splash from '../components/Splash';
import { selectHasClickedCreate, selectUser } from '../reducers/selectors';

const socket = io(BASE_API_URL);

const App = () => {
  const hasClickedCreate = useSelector(selectHasClickedCreate);
  const user = useSelector(selectUser);

  // ping database server to wake
  axios.get(DB_URL);

  return (
    <div className="App">
      <NavBar socket={socket} />
      <Controls />
      {hasClickedCreate && (
        <div id="top-spotify">
          <MainHeader />
          <SpotifyTopMusic />
        </div>
      )}
      {!user.id && (
        <Splash />
      )}
    </div>
  );
};

export default App;
