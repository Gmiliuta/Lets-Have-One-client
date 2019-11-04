import React, {useEffect, useState, useCallback} from 'react';

import TypeRange from './components/TypeRange/TypeRange';
import BeerRange from './components/BeerRange/BeerRange';
import PriceRange from './components/PriceRange/PriceRange';
import Map from './components/Map/Map';
import IntroLogo from './containers/IntroLogo/IntroLogo';

import { withGoogleMap, withScriptjs } from "react-google-maps";

import './App.css';


function App() {

  // wrapping Map compoment as per instructions from NPM package
  const MapWrapped = useCallback(withScriptjs(withGoogleMap(Map)), []);
  
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  
  const [barsData, setBarsData] = useState([]);
  const [mapsData, setMapsData] = useState([]);
  const [markers, setMarkers] = useState('');
  
  // reseting filters 
  const [filterReset, setFilterReset] = useState(0);
  const [priceReset, setPriceReset] = useState(0);

  useEffect(()=>{
    fetch("http://localhost:3001/getBarsData")
      .then(response => response.json())
      .then(response => setBarsData(response));
    fetch('http://localhost:3001/getMapsData')
      .then(response => response.json())
      .then(response => setMapsData(response));  
    }, [])

  // filtering bars by the house beer price
  function priceFilter(prices) {
    const filteredBarsData = barsData.filter(el => el.house_beer_price >= prices.min && el.house_beer_price <= prices.max);
    const filteredMapsData = mapsData.filter(el => {
      for (let i = 0; i < filteredBarsData.length; i++) {
        if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
      }
    })
    setMarkers(filteredMapsData);
  }

  //filtering bars by selected beer and reseting price and type filter
  function beersFilter(beersSelected) {
    setPriceReset(priceReset+1);
    let filteredBarsData = barsData.slice();
    if (!beersSelected.length) {
      setMarkers(mapsData);
    } else {
      filteredBarsData = filteredBarsData.filter(el => {
        if(beersSelected.length === 1) {
          if (el.beers.indexOf(beersSelected[0]) >= 0) return true
        } else {
          // show bar(s) which have all your selected beers in one place
          return beersSelected.every(beersEl => el.beers.includes(beersEl));
        }
        });
      const filteredMapsData = mapsData.filter(el => {
        for (let i = 0; i < filteredBarsData.length; i++) {
          if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
        }
      })
      setMarkers(filteredMapsData);
    }
  }
  
  //filtering bars by selected beer TYPE and reseting price and beer filters
  function typesFilter(typesSelected){
    console.log(typesSelected);
    setPriceReset(priceReset+1);
    setFilterReset(filterReset+1);
    console.log(filterReset);
    let filteredBarsData = barsData.slice();
    if(!typesSelected.length) {
      setMarkers(mapsData);
    } else {
      filteredBarsData = filteredBarsData.filter(el => {
        if(typesSelected.length === 1) {
          if (el.types.indexOf(typesSelected[0]) >= 0) return true;
        } else {
          return typesSelected.every(typeEl => el.types.includes(typeEl));
        }
      });
      const filteredMapsData = mapsData.filter(el => {
        for (let i = 0; i < filteredBarsData.length; i++) {
          if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
        }
      })
      setMarkers(filteredMapsData);
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
          <PriceRange  barsData={barsData && barsData} priceFilter={priceFilter} priceReset={priceReset && priceReset}/>
          <BeerRange barsData={barsData && barsData} beersFilter={beersFilter} />
          <TypeRange barsData={barsData && barsData} typesFilter={typesFilter} filterReset={filterReset && filterReset}/>
           <div className="mapContainer">
            <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              mapsData={markers ? markers : mapsData}
            />
           </div>
        </div>
        
      }
    </div>
  );
}

export default App;
