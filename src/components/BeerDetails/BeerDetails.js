import React, {useState , useEffect} from 'react';

import { Dropdown } from 'semantic-ui-react';
import { Image, List, Segment } from 'semantic-ui-react';

import BeerDetailsItem from './BeerDetailsItem/BeerDetailsItem';

import './BeerDetails.css';

function BeerDetails ({ showBeerItem, beerName, displayBeerItem }) {

  const [beersData, setBeersData] = useState([]);
  
  useEffect(()=>{
    fetch('https://lets-have-one-project.herokuapp.com/getBeersData')
      .then(response => response.json())
      .then(response => setBeersData(response.sort((a,b) => a.name - b.name ? -1 : 1)));
  }, []);


  const dataForSelect = addKeyText(beersData);
  
  return (
    <div>
      {/* spinner while loading the page */}
      {!beersData.length ? <div className="ui active centered inline loader" style={{height: '47vh', postion: 'fixed', marginTop: '47vh'}}></div> :
        <div>
          {showBeerItem ? <BeerDetailsItem beerName={beerName && beerName}/> :
            <div>
              <Dropdown
                placeholder='Discover your beer'
                fluid
                selection
                search
                style={{outline: '0', borderRadius: '3px'}}
                options={dataForSelect}
                onChange={displayBeerItem}
              /> 
              <Segment inverted className='BeersDetailsList' style={{margin: '0'}} >
                <List divided verticalAlign='middle'>
                  {beersData && beersData.map((beer, index) => (
                    <List.Item  onClick={displayBeerItem} key={index}>
                      <Image  avatar src='https://img.icons8.com/color/48/000000/beer-glass.png' />
                      <List.Content >
                        <List.Header style={{color: 'white'}}>{beer.name}</List.Header>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            </div>}
        </div>}
    </div>
  );
}

export default BeerDetails;

// helper function to add key and text for selectio box
function addKeyText (data) {
  const arrForSelect = [];
  data.forEach(el => {
    const obj = {};
    obj.key = el._id;
    obj.text = el.name;
    arrForSelect.push(obj);
  });
  return arrForSelect;
}