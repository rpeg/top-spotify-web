import React from 'react';
import PropTypes from 'prop-types';

const Profile = (user) => (
  user.id && (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: 'auto',
    }}
  >
    <p style={{ margin: '0 0.5em 0 0' }}>
      <b>{user.id}</b>
    </p>
    <img
      height="50px"
      src={user.image}
      alt={user.id}
      style={{
        objectFit: 'cover',
        borderRadius: '50%',
      }}
    />
  </span>
  )
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
