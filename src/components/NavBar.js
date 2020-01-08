import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

import { setUser } from '../actions/actions';
import { SPOTIFY_API_URL } from '../config';
import { selectUser } from '../reducers/selectors';

const accordionItemStyle = { color: '#191414', margin: '10px 15px 10px 15px' };

const NavBar = ({ socket }) => {
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <a href="https://github.com/scjohnson16/top-spotify-web" target="_blank" rel="noopener noreferrer" style={{ marginRight: '30px' }}>
        <img height="30" width="30" src="images/GitHub-Mark-Light-64px.png" alt="github" />
      </a>
      <a href="mailto:topspotdeveloper@gmail.com" target="_top" style={{ marginRight: '30px' }}>
        <img height="40" width="35" src="images/baseline_email_white_18dp.png" alt="email" />
      </a>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        style={{
          background: 'none',
          border: 'none',
          marginRight: '30px',
        }}
      >
        <img height="35" width="35" src="images/faq.png" alt="faq" />
      </button>
      {isModalOpen && (
        <Modal
          isOpen
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="FAQ"
          style={
            {
              content: {
                maxHeight: 'calc(100vh - 100px)',
                overflowY: 'auto',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: '100',
              },

            }
          }
        >
          <div style={{ maxWidth: '800px' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '32pt', color: '#191414' }}>FAQ:</p>
              <button
                href="#"
                aria-label="close faq"
                type="button"
                className="close"
                onClick={() => setIsModalOpen(false)}
              />
            </span>
            <Accordion atomic={false}>
              <AccordionItem title="Why can't I login?">
                <p style={accordionItemStyle}>
          After a period of inactivity, the server application which
          handles Spotify authentication goes to sleep. If you can&apos;t login at first,
          simply refresh the page and try again—the server should have woken up in
          that time.
                </p>
              </AccordionItem>
              <AccordionItem title="Why am I limited to only 50 artists and certain time ranges?">
                <p style={accordionItemStyle}>
          Unfortunately, this is all the data that Spotify&apos;s public API makes available.
                </p>
              </AccordionItem>
              <AccordionItem title="Could you also display my top albums à la Topsters?">
                <p style={accordionItemStyle}>
          Spotify&apos;s public API only provides your top 50 artists and tracks for a given
          time-range, nothing more.
                </p>
              </AccordionItem>
              <AccordionItem title="Why is the map slow to load and lists some artists in the wrong location?">
                <p style={accordionItemStyle}>
          Because the public Spotify API doesn&apos;t provide artist location, I rely on an
          external Postgres service hosting a custom clone of the MusicBrainz database.
          Upwards of 50 distinct queries to this service are necessary to retrieve all
          the map data. As there is no foolproof way of matching up Spotify data
          with MusicBrainz data, some anomalies may persist.
                </p>
              </AccordionItem>
              <AccordionItem title="What do all the stats like 'valence' mean?">
                <p style={accordionItemStyle}>
          These are features of individual tracks Spotify generates through audio analysis.
          Read more
                  {' '}
                  <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">here.</a>
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </Modal>
      )}
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

NavBar.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};

export default NavBar;
