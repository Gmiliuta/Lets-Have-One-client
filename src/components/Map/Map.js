import React, {useEffect, useState }  from 'react';

import { GoogleMap } from '@react-google-maps/api';
import MyMarker from '../MyMarker/MyMarker';
import PlacesMarker from '../PlacesMarker/PlacesMarker';


import './Map.css';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function Map ({mapsData, mapHeight}) {

  const [myLocation , setLocation] = useState();
  const [mapLocation, setMapLocation]= useState();
  const [updateLocation, setUpdatedLocation] = useState(0);


  const [currentDirection, setCurrentDirection] = useState();
  const [markersData, setMarkersData] = useState(mapsData);
 
  //updating myLocation every 5s
  useEffect(()=>{
    currentLocation();
  }, [updateLocation]);
 
  // setting mapLocation
  useEffect(()=>{
    currentMapLocation();
  }, []);

  //updating mapMarkers from filters
  useEffect(()=>{
    setMarkersData(mapsData);
  }, [mapsData]);

  // clearing previous direction 
  function clearPrevDirection (direction) {
    if (currentDirection) {
      //reseting previous marker so direction will dissapear. Placing a timeout for for min timegap to reset marker and direction
      let filteredMapMarkers = markersData.slice();
      filteredMapMarkers = filteredMapMarkers.filter(el => el.place_id !== currentDirection);
      setMarkersData(filteredMapMarkers);
      setTimeout(()=> {
        setMarkersData(mapsData);
      }, 0.1);
      setCurrentDirection(direction);
    } else {
      setCurrentDirection(direction);
    }
  }

  // getting currentMap location for DEPLOYED Version
  function currentMapLocation () {
    let pos = {};
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      'homeMobileCountryCode': 214,
      'homeMobileNetworkCode': 22,
      'radioType': 'lte',
    })
      .then(response => response.json())
      .then(response => {
        pos.lat = response.location.lat;
        pos.lng = response.location.lng;
        setMapLocation(pos);
      });
  }

  // getting currentMY location and updating it every 5 seconds fro DEPLOYED VERSION
  function currentLocation () {
    let pos = {};
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      'homeMobileCountryCode': 214,
      'homeMobileNetworkCode': 22,
      'radioType': 'lte',
    })
      .then(response => response.json())
      .then(response => {
        pos.lat = response.location.lat;
        pos.lng = response.location.lng;
        setLocation(pos);
      });
  }

  // updating live location every 5seconds
  // setTimeout(()=> {
  //   setUpdatedLocation(updateLocation+1);
  // }, 5000);

  return (
    <div>
      {/* spinner for map component */}
      { !mapLocation ? <div className="ui active centered inline loader" style={{top: '40vh' }}></div> :
        <GoogleMap 
          zoom={13}
          mapContainerStyle={{
            height: `${mapHeight}`,
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column-reverse'
          }}
          center={mapLocation}
          options={{
            styles: [
              {
                'stylers': [
                  {
                    'visibility': 'on'
                  },
                  {
                    'saturation': -100
                  },
                  {
                    'gamma': 0.54
                  }
                ]
              },
              {
                'featureType': 'road',
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'water',
                'stylers': [
                  {
                    'color': '#4d4946'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'simplified'
                  }
                ]
              },
              {
                'featureType': 'road',
                'elementType': 'geometry.fill',
                'stylers': [
                  {
                    'color': '#ffffff'
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'simplified'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#ffffff'
                  }
                ]
              },
              {
                'featureType': 'transit.line',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'gamma': 0.48
                  }
                ]
              },
              {
                'featureType': 'transit.station',
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'road',
                'elementType': 'geometry.stroke',
                'stylers': [
                  {
                    'gamma': 7.18
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
          {markersData.map(bar => (
            <PlacesMarker
              key={bar.place_id}
              place_id={bar.place_id}
              location={bar.geometry}
              name={bar.name}
              myLocation={myLocation}
              clearPrevDirection={clearPrevDirection}
            />
          ))}
        </GoogleMap>
      } 
    </div>
  );
}

export default Map;
