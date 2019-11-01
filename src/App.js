import React, {useEffect, useState} from 'react';

import TypeRange from './components/TypeRange/TypeRange';
import BeerRange from './components/BeerRange/BeerRange';
import PriceRange from './components/PriceRange/PriceRange';
import Map from './components/Map/Map';
import IntroLogo from './containers/IntroLogo/IntroLogo';

import { withGoogleMap, withScriptjs } from "react-google-maps";

import './App.css';


function App() {

  const MapWrapped = withScriptjs(withGoogleMap(Map));
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  
  const [barsData, setBarsData] = useState([]);
  const [mapsData, setMapsData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/getBarsData")
      .then(response => response.json())
      .then(response => setBarsData(response));
    fetch('http://localhost:3001/getMapsData')
      .then(response => response.json())
      .then(response => setMapsData(response));  
    }, [])

  function priceFilter(prices) {
    const filteredData = barsData.filter(el => el.house_beer_price >= prices.min && el.house_beer_price <= prices.max);
    const filteredMapsData = mapsData.filter(el => {
      for (let i = 0; i < filteredData.length; i++) {
        if (el.name.toLowerCase().includes(filteredData[i].name.toLowerCase())) return true;
      }
    })
    setMapsData(filteredMapsData);
  }

  
  function beersFilter(beersSelected) {
    console.log(beersSelected, 'beersFromApp');
    let testBarsData = barsData.slice();
    if (!beersSelected.length) {
      console.log(testBarsData, 'BeersSelectionEmpty = DisplayAll');
      return testBarsData;
    } else {
      testBarsData = testBarsData.filter(el => {
        for(let i =0; i < beersSelected.length; i++) {
         if (el.beers.indexOf(beersSelected[i]) >= 0) return true;
        }
      });
      console.log(testBarsData,'afterFiltering')
      return testBarsData;
    }
  }

  function typesFilter(typesSelected){
    console.log(typesSelected);
    let testBarsData = barsData.slice();
    if(!typesSelected.length) {
      console.log(testBarsData, 'TypesSelectionEmpty = DisplayAll');
      return testBarsData;
    } else {
      testBarsData = testBarsData.filter(el => {
        for(let i =0; i < typesSelected.length; i++) {
        if (el.types.indexOf(typesSelected[i]) >= 0) return true;
        }
      });
      console.log(testBarsData,'afterFiltering')
      return testBarsData;
    }
  }

  // having introLogo image for PWA
  let [image, setImage] = useState(true);

  setTimeout(()=>{
    setImage(false);
  }, 1500);

  return (
    <div className="dashboard">
      {image ? <IntroLogo/> : 
        <div className="testing">
          <h1>App</h1>
          <PriceRange  barsData={barsData && barsData} priceFilter={priceFilter}/>
          <BeerRange barsData={barsData && barsData} beersFilter={beersFilter}/>
          <TypeRange barsData={barsData && barsData} typesFilter={typesFilter}/>
           <div className="mapContainer">
            <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
           </div>
        </div>
        
      }
    </div>
  );
}

export default App;
