'use client';
import React, { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CountryFilters from './components/CountryFilters';
import { ReducedCountry } from '@/types/country';
import { reducedCountryRequiredFields } from '@/lib/constants';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [countriesData, setCountriesData] = useState<ReducedCountry[]>([]);
  const [allCountriesData, setAllCountriesData] = useState<ReducedCountry[]>([]);


  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://restcountries.com/v3.1/all?fields=${reducedCountryRequiredFields.toString()}`);
      setCountriesData(response.data);
      setAllCountriesData(response.data);
    } catch (error) {
      setCountriesData([]);
      setAllCountriesData([]);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleKeyDownSearchText = async (text: string) => {
    if (!isLoading) {
      if (text) {
        try {
          setIsLoading(true);
          const response = await axios.get(`https://restcountries.com/v3.1/name/${text}?fields=${reducedCountryRequiredFields.toString()}`);
          setCountriesData(response.data);
          setAllCountriesData(response.data);
        } catch (error) {
          setCountriesData([]);
          setAllCountriesData([]);
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
      else {
        fetchPosts()
      }
    }
  }

  const handleRegionSelect = (region: string) => {
    if (region) {
      const countriesFiltered = allCountriesData.filter((country) => country.region.toLocaleLowerCase() === region);
      setCountriesData(countriesFiltered)
    } else {
      setCountriesData(allCountriesData)
    }
  };
  return (
    <main className="h-full overflow-y-scroll transition-colors duration-300 text-sm">
      <CountryFilters onKeyDownSearchText={handleKeyDownSearchText} onRegionSelect={handleRegionSelect} />
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && <LoadingSpinner />}
        {!isLoading && countriesData.length > 0 && countriesData.slice(0, 50).map((country) => (
          <CountryCard key={country.ccn3} countryData={country} />))}
        {!isLoading && countriesData.length == 0 && <div>No countries found, please try again</div>}
      </div>
    </main>
  );
}
