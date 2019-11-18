import React from "react";
import { Button } from "react-boostrap";

const SpotifyLoginButton = () => {
  const loginSpotify = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  return <Button onClick={loginSpotify}>Login</Button>;
};

export default SpotifyLoginButton;
