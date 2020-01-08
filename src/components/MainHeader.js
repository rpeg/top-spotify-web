import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Moment from 'moment';

import Profile from './Profile';
import { selectUser } from '../reducers/selectors';

const MainHeader = () => {
  const user = useSelector(selectUser);

  return (
    user && user.id ? (
      <Container style={{ paddingTop: '2em' }}>
        <Row>
          <Col xs={6} style={{ padding: '0', display: 'block' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                float: 'left',
              }}
            >
              <img
                style={{ height: '50px', width: 'auto' }}
                src={`${process.env.PUBLIC_URL}/Spotify_Icon_RGB_Green.png`}
                alt="Spotify Logo"
              />
              <div style={{ width: 'auto', margin: '0 0 0 0.5em' }}>
                <p className="text-m" style={{ textAlign: 'left', margin: '0' }}><b>My Top Music</b></p>
                <p className="text-s" style={{ textAlign: 'left', margin: '0' }}>
                  {Moment().format('MMM. Do, YYYY')}
                </p>
              </div>
            </span>
          </Col>
          <Col xs={6} style={{ padding: '0', display: 'block' }}>
            <Profile user={user} />
          </Col>
        </Row>
      </Container>
    ) : null
  );
};

export default MainHeader;
