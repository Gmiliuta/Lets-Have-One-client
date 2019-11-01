import React, {useEffect, useState }  from 'react';

import { GoogleMap } from "react-google-maps"


import './Map.css';

function Map({mapsData}) {

 

  const myLocation = whereAmI();
  
  console.log(myLocation)

  return (
      <GoogleMap 
      defaultZoom={12} 
      defaultCenter={myLocation}
      >
      { /* We will render our data here */ }
      </GoogleMap>
  )
}

export default Map;




// helper function to get my current location 
function whereAmI() {
  let pos = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=> {
      pos.lat = position.coords.latitude;
      pos.lng = position.coords.longitude;
    })

  }
  return pos;
}




// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     const pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };