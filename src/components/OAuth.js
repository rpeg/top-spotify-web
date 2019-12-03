import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { setUser } from '../actions/actions';
import { API_URL } from '../config';
import { selectUser } from '../reducers/selectors';

const buttonStyle = {
  right: '30px', top: '30px', marginBottom: '30px', position: 'absolute',
};

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
    <div>
      {user && user.id ? (
        <Button variant="outline-primary" style={buttonStyle} onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="outline-primary" style={buttonStyle} onClick={startAuth}>
          Login
        </Button>
      )}
    </div>
  );
};

OAuth.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default OAuth;
