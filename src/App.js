import React, {useEffect, useState, useCallback} from 'react';

import TypeRange from './components/TypeRange/TypeRange';
import BeerRange from './components/BeerRange/BeerRange';
import PriceRange from './components/PriceRange/PriceRange';
import Map from './components/Map/Map';
import IntroLogo from './containers/IntroLogo/IntroLogo';
import AllFilters from './components/AllFilters/AllFilters';
import NavBar from './components/NavBar/NavBar';
import BeerDetails from './components/BeerDetails/BeerDetails';

import { LoadScript } from '@react-google-maps/api';

import './App.css';

const googleApis = ['places'];

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


function App () {

  // wrapping Map compoment as per instructions from NPM package
  const MapWrapped = useCallback(Map, []);
  
  const [barsData, setBarsData] = useState([]);
  const [mapsData, setMapsData] = useState([]);
  const [markers, setMarkers] = useState('');
  
  // filters 
  const initialFilter = {price: false, beer: false, beerType: false};
  const [barFilters, setFilters] = useState(initialFilter);

  //height vh for map
  const [mapHeight, setMapHeight] = useState('82vh');
  
  useEffect(()=>{
    fetch('https://lets-have-one-project.herokuapp.com/getBarsData')
      .then(response => response.json())
      .then(response => setBarsData(response));
    fetch('https://lets-have-one-project.herokuapp.com/getMapsData')
      .then(response => response.json())
      .then(response => setMapsData(response));  
  }, []);

  // filtering bars by the house beer price
  function priceFilter (prices) {
    const filteredBarsData = barsData.filter(el => el.house_beer_price >= prices.min && el.house_beer_price <= prices.max);
    const filteredMapsData = mapsData.filter(el => {
      for (let i = 0; i < filteredBarsData.length; i++) {
        if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
      }
      return false;
    });
    setMarkers(filteredMapsData);
  }

  //filtering bars by selected beer and reseting price and type filter
  function beersFilter (beersSelected) {
    let filteredBarsData = barsData.slice();
    if (!beersSelected.length) {
      setMarkers(mapsData);
    } else {
      filteredBarsData = filteredBarsData.filter(el => {
        if (beersSelected.length === 1) {
          if (el.beers.indexOf(beersSelected[0]) >= 0) return true;
          return false;
        } else {
          // show bar(s) which have all your selected beers in one place
          return beersSelected.every(beersEl => el.beers.includes(beersEl));
        }
      });
      const filteredMapsData = mapsData.filter(el => {
        for (let i = 0; i < filteredBarsData.length; i++) {
          if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
        }
        return false;
      });
      setMarkers(filteredMapsData);
    }
  }

  //filtering bars by selected beer TYPE and reseting price and beer filters
  function typesFilter (typesSelected) {
    let filteredBarsData = barsData.slice();
    if (!typesSelected.length) {
      setMarkers(mapsData);
    } else {
      filteredBarsData = filteredBarsData.filter(el => {
        if (typesSelected.length === 1) {
          if (el.types.indexOf(typesSelected[0]) >= 0) return true;
        } else {
          return typesSelected.every(typeEl => el.types.includes(typeEl));
        }
        return false;
      });
      const filteredMapsData = mapsData.filter(el => {
        for (let i = 0; i < filteredBarsData.length; i++) {
          if (el.name.toLowerCase().includes(filteredBarsData[i].name.toLowerCase())) return true;
        }
        return false;
      });
      setMarkers(filteredMapsData);
    }
  }

  // function to show filters 
  function toggleFilters (event) {
    const filt = event.target.innerText; 
    setBarsData(barsData);
    setMarkers(mapsData);
    if (filt === 'Price') {
      setFilters({price: true, beer: false, beerType: false });
      setMapHeight('64vh');
    }
    if (filt === 'Price' && barFilters.price) {
      setFilters({price: false, beer: false, beerType: false });
      setMapHeight('82vh');
    } 
    if (filt === 'Beer') {
      setFilters({price: false, beer: true, beerType: false });
      setMapHeight('64vh');
    } 
    if (filt === 'Beer' && barFilters.beer) {
      setFilters({price: false, beer: false, beerType: false });
      setMapHeight('82vh');
    } 
    if (filt === 'Type') {
      setFilters({price: false, beer: false, beerType: true });
      setMapHeight('64vh');
    } 
    if (filt === 'Type' && barFilters.beerType) {
      setFilters({price: false, beer: false, beerType: false});
      setMapHeight('82vh');
    } 
  }

  // managing components for beerList and map
  const [mapBeerComp, setMapBeerComp] = useState(false);
  

  // beer details
  const [showBeerItem, setBeerItem] = useState(false);
  const [beerName, setBeerName] = useState('');

  function showBeerComponent () {
    setMapBeerComp(true);
    setBeerItem(false);
  }

  function showMapComponent () {
    setMapBeerComp(false);
  }
 
  // func for beerDetailsItem
  function displayBeerItem (event) {
    setBeerItem(true);
    // replaceing dashes in the beerNames to avoid fetch crashing
    if (event.target.innerText.includes('/')) {
      let replaceDash = event.target.innerText;
      replaceDash = replaceDash.replace('/', '   ');
      setBeerName(replaceDash);
    } else {
      setBeerName(event.target.innerText);

    }
  }
  
  //  posting new bar data from the client
  function postBarData (infoObj) {
    fetch('http://localhost:3001/postBarsDataByCust', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(infoObj)
    });
  }


  // having introLogo image for PWA
  const [image, setImage] = useState(true);

  setTimeout(()=>{
    setImage(false);
  }, 1500);

  return (
    <div >
      { image ? <IntroLogo/> : <div className="dashboard">
        {/* mockMAP placed below is used in InfoWindow to fetch place data from Google API */}
        <div id="mockMap" style={{display: 'none'}}></div>
        {mapBeerComp ? <BeerDetails displayBeerItem={displayBeerItem} showBeerItem={showBeerItem} beerName={beerName && beerName} /> : 
          <div className="testing">
            <AllFilters toggleFilters={toggleFilters} postBarData={postBarData}/>
            { barFilters.price && <PriceRange barsData={barsData && barsData} priceFilter={priceFilter} />}
            { barFilters.beer && <BeerRange barsData={barsData && barsData} beersFilter={beersFilter} />}
            { barFilters.beerType &&<TypeRange barsData={barsData && barsData} typesFilter={typesFilter} />}
            <div className="mapContainer" style={{height: `${mapHeight}`}}>
              <LoadScript
                id="script-loader"
                googleMapsApiKey={API_KEY}
                libraries={googleApis}
              >
                <MapWrapped mapsData={markers ? markers : mapsData} mapHeight={mapHeight && mapHeight}/>
              </LoadScript>
            </div>
          </div>
        }
        <NavBar showBeerComponent={showBeerComponent} showMapComponent={showMapComponent}/>
      </div>}
    </div>
  );
}

export default App;
