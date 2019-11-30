import React from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

import OAuth from '../components/OAuth';
import { API_URL } from '../config';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHeader from '../components/MainHeader';
import SpotifyTopMusic from '../components/SpotifyTopMusic';

import Controls from '../components/Controls';
import Fab from '../components/Fab';

const socket = io(API_URL);

const App = () => {
  const hasClickedCreate = useSelector((state) => state.hasClickedCreate);

  return (
    <div className="App">
      <OAuth socket={socket} />
      <Controls />
      {hasClickedCreate && <MainHeader />}
      {hasClickedCreate && <SpotifyTopMusic socket={socket} />}
      {hasClickedCreate && <Fab />}
    </div>
  );
};

export default App;
