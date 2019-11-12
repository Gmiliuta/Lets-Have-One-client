import React, {useEffect, useState } from 'react';

import StarRatings from 'react-star-ratings';

import './BeerDetailsItem.css';

function BeerDetailsItem ({ beerName }) {
  
  // getting related bar information from the server to display it
  const [beerItemDetails, setBeerItemDetails] = useState({});

  useEffect(()=>{
    fetch(`https://lets-have-one-project.herokuapp.com/getOneBeer/${beerName}`)
      .then(response => response.json())
      .then(response=> {
        response.rating = Number(response.rating);
        setBeerItemDetails(response);
      });
  }, [beerName]);
  
  return (
    
    <div>
      {/* spinner for beer details */}
      {!beerItemDetails.rating ? 
        <div className="ui active centered inline loader" style={{height: '47vh', postion: 'fixed', marginTop: '47vh'}}></div>
        :
        <div className="cardDetails">
          <div className="cardDetailsImageInfo">
            <div className="cardDetailsImageCont">
              <div className="cardDetailsImage" style={{backgroundImage:`url(${beerItemDetails && beerItemDetails.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}></div>
              {/* <img className="cardDetailsImage" src={beerItemDetails && beerItemDetails.image} /> */}
            </div>
            <div className="cardDetailsContent">
              <h2 className="cardDetailsName">{beerItemDetails && beerItemDetails.name}</h2>
              <div className="cardDetailsStars">
                <StarRatings
                  rating={beerItemDetails && beerItemDetails.rating}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  starDimension='19px'
                  starSpacing='0px'
                />
              </div>
              <div className="cardDetailsBreweryStyle">
                <span>
                  <h5>Brewery: {beerItemDetails && beerItemDetails.brewedBy}</h5>
                  <h5>Style: {beerItemDetails && beerItemDetails.style}</h5>
                  <h5>ABV: {beerItemDetails && beerItemDetails.str}</h5>
                </span>
              </div>
            </div>
          </div>
          <div className="cardDetailsBreweryDescription">
            <h4>{beerItemDetails && beerItemDetails.description}</h4>
          </div>
        </div>}
    </div>
  );
}

export default BeerDetailsItem;