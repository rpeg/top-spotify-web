import React from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { makeSortedFrequencyArr } from '../lib/frequency';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const ArtistMap = ({ artistCountries }) => {
  const countries = artistCountries.map((a) => a.country);
  const sortedCountries = makeSortedFrequencyArr(countries);

  const max = sortedCountries.map((c) => c.freq).reduce((acc, curr) => Math.max(acc, curr));

  console.log(sortedCountries);
  console.log(max);

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) => geographies.map((geo) => {
          const match = sortedCountries.find(
            (c) => c.name.toLowerCase() === geo.properties.NAME_LONG.toLowerCase(),
          );

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={match ? '#1db954' : '#EEE'}
              fillOpacity={match ? `${match.freq / max}` : '0.1'}
              style={{}}
            />
          );
        })}
      </Geographies>
    </ComposableMap>
  );
};

ArtistMap.propTypes = {
  artistCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArtistMap;
