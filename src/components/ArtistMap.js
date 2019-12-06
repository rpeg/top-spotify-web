import React from 'react';
import PropTypes from 'prop-types';

const ArtistMap = ({ artistCountries }) => (
  <ul>
    {artistCountries.map((a) => (
      <li>{a.country}</li>
    ))}
  </ul>
);

ArtistMap.propTypes = {
  artistCountries: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string,
        country: PropTypes.string,
      },
    ),
  ).isRequired,
};

export default ArtistMap;
