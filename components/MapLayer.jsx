/* eslint-disable react/prop-types */

import Map from 'react-map-gl/mapbox';
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';

import { glKey } from '../config';

const MapLayer = () => {
  return (
    <div className="h-30 w-30">
      <Map
      mapboxAccessToken={glKey}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />

    </div>
  );
};

export default MapLayer;
