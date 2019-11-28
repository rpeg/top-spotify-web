import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Container, Col, Row,
} from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import {
  TimeRanges, DEFAULT_ARTIST_COUNT, DEFAULT_TRACK_COUNT, DEFAULT_GENRE_COUNT,
} from '../constants/constants';
import {
  setTimeRange, setArtistCount, setTrackCount, setGenreCount, setHasClickedCreate,
} from '../actions/actions';

const useStyles = makeStyles({
  label: {
    '&.MuiFormLabel-root': {
      color: '#FFFFFF',
      fontFamily: "'Karla', sans-serif",
    },
  },
  select: {
    color: '#FFFFFF',
    fontFamily: "'Karla', sans-serif",

    '&.MuiInput-underline:before': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
    },
    '& svg': {
      color: '#FFFFFF',
    },
  },
  slider: {
    '&.MuiSlider-root': {
      color: '#1DB954',
    },
  },
});

const Controls = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRanges.LONG);
  const [selectedArtistCount, setSelectedArtistCount] = useState(DEFAULT_ARTIST_COUNT);
  const [selectedTrackCount, setSelectedTrackCount] = useState(DEFAULT_TRACK_COUNT);
  const [selectedGenreCount, setSelectedGenreCount] = useState(DEFAULT_GENRE_COUNT);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const processClick = () => {
    dispatch(setTimeRange(selectedTimeRange));
    dispatch(setGenreCount(selectedGenreCount));
    dispatch(setArtistCount(selectedArtistCount));
    dispatch(setTrackCount(selectedTrackCount));
    dispatch(setHasClickedCreate());
  };

  const classes = useStyles();

  return (
    user && user.id ? (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
          Age
            </InputLabel>
            <Select
              value={selectedTimeRange}
              className={classes.select}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <MenuItem value={TimeRanges.LONG}>{TimeRanges.LONG.title}</MenuItem>
              <MenuItem value={TimeRanges.MEDIUM}>{TimeRanges.MEDIUM.title}</MenuItem>
              <MenuItem value={TimeRanges.SHORT}>{TimeRanges.SHORT.title}</MenuItem>
            </Select>
          </Col>
          <Col>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
          # of Genres
            </InputLabel>
            <Slider
              value={selectedGenreCount}
              defaultValue={DEFAULT_GENRE_COUNT}
              step={1}
              valueLabelDisplay="auto"
              min={1}
              max={100}
              className={classes.slider}
              onChange={(e) => setSelectedGenreCount(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
          # of Artists
            </InputLabel>
            <Select
              value={selectedArtistCount}
              className={classes.select}
              onChange={(e) => setSelectedArtistCount(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </Col>
          <Col>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
          # of Tracks
            </InputLabel>
            <Select
              value={selectedTrackCount}
              className={classes.select}
              onChange={(e) => setSelectedTrackCount(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button variant="outline-primary" onClick={processClick}>
          Create
          </Button>
        </Row>
      </Container>
    ) : null
  );
};

export default Controls;
