import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

import { API_URL } from "../config";
import { Button } from "react-bootstrap";

const OAuth = ({ socket }) => {
  const [user, setUser] = useState({});
  const [enabled, setEnabled] = useState(false);

  let popup;

  useEffect(() => {
    socket.on('spotifyUser', user => {
      popup.close();
      setUser(user);
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
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/auth/login?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  const startAuth = e => {
    if (!enabled) {
      e.preventDefault();
      popup = openPopup();
      checkPopup();
      setEnabled(false);
    }
  };

  const closeCard = () => {
    setUser({});
  };

  return (
    <div>
      {user.id ? (
        <div className={"card"}>
          <FontAwesome
            name={"times-circle"}
            className={"close"}
            onClick={closeCard.bind(this)}
          />
          <h4>{user.id}</h4>
          <img src={user.image} alt={user.id} />
        </div>
      ) : (
        <div className={"button-wrapper fadein-fast"}>
          <Button variant="outline-primary" onClick={startAuth}>
            Login to Spotify
          </Button>
        </div>
      )}
    </div>
  );
};

OAuth.propTypes = {
  socket: PropTypes.object.isRequired
};

export default OAuth;
