import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ArtistGrid from "./components/ArtistGrid";
import TrackGrid from "./components/TrackGrid";
import WordCloud from "./components/WordCloud";
import Profile from "./components/Profile";

const App = () => {
  const [artistsLongTerm, setArtistsLongTerm] = useState([]);
  const [artistsMedTerm, setArtistsMedTerm] = useState([]);
  const [artistsShortTerm, setArtistsShortTerm] = useState([]);
  const [tracksLongTerm, setTracksLongTerm] = useState([]);
  const [tracksMedTerm, setTracksMedTerm] = useState([]);
  const [tracksShortTerm, setTracksShortTerm] = useState([]);
  const [profile, setProfile] = useState({});

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
    getTracksLongTerm();
    getProfile();
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

  const getTracksLongTerm = () => {
    axios
      .get("http://localhost:3000/my-top-tracks", {
        params: {
          time_range: "long_term",
          limit: 50
        }
      })
      .then(res => setTracksLongTerm(res.data.items))
      .catch(err => console.log(err));
  };

  const getTracksMedTerm = () => {
    axios
      .get("http://localhost:3000/my-top-tracks", {
        params: {
          time_range: "medium_term",
          limit: 50
        }
      })
      .then(res => setTracksMedTerm(res.data.items))
      .catch(err => console.log(err));
  };

  const getTracksShortTerm = () => {
    axios
      .get("http://localhost:3000/my-top-tracks", {
        params: {
          time_range: "short_term",
          limit: 50
        }
      })
      .then(res => setTracksShortTerm(res.data.items))
      .catch(err => console.log(err));
  };

  const getProfile = () => {
    axios
      .get("http://localhost:3000/my-profile")
      .then(res => setProfile(res.data))
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
      {!isEmpty(profile) && (
        <Profile userName={profile.id} imageSrc={profile.images[0].url} />
      )}
      {tracksLongTerm.length > 0 && <TrackGrid tracks={tracksLongTerm} title="All-time tracks" count={5}/>}
      {artistsLongTerm.length > 0 && artistsMedTerm.length > 0 && (
        <WordCloud
          genres={[
            ...artistsLongTerm.map(a => a.genres).flat(),
            ...artistsMedTerm.map(a => a.genres).flat()
          ]}
          count={100}
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
