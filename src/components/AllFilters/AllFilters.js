import React, { useState } from 'react';

import { Form, Button, Modal, Message } from 'semantic-ui-react';

import './AllFilters.css';


function AllFilters ({ toggleFilters, postBarData }) {

  const initialValues = {
    barName: '',
    beerSelection: '',
    beerTypes: '',
    houseBeerPrice: ''
  };
  
  const [inputValues, setInputValues] = useState(initialValues);
  const [messageCondition, setMessageCondition] = useState(false);
  const [barName, setBarName] = useState('');
  
  function handleInputs (event) {
    event.preventDefault();
    const updatingInputValue = Object.assign({}, inputValues);
    if (event.target.placeholder === 'Please enter a bar name...') {
      updatingInputValue.barName = event.target.value;
      setInputValues(updatingInputValue);
    } if (event.target.placeholder === 'Please enter selection of beers...') {
      updatingInputValue.beerSelection = event.target.value;
      setInputValues(updatingInputValue);
    } if (event.target.placeholder === 'Please enter types of beer.Eg: Lager, stout, IPA...') {
      updatingInputValue.beerTypes = event.target.value;
      setInputValues(updatingInputValue);
    } if (event.target.placeholder === 'Please enter house beer price for medium glass...') {
      updatingInputValue.houseBeerPrice = event.target.value;
      setInputValues(updatingInputValue);
    }
  }

  //  handling submit and creating dinamic bar message for the success message
  function handleSubmit () {
    let barNameForSucess = `Once ${inputValues.barName} will be authenticated you will be able to find it in the App`;
    postBarData(inputValues);
    setInputValues(initialValues);
    setBarName(barNameForSucess);
    setMessageCondition(true);
  }
  
  // reseting sucess message
  function removeMessage () {
    setMessageCondition(false);
  }

  return (
    <div className="headerFilters" style={{background: 'rgb(231, 150, 81)'}}>
      <img className="headerLogoImage" src="https://i.ibb.co/YRm3jD4/logo-Small.png" alt="logoImage" />
      <Modal
        centered={false}
        style={{width: '200px', textAlign: 'left', left: '3.5vw', top: '4.5vh'}}
        trigger={<button className="plusButton"><i className="fas fa-bars plusIcon"></i></button>}  
      >
        <Modal.Header>Menu</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div className="menuContainer">
              <div>
                <Modal.Actions
                  onBlur={removeMessage}
                >
                  <Modal
                    trigger={<div className="menuButtons" onClick={removeMessage}><button className="buttonsForMenu"><i className="fas fa-plus iconMenuButtons"></i>Add A Bar</button></div>}
                  >
                    <Modal.Header style={{textAlign: 'center'}}>Add A Bar</Modal.Header>
                    <Modal.Content>
                      <Form
                        success
                        onSubmit={handleSubmit}
                      >
                        <Form.Field>
                          <label>Bar Name</label>
                          <input value={inputValues.barName} onChange={handleInputs} placeholder='Please enter a bar name...' />
                        </Form.Field>
                        <Form.Field>
                          <label>Beer Selection</label>
                          <input value={inputValues.beerSelection} onChange={handleInputs} placeholder='Please enter selection of beers...' />
                        </Form.Field>
                        <Form.Field>
                          <label>Beer Types</label>
                          <input value={inputValues.beerTypes} onChange={handleInputs} placeholder='Please enter types of beer.Eg: Lager, stout, IPA...' />
                        </Form.Field>
                        <Form.Field>
                          <label>House Beer Price</label>
                          <input value={inputValues.houseBeerPrice} onChange={handleInputs} placeholder='Please enter house beer price for medium glass...' />
                        </Form.Field>
                        { messageCondition ? <Message
                          success
                          header='Thank you for submission!'
                          content={barName}
                        /> : null}
                        <Button
                          type='submit'
                          disabled={!inputValues.barName ||
                            !inputValues.beerSelection ||
                            !inputValues.beerTypes ||
                            !inputValues.houseBeerPrice 
                          }
                        >Submit</Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                  <div className="menuButtons menuButtonAbout"><button className="buttonsForMenu"><i className="fas fa-info iconMenuButtons iconMenuButtonAbout"></i>About</button></div>
                  <div className="menuButtons"><button className="buttonsForMenu"><i className="fas fa-question iconMenuButtons"></i>Help</button></div>
                </Modal.Actions>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Button.Group className="headerFiltersButtons">
        <Button onClick={toggleFilters} style={{marginRight: '1px'}}>Price</Button>
        <Button onClick={toggleFilters} style={{marginRight: '1px'}}>Beer</Button>
        <Button onClick={toggleFilters}>Type</Button>
      </Button.Group>
    </div>
  );
}

export default AllFilters;

