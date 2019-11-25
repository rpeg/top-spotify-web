import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { API_URL } from '../config';

const OAuth = ({ socket, user, setUser }) => {
  const [enabled, setEnabled] = useState(false);

  let popup;

  useEffect(() => {
    socket.on('spotifyUser', (spotifyUser) => {
      popup.close();
      setUser(spotifyUser);
    });
  });

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setEnabled(false);
      }
    }, 1000);
  };

  const openPopup = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/auth/login?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
    );
  };

  const startAuth = (e) => {
    if (!enabled) {
      e.preventDefault();
      popup = openPopup();
      checkPopup();
      setEnabled(false);
    }
  };

  const logout = () => {
    setUser({});
  };

  return (
    <div>
      {user.id ? (
        <Button variant="outline-primary" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="outline-primary" onClick={startAuth}>
          Login
        </Button>
      )}
    </div>
  );
};

OAuth.propTypes = {
  socket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default OAuth;
