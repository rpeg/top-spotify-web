import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Moment from 'moment';

import Profile from './Profile';

const MainHeader = () => {
  const user = useSelector((state) => state.user);

  return (
    user && user.id ? (
      <Container style={{ paddingTop: '2em' }}>
        <Row>
          <Col xs={6} style={{ padding: '0', display: 'inline-flex' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <img
                style={{ height: '50px', width: 'auto' }}
                src={`${process.env.PUBLIC_URL}/Spotify_Icon_RGB_Green.png`}
                alt="Spotify Logo"
              />
              <div style={{ width: 'auto', margin: '0 0 0 0.5em' }}>
                <h4 style={{ textAlign: 'left', margin: '0' }}>My Top Music</h4>
                <div>
                  <p style={{ textAlign: 'left', margin: '0' }}>
                    {Moment().format('MMM. Do, YYYY')}
                  </p>
                </div>
              </div>
            </span>
          </Col>
          <Col xs={6} style={{ padding: '0', display: 'inline-flex' }}>
            <Profile user={user} />
          </Col>
        </Row>
      </Container>
    ) : null
  );
};

export default MainHeader;
