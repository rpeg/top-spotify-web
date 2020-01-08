import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectDisplayProfile } from '../reducers/selectors';

const Profile = ({ user }) => {
  const displayProfile = useSelector(selectDisplayProfile);

  return (user && user.id && displayProfile) ? (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 'auto',
        float: 'right',
      }}
    >
      <p className="text-m" style={{ margin: '0 0.5em 0 0' }}>
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
  ) : null;
};

Profile.propTypes = {
  user: PropTypes.shape({ id: PropTypes.string, image: PropTypes.string }),
};

Profile.defaultProps = {
  user: {},
};

export default Profile;
