import React, { useState} from 'react';

import { Dropdown } from 'semantic-ui-react'

import './BeerRange.css'

function BeerRange({barsData, beersFilter}) {

  // getting an object of all beers alphabetically to be shown in dropwon
  const allBeers = getBeers(barsData);
  
  // passing selected beers to App component to update the state for Maps
  let beers = [];
  function getValue(event) {
    //if beer is selected it adds it to the arr and updates the state
    if (event.target.textContent) {
      beers.push(event.target.textContent);
      beersFilter(beers);
    }// if we remove beer from seach list we update array and send it to the app state
    if (!event.target.textContent) {
      beers = beers.filter(el => el !== event.target.parentElement.textContent);
      beersFilter(beers);
    }
  }

  return (
    <div className="beerRange">
     <p>Select your favourite beer</p>
     <Dropdown
       placeholder="Types"
       fluid
       multiple
       search
       selection
       options={allBeers}
       onChange={getValue}
     />
    </div>
  );
}


export default BeerRange;


// helper function to get an array of all uniq beers as objects for dropdown 

function getBeers(data) {
  const beers = [];
  for(let i = 0; i < data.length; i++) {
    for (let y = 0; y < data[i].beers.length; y++) {
      if (beers.indexOf(data[i].beers[y]) === -1) beers.push(data[i].beers[y]);
    }
  }
  beers.sort();
  const allBeersObj = [];
  beers.forEach(el => allBeersObj.push({
    key: el,
    text: el,
    value: el
  }))
  return allBeersObj;
}

