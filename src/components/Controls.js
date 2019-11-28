import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Container, Col, Row,
} from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import {
  TimeRanges, DEFAULT_ARTIST_COUNT, DEFAULT_TRACK_COUNT, DEFAULT_GENRE_COUNT,
} from '../constants/constants';
import {
  setTimeRangeName, setArtistCount, setTrackCount, setGenreCount, setHasClickedCreate,
} from '../actions/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
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
      marginTop: '15px',
    },
  },
}));

const Controls = () => {
  const user = useSelector((state) => state.user);
  const timeRangeName = useSelector((state) => state.timeRangeName);
  const genreCount = useSelector((state) => state.genreCount);
  const artistCount = useSelector((state) => state.artistCount);
  const trackCount = useSelector((state) => state.trackCount);

  const [selectedTimeRangeName, setSelectedTimeRangeName] = useState(timeRangeName);
  const [selectedArtistCount, setSelectedArtistCount] = useState(DEFAULT_ARTIST_COUNT);
  const [selectedTrackCount, setSelectedTrackCount] = useState(DEFAULT_TRACK_COUNT);
  const [selectedGenreCount, setSelectedGenreCount] = useState(DEFAULT_GENRE_COUNT);

  const dispatch = useDispatch();

  const processClick = () => {
    if (selectedTimeRangeName !== timeRangeName) { dispatch(setTimeRangeName(selectedTimeRangeName)); }
    if (selectedGenreCount !== genreCount) { dispatch(setGenreCount(selectedGenreCount)); }
    if (selectedArtistCount !== artistCount) { dispatch(setArtistCount(selectedArtistCount)); }
    if (selectedTrackCount !== trackCount) { dispatch(setTrackCount(selectedTrackCount)); }
    dispatch(setHasClickedCreate());
  };

  const classes = useStyles();

  return (
    user && user.id ? (
      <div style={{ borderBottom: '1px solid white' }}>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  Age
                </InputLabel>
                <Select
                  value={selectedTimeRangeName}
                  className={classes.select}
                  onChange={(e) => setSelectedTimeRangeName(e.target.value)}
                >
                  <MenuItem value={TimeRanges.LONG.name}>{TimeRanges.LONG.title}</MenuItem>
                  <MenuItem value={TimeRanges.MEDIUM.name}>{TimeRanges.MEDIUM.title}</MenuItem>
                  <MenuItem value={TimeRanges.SHORT.name}>{TimeRanges.SHORT.title}</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  # of Genres
                </InputLabel>
                <Slider
                  defaultValue={DEFAULT_GENRE_COUNT}
                  step={1}
                  valueLabelDisplay="auto"
                  min={1}
                  max={100}
                  className={classes.slider}
                  onChange={(e, newValue) => setSelectedGenreCount(newValue)}
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <FormControl className={classes.formControl}>
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
              </FormControl>
            </Col>
            <Col>
              <FormControl className={classes.formControl}>
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
              </FormControl>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Button variant="outline-primary" style={{ margin: '30px 0 30px 0' }} onClick={processClick}>
          Create
            </Button>
          </Row>
        </Container>
      </div>
    ) : null
  );
};

export default Controls;
