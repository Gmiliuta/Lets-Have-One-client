import React, { useState }  from 'react';

import { Marker, DirectionsRenderer } from "react-google-maps"

import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

import './PlacesMarker.css';

let visible = false;

function PlacesMarker({location, name, icon, myLocation }){

  const [directions, setDirections] = useState(); 
  
  function getDirection() {
    visible = !visible;
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: myLocation,
      destination: location,
      travelMode: window.google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }
  
  return (
    <Marker
      position={location}
      defaultTitle={name}
      icon={{
        url: "https://img.icons8.com/cotton/64/000000/beer-glass.png",
        scaledSize: new window.google.maps.Size(30, 30)
      }}
      onClick={() => (
        getDirection()
        )}
     >
    {visible && <InfoBox
      defaultPosition={location}
      options={{ closeBoxURL: ``,
                 enableEventPropagation: true,
                  }}
    >
      <div style={{ backgroundColor: `yellow`,  padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          This is going to be a component
        </div>
      </div>
      </InfoBox>}
    <DirectionsRenderer
      set
      options={{
        suppressMarkers:true
      }}
      directions={directions}
    />
    </Marker>
  )
}

export default PlacesMarker;