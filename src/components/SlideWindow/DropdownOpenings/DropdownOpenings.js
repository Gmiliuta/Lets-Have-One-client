import React from 'react';

import { Dropdown } from 'semantic-ui-react';

//injecting text to dropdown box with style and value otherwise not possible to change color
const value = <p style={{color: 'white'}}>Openning Times</p>;

function DropdownOpenings ({ openings }) {

  const romanDays = changeDays(openings);

  return (
    <Dropdown
      text={value}
      style={{color: 'white', background: 'rgba(0,0,0,0)', width: '143.5px',height: '36.25', outline: '0', border: '1px double white' , padding: '10px 20px'}}
      fluid
      selection
      item
      options={romanDays}
    />
  );
}

export default DropdownOpenings;

// helper function to change days to roman numbers
function changeDays (arr) {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const newArr = arr.map(((el, key) => {
    let elArr = el.split(' ');
    elArr[0] = romans[key] + ':';
    return elArr.join(' ');
  }));
  const dropDownDays = [];
  newArr.forEach(el => dropDownDays.push({
    text: el,
    key: el,
    style: {color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none'}
  }));
  return dropDownDays;
}