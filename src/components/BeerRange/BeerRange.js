import React, { useEffect } from 'react';

import { Dropdown } from 'semantic-ui-react';

import './BeerRange.css';

//beers var is outside in order not to reset the value everytime component re-renders
let beers = [];

function BeerRange ({barsData, beersFilter }) {

  // getting an object of all beers alphabetically to be shown in dropwon
  const allBeers = getBeers(barsData);

  useEffect(()=> {
    beers=[];
  }, [barsData]);
  
  // passing selected beers to App component to update the state for Maps
  function getValue (event) {
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
  
  // toggling blurred background when selecting a beer
  function toggleBlurredBackground () {
    const blurredDiv = document.getElementById('blurredDivBeers');
    if (blurredDiv.classList.contains('blurredContent')) {
      blurredDiv.classList.remove('blurredContent');
    } else {
      blurredDiv.classList.add('blurredContent');
    }
  }
  
  return (
    <div id="beerRangeId" className="beerRange">
      {/* div to make all page greyed out when filter is selected */}
      <div id="blurredDivBeers"></div>
      <p>Select your favourite beer</p>
      <Dropdown
        placeholder="Types"
        fluid
        multiple
        search
        selection
        options={allBeers}
        onChange={getValue}
        style={{zIndex: '12'}}
        onClick={toggleBlurredBackground}
        onBlur={toggleBlurredBackground}
      />
    </div>
  );
}


export default BeerRange;


// helper function to get an array of all uniq beers as objects for dropdown
function getBeers (data) {
  const beers = [];
  for (let i = 0; i < data.length; i++) {
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
  }));
  return allBeersObj;
}

