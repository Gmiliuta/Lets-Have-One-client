import React, {useEffect, useState }  from 'react';

import { GoogleMap } from "react-google-maps"
import MyMarker from '../MyMarker/MyMarker';
import PlacesMarker from '../PlacesMarker/PlacesMarker';


import './Map.css';

function Map({mapsData}) {

  const [myLocation , setLocation] = useState();
  const [updateLocation, setUpdatedLocation] = useState(0);


  useEffect(()=>{
    currentLocation();
  }, [updateLocation]);

   
  // getting current location
  function currentLocation() {
    let pos = {};
    navigator.geolocation.getCurrentPosition((position)=> {
      pos.lat = position.coords.latitude;
      pos.lng = position.coords.longitude;
      setLocation(pos);
    })
  }

  // updating live location every 5seconds
  // setTimeout(()=> {
  //   setUpdatedLocation(updateLocation+1)
  // }, 5000)
  

  return (
    <div>
      { myLocation && 
        <GoogleMap 
        defaultZoom={13} 
        defaultCenter={myLocation}
        defaultOptions={{
          styles: [
            {
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 0.54
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#4d4946"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "gamma": 0.48
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "gamma": 7.18
                    }
                ]
            }
        ],
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false
        }}
        >
        <MyMarker myLocation={myLocation}/>
        {mapsData.map(bar => (
          <PlacesMarker
            key={bar.place_id}
            location={bar.geometry}
            name={bar.name}
            icon={bar.icon}
            myLocation={myLocation}
            />
        ))}
        </GoogleMap>
  
      } 
    </div>
  )
}

export default Map;
