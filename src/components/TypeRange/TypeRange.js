import React, { useEffect} from 'react';

import { Dropdown } from 'semantic-ui-react';

import './TypeRange.css';

//beerTypes var placed outside to it would not reset automatically by re-rendering
let beerTypes = [];

function TypeRange ({barsData, typesFilter }) {
   
  // getting an array of types of beer
  const allTypes = getTypes(barsData);
  

  
  useEffect(() => {
    beerTypes = [];
  }, [barsData]);

  // console.log(barsData);
  
  // passing selected beer types to App component to update the state for Maps
  function getValueBeerType (event) {
    if (event.target.textContent) {
      beerTypes.push(event.target.textContent);
      typesFilter(beerTypes);
    }
    if (!event.target.textContent) {
      beerTypes = beerTypes.filter(el => el !== event.target.parentElement.textContent);
      typesFilter(beerTypes);
    }
  }

  return (
    <div className="typeRange">
      <p>Select your favourite beer type</p>
      <Dropdown
        placeholder="Types"
        fluid
        multiple
        search
        selection
        options={allTypes}
        onChange={getValueBeerType}
      />
    </div>
  );
}

export default TypeRange;

// helper function to get all types from beers data and place them to an obj for dropdown
function getTypes (data) {
  const beerTypes = [];
  for (let i = 0; i < data.length; i++) {
    for (let y = 0; y < data[i].types.length; y++) {
      if (beerTypes.indexOf(data[i].types[y]) === -1) beerTypes.push(data[i].types[y]);
    }
  }
  beerTypes.sort();
  const allTypesObj = [];
  beerTypes.forEach(el => allTypesObj.push({
    key: el,
    text: el,
    value: el
  }));
  // console.log(allTypesObj)
  return allTypesObj;
}