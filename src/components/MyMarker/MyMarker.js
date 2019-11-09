import React from 'react';

import { Marker } from '@react-google-maps/api';


import './MyMarker.css';

function MyMarker ({myLocation}) {
  
  return (
    <Marker
      position={myLocation}
      icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 6.5,
        fillColor: '#1a73e8',
        fillOpacity: 0.9,
        strokeColor: 'white',
        strokeWeight: 2
        // scaledSize: new window.google.maps.Size(30, 30)
      }}
      options={{title: 'My Location'}}
    />
  );
}

export default MyMarker;