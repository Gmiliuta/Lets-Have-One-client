import React, {useState, useEffect} from 'react';

import StarRatings from 'react-star-ratings';

import OpeningsPopUp from './OpeningsPopUp/OpeningsPopUp';

import { Modal } from 'semantic-ui-react';

import './SlideWindow.css';

function SlideWindow ({place_id, getDirection, hideInfo}) {

  const [currentPlace, setCurrentPlace] = useState();

  useEffect(()=> {
    getPlaceInfo(place_id);
  }, [place_id]);


  function getPlaceInfo (iD) {
    const map = new window.google.maps.Map(document.getElementById('mockMap'));
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      placeId: iD,
      fields: ['formatted_address', 'photo', 'name', 'opening_hours', 'rating']
    };
    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setCurrentPlace(place);
      }
    });
  }

  // open times and partial address from Google maps for SlideWindow
  const openings = currentPlace && currentPlace.opening_hours.weekday_text;
  
  return (
    <div className="popUpBox" >
      <div className="popUpBoxNameContainer">
        <h2 className="popUpBoxName" style={{color: 'white'}}>{currentPlace && currentPlace.name}</h2>
        <i onClick={hideInfo}  className="fas fa-arrow-down" style={{background: 'rgba(0,0,0,0)', color: 'white', fontSize: '20px', zIndex: '11'}}></i>
      </div>
      <div className="popUpBoxRest">
        <div className="popUpBoxAddressRating">
          <StarRatings
            rating={currentPlace && currentPlace.rating}
            starRatedColor="yellow"
            numberOfStars={5}
            starDimension='17px'
            starSpacing='0px'
          />
          <div className="popUpBoxAddress" style={{color: 'white', width: '100px'}}>{currentPlace && currentPlace.formatted_address}</div>
        </div>
        <div className="popUpBoxTimesAndDirection">
          <div>
            { openings && <OpeningsPopUp openings={ openings }/>}
          </div>
          <button className="ui blue inverted button" onClick={() => getDirection(place_id)}><i className="fas fa-directions"></i>Get here</button>
        </div>
        <div className="popUpBoxImages">
          {currentPlace && currentPlace.photos.map(photo => (
            <Modal
              key={Math.floor(Math.random()*100000)}
              trigger={<div key={Math.floor(Math.random()*100000)} style={{backgroundImage:`url(${photo.getUrl()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '116.953px', width: '116.953px', marginRight: '15px'}}></div>}
              content={!!photo.getUrl() && <div style={{backgroundImage:`url(${photo.getUrl()})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '45vh', width: '100%'}}></div>}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlideWindow;