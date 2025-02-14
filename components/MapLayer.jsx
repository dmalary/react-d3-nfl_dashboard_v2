/* eslint-disable react/prop-types */

import { useState } from 'react';

import Map, {Source, Layer} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { glKey } from '../config';

const MapLayer = ({mapData}) => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.25
  });

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'position_count'],
        1, 3.5,   // Min position_count -> small radius
        10, 40  // Max position_count -> larger radius
      ],
      'circle-color': '#007cbf'
    }
  };

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
      >
        <Source id="my-data" type="geojson" data={mapData}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default MapLayer;
