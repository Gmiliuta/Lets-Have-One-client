import React from 'react';

import { Button } from 'semantic-ui-react';

import './NavBar.css';

function NavBar ({showBeerComponent, showMapComponent}) {
  
  return (
    <div className='navBar'>
      <Button.Group className='navBarButtons'  widths='2'>
        <button onClick={showMapComponent} className="ui icon button" icon='map'><i aria-hidden="true" className="map marker icon"></i></button>
        <button onClick={showBeerComponent} className="ui icon button"><i aria-hidden="true" className="beer icon"></i></button>
      </Button.Group>
      
    </div>
  );
}

export default NavBar;