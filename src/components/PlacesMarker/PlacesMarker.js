import React, { useState }  from 'react';

import { Marker, DirectionsRenderer } from  '@react-google-maps/api';

import SlideWindow from '../SlideWindow/SlideWindow';

import './PlacesMarker.css';

function PlacesMarker ({place_id, location, name, myLocation, clearPrevDirection }) {
  
  const [directions, setDirections] = useState(); 
  const [visibleInfoBox, setVisibleInfoBox] = useState(false);
  const [visibleDirection, setVisibleDirection] = useState(false);

  function getDirection (direction) {
    hideInfo();
    setVisibleDirection(true);
    //information is being passed from slide window comp to Map comp to clear previous location
    clearPrevDirection(direction);
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: myLocation,
      destination: location,
      travelMode: window.google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`); // eslint-disable-line no-console
      }
    });
  }

  function hideInfo () {
    setVisibleInfoBox(!visibleInfoBox);
  }
  
  return (
    <Marker
      position={location}
      defaultTitle={name}
      icon={{
        url: 'https://img.icons8.com/cotton/64/000000/beer-glass.png',
        scaledSize: new window.google.maps.Size(30, 30)
      }}
      onClick={() => hideInfo()}

    >
      {visibleInfoBox && <SlideWindow 
        place_id={place_id} 
        location={location} 
        name={name} 
        hideInfo={hideInfo} 
        getDirection={getDirection}
      />}
      {visibleDirection && <DirectionsRenderer
        options={{
          suppressMarkers:true
        }}
        directions={directions}
      />}
    </Marker>
  );
}

export default PlacesMarker;