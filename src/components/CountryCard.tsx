'use client';
import React from 'react';

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
}

const CountryCard = ({ countryData }: { countryData: Country }) => {
  
  const goToProductDetails = () => {}

  return (
    <div onClick={() => goToProductDetails()}>
      {/* <img src="" alt="" /> */}
      <span>{countryData.name}</span>
      <div><span>Population:</span> <span>{countryData.population}</span></div>
      <div><span>Region:</span> <span>{countryData.region}</span></div>
      <div><span>Capital:</span> <span>{countryData.capital}</span></div>
    </div>
  )
}

export default CountryCard;