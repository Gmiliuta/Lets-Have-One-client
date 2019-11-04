import React from 'react';

import { Marker } from "react-google-maps"


import './MyMarker.css';

function MyMarker({myLocation}){
  
  return (
    <Marker
      position={myLocation}
      icon={{
        url: "https://img.icons8.com/ios-filled/50/000000/marker.png",
        scaledSize: new window.google.maps.Size(30, 30)
      }}
      defaultTitle={"My Location"}
    />
  )
}

export default MyMarker;