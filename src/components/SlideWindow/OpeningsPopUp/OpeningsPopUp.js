import React from 'react';

import {  Modal } from 'semantic-ui-react';


function OpeningsPopUp ({ openings }) {

  return (
    <Modal
      trigger={<button className="ui grey inverted button" style={{width: '160px'}}><i className="fas fa-clock" style={{marginRight: '10px'}}></i>Opening times</button>}
      content={openings.map(elem => (
        <div key={elem} style={{textAlign: 'center', margin: '10px 0'}}>{elem}</div>
      ))}
    />
  );
}

export default OpeningsPopUp;
