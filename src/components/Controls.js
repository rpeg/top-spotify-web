import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Container, Col, Row,
} from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import {
  TimeRanges,
} from '../constants/constants';
import {
  setTimeRangeName,
  setArtistCount,
  setTrackCount,
  setGenreCount,
  setHasClickedCreate,
  setStatsOptions,
  setDisplayProfile,
  setOptimizeTracks,
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
    maxWidth: 120,
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
      marginTop: '25px',
    },
  },
  switch: {
    '&.MuiSwitch-root': {
      marginTop: '15px',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#1DB954',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#1DB954',
    },
  },
}));

const Controls = () => {
  const user = useSelector((state) => state.user);
  const timeRangeName = useSelector((state) => state.timeRangeName);
  const genreCount = useSelector((state) => state.genreCount);
  const artistCount = useSelector((state) => state.artistCount);
  const trackCount = useSelector((state) => state.trackCount);
  const statsOptions = useSelector((state) => state.statsOptions);
  const displayProfile = useSelector((state) => state.displayProfile);
  const optimizeTracks = useSelector((state) => state.optimizeTracks);

  const [selectedTimeRangeName, setSelectedTimeRangeName] = useState(timeRangeName);
  const [selectedArtistCount, setSelectedArtistCount] = useState(artistCount);
  const [selectedTrackCount, setSelectedTrackCount] = useState(trackCount);
  const [selectedGenreCount, setSelectedGenreCount] = useState(genreCount);
  const [selectedStatsOptions, setSelectedStatsOptions] = useState(statsOptions);
  const [selectedDisplayProfile, setSelectedDisplayProfile] = useState(displayProfile);
  const [selectedOptimizeTracks, setSelectedOptimizeTracks] = useState(optimizeTracks);

  const dispatch = useDispatch();

  const processClick = () => {
    if (selectedTimeRangeName !== timeRangeName) {
      dispatch(setTimeRangeName(selectedTimeRangeName));
    }
    if (selectedGenreCount !== genreCount) {
      dispatch(setGenreCount(selectedGenreCount));
    }
    if (selectedArtistCount !== artistCount) {
      dispatch(setArtistCount(selectedArtistCount));
    }
    if (selectedTrackCount !== trackCount) {
      dispatch(setTrackCount(selectedTrackCount));
    }
    if (selectedStatsOptions !== statsOptions) {
      dispatch(setStatsOptions(selectedStatsOptions));
    }
    if (selectedDisplayProfile !== displayProfile) {
      dispatch(setDisplayProfile(selectedDisplayProfile));
    }
    if (selectedOptimizeTracks !== optimizeTracks) {
      dispatch(setOptimizeTracks(selectedOptimizeTracks));
    }

    dispatch(setHasClickedCreate());
  };

  const classes = useStyles();

  return (
    user && user.id ? (
      <div style={{ borderBottom: '1px solid white' }}>
        <Container style={{ paddingTop: '30px' }}>
          <Row className="justify-content-center">
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  Period
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
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  # of genres
                </InputLabel>
                <Slider
                  defaultValue={selectedGenreCount}
                  step={1}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  className={classes.slider}
                  onChange={(e, newValue) => setSelectedGenreCount(newValue)}
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  # of artists
                </InputLabel>
                <Slider
                  defaultValue={selectedArtistCount}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                  className={classes.slider}
                  onChange={(e, newValue) => setSelectedArtistCount(newValue)}
                />
              </FormControl>
            </Col>
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  # of tracks
                </InputLabel>
                <Slider
                  defaultValue={selectedTrackCount}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                  className={classes.slider}
                  onChange={(e, newValue) => setSelectedTrackCount(newValue)}
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  Stats to display
                </InputLabel>
                <Select
                  value={selectedStatsOptions}
                  multiple
                  className={classes.select}
                  onChange={(e) => setSelectedStatsOptions(e.target.value)}
                >
                  <MenuItem value="key">Key</MenuItem>
                  <MenuItem value="bpm">BPM</MenuItem>
                  <MenuItem value="decades">Decades</MenuItem>
                  <MenuItem value="scale">Scale</MenuItem>
                  <MenuItem value="features">Features</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  Optimize tracks
                </InputLabel>
                <Switch
                  className={classes.switch}
                  checked={selectedOptimizeTracks}
                  onChange={(e) => setSelectedOptimizeTracks(e.target.checked)}
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.label}>
                  Display profile
                </InputLabel>
                <Switch
                  className={classes.switch}
                  checked={selectedDisplayProfile}
                  onChange={(e) => setSelectedDisplayProfile(e.target.checked)}
                />
              </FormControl>
            </Col>
            <Col xs={4} />
          </Row>
          <Row className="justify-content-center">
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
