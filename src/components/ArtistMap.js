import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from 'react-simple-maps';

import { makeSortedFrequencyArr } from '../lib/frequency';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const ArtistMap = ({ artistCountries }) => {
  const countries = artistCountries.map((a) => a.country);
  const sortedCountries = makeSortedFrequencyArr(countries);

  const max = sortedCountries
    .map((c) => c.freq)
    .reduce((acc, curr) => Math.max(acc, curr));

  return (
    <div
      className="svg-container"
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        paddingBottom: 'calc(100% * 4 / 8)',
        verticalAlign: 'top',
        overflow: 'hidden',
      }}
    >
      <ComposableMap
        className="svg-content"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        width={800}
        height={400}
        style={{ width: '100%', height: 'auto' }}
        viewBox="0 0 800 400"
      >
        <Sphere stroke="#1db954" strokeWidth={2} />
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => {
            const match = sortedCountries.find(
              (c) => c.name.toLowerCase() === geo.properties.NAME_LONG.toLowerCase(),
            );

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: `${match ? '#1db954' : '#282828'}`,
                    fillOpacity: `${match ? `${Math.max(match.freq / max, 0.25)}` : '0.5'}`,
                  },
                  hover: {
                    fill: '#D3D3D3',
                  },
                }}
              />
            );
          })}
        </Geographies>
      </ComposableMap>
    </div>


  );
};

ArtistMap.propTypes = {
  artistCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArtistMap;
