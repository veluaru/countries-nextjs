'use client';
import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';

interface Country {
  id: string,
  name: string;
  population: number;
  region: string;
  capital: string;
}

const CountryList = () => {
  const fields: Array<string> = ['name', 'population', 'region', 'capital']
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  // useEffect(() => {
  //   let isMounted = true; // Variable para manejar el "cleanup" y evitar actualizar estado en componente desmontado

  //   const fetchCountryData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields.toString()}`).then(response => response.json())

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data: Country[] = await response.json();
  //       if (isMounted) {
  //         setCountriesData(data);
  //       }
  //       setIsLoading(false)
  //     } catch (err) {
  //       if (isMounted) {
  //         console.error("Failed to fetch country data:", err);
  //         setCountriesData([]);
  //         setIsLoading(false);
  //       }
  //     }
  //     // finally {
  //     //   if (isMounted) {
  //     //     setIsLoading(false);
  //     //   }
  //     // }
  //   };
  //   fetchCountryData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields.toString()}`).then(response => response.json())
  //   .then(data => {
  //     setIsLoading(false);
  //     console.log(data);
  //     setCountriesData(data);
  //   })
  //   .catch(error => console.error('Error:', error));

  // if (!countriesData) {
  //   // Puedes manejar el caso de país no encontrado aquí
  //   return <div>No se encontraron paises, intente de nuevo.</div>;
  // }
  return (
    <div>
      AAAA
      {isLoading && <span>Cargando</span>}
      {!isLoading && <span>CARGOOO</span>}
      {/* {countriesData.length > 0 && countriesData.map((country) => (<CountryCard key={country.id} countryData={country} />))} */}
    </div>
  )
}

export default CountryList;