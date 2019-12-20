import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { setUser } from '../actions/actions';
import { SPOTIFY_API_URL } from '../config';
import { selectUser } from '../reducers/selectors';

const OAuth = ({ socket }) => {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  let popup;

  useEffect(() => {
    socket.on('spotifyUser', (spotifyUser) => {
      if (popup) { popup.close(); }

      dispatch(setUser(spotifyUser));
    });
  });

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setDisabled(false);
      }
    }, 1000);
  };

  const openPopup = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${SPOTIFY_API_URL}/auth/login?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
    );
  };

  const startAuth = (e) => {
    if (!disabled) {
      e.preventDefault();
      popup = openPopup();
      checkPopup();
      setDisabled(true);
    }
  };

  const logout = () => {
    dispatch(setUser({}));
  };

  return (
    <div style={{
      top: '30px',
      right: '30px',
      position: 'absolute',
      marginBottom: '30px',
      display: 'inline-flex',
      alignItems: 'center',
    }}
    >
      <a href="https://github.com/scjohnson16/top-spotify-web" target="_blank" rel="noopener noreferrer" style={{ paddingRight: '30px' }}>
        <img height="30" width="30" src="images/GitHub-Mark-Light-64px.png" alt="github" />
      </a>
      <a href="mailto:topspotdeveloper@gmail.com" target="_top" style={{ paddingRight: '30px' }}>
        <img height="40" width="35" src="images/baseline_email_white_18dp.png" alt="email" />
      </a>
      {user && user.id ? (
        <Button className="button-logout" variant="primary" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button className="button-login" variant="primary" onClick={startAuth}>
          Login
        </Button>
      )}
    </div>
  );
};

OAuth.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};

export default OAuth;
