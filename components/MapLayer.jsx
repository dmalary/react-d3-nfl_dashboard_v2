/* eslint-disable react/prop-types */

import Map from 'react-map-gl/mapbox';
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';

import { glKey } from '../config';

const MapLayer = () => {
  return (
    // <div className="h-80 w-80">
    <div >
      <Map
      mapboxAccessToken={glKey}
      initialViewState={{
        longitude: -87.6500523,
        latitude: 41.850033,
        zoom: 3
      }}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      // mapStyle="mapbox://styles/mapbox/streets-v9"
    />

    </div>
  );
};

export default MapLayer;
