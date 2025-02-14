/* eslint-disable react/prop-types */

import { useState } from 'react';

import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { glKey } from '../config';

const MapLayer = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  return (
    <div >
      <Map
      mapboxAccessToken={glKey}
      // initialViewState={{
      //   longitude: -87.6500523,
      //   latitude: 41.850033,
      //   zoom: 3.5
      // }}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      // mapStyle="mapbox://styles/mapbox/streets-v9"
    />

    </div>
  );
};

export default MapLayer;
