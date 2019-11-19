import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ArtistGrid from "./components/ArtistGrid";
import DonutChart from "./components/DonutChart";

const App = () => {
  const [artistsLongTerm, setArtistsLongTerm] = useState([]);
  const [artistsMedTerm, setArtistsMedTerm] = useState([]);
  const [artistsShortTerm, setArtistsShortTerm] = useState([]);

  const loginSpotify = e => {
    e.preventDefault();
    axios
      .get("http://localhost:3000/login")
      .then(res => (window.location.href = res.data))
      .catch(err => console.log(err));
  };

  // TODO multithreaded
  const getData = e => {
    e.preventDefault();
    getArtistsLongTerm();
    getArtistsMedTerm();
    getArtistsShortTerm();
  };

  const getArtistsLongTerm = () => {
    axios
      .get("http://localhost:3000/my-top-artists", {
        params: {
          time_range: "long_term",
          limit: 50
        }
      })
      .then(res => setArtistsLongTerm(res.data.items))
      .catch(err => console.log(err));
  };

  const getArtistsMedTerm = () => {
    axios
      .get("http://localhost:3000/my-top-artists", {
        params: {
          time_range: "medium_term",
          limit: 50
        }
      })
      .then(res => setArtistsMedTerm(res.data.items))
      .catch(err => console.log(err));
  };

  const getArtistsShortTerm = () => {
    axios
      .get("http://localhost:3000/my-top-artists", {
        params: {
          time_range: "short_term",
          limit: 50
        }
      })
      .then(res => setArtistsShortTerm(res.data.items))
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
      {artistsLongTerm.length > 0 && artistsMedTerm.length > 0 && (
        <DonutChart
          genres={[
            ...artistsLongTerm.map(a => a.genres).flat(),
            ...artistsMedTerm.map(a => a.genres).flat()
          ]}
          count={10}
        />
      )}
      <div>
        {artistsLongTerm.length > 0 && (
          <ArtistGrid
            artists={artistsLongTerm.slice(0, 8)}
            title="All time"
            numRows={2}
          />
        )}
        {artistsMedTerm.length > 0 && (
          <ArtistGrid
            artists={artistsMedTerm.slice(0, 8)}
            title="Past 6 months"
            numRows={2}
          />
        )}
        {artistsShortTerm.length > 0 && (
          <ArtistGrid
            artists={artistsShortTerm.slice(0, 8)}
            title="Recently"
            numRows={2}
          />
        )}
      </div>
    </div>
  );
};

export default App;
