import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [artists, setArtists] = useState([]);

  const loginSpotify = e => {
    e.preventDefault();
    axios
      .get("http://localhost:3000/login")
      .then(res => (window.location.href = res.data))
      .catch(err => console.log(err));
  };

  const getData = e => {
    e.preventDefault();
    axios
      .get("http://localhost:3000/my-top-artists")
      .then(res => 
        setArtists(res.data.items))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Button variant="outline-primary" onClick={loginSpotify}>
        Login
      </Button>
      <Button variant="outline-primary" onClick={getData}>
        Get data
      </Button>
      <div>
        <center>
          <h1>Artist List</h1>
        </center>
        {artists.map(artist => (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{artist.name}</h5>
              <img src={artist.images[0].url} alt={artist.name} />
              <p>{artist.genres[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
