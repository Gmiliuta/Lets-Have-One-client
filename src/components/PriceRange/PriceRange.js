import React, { useState, useEffect} from 'react';

// import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';

import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


function PriceRange ({barsData, priceFilter, priceReset}) {

  const initialPrice = getPrices(barsData);

  const [priceRange, setPriceRange] = useState(initialPrice);
 
  useEffect(() => {
    setPriceRange(initialPrice);
  }, [priceReset]);
  
  return (
    <div className="priceRange" style={{maxWidth: '95vw', margin: '20px'}}>
      <p>House beer price range</p>
      <p>€{priceRange.min} - €{priceRange.max}</p>
      <Range
        min={initialPrice.min} 
        max={initialPrice.max} 
        step={0.1}
        defaultValue={[initialPrice.min, initialPrice.max]} 
        tipFormatter={value => `€${value}`} 
        onChange={value => {
          const valObj={};
          valObj.min=value[0];
          valObj.max=value[1];
          setPriceRange(valObj);
          priceFilter(valObj);
        }}
      />
    </div>
  );
}

export default PriceRange;



//helper functions to get minimum and maximum values of beer prices
function getPrices (data) {
  const initialPrice = {
    min: Infinity,
    max: -Infinity
  };
  for (let i = 0; i < data.length; i++) {
    if (data[i].house_beer_price < initialPrice.min) initialPrice.min = data[i].house_beer_price;
    if (data[i].house_beer_price > initialPrice.max) initialPrice.max = data[i].house_beer_price;
  }
  initialPrice.min = Math.round(initialPrice.min);
  initialPrice.max = Math.round(initialPrice.max);
  return initialPrice;
}


{/* <InputRange
inputRange={'display: none'}
allowSameValues={true}
maxValue={initialPrice.max}
minValue={initialPrice.min}
step={0.1}
value={priceRange}
onChange={value => {
  value.min = Number(value.min.toFixed(1));
  value.max = Number(value.max.toFixed(1));
  setPriceRange(value);
  priceFilter(value);
}} 
/> */}



