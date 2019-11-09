import React from 'react';

import { Button } from 'semantic-ui-react';

import './AllFilters.css';

function AllFilters ({toggleFilters}) {

  

  return (
    <div className="headerFilters" style={{background: 'rgb(231, 150, 81)'}}>
      <Button.Group className="headerFiltersButtons">
        <Button onClick={toggleFilters}>Price</Button>
        <Button.Or />
        <Button onClick={toggleFilters}>Beer</Button>
        <Button.Or />
        <Button onClick={toggleFilters}>Beer type</Button>
      </Button.Group>
    </div>
  );
}

export default AllFilters;