'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FullCountry, Languages, Currencies, NativeName } from '@/types/country';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import Link from 'next/link';

export default function CountryDetails() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [countryData, setCountryData] = useState<FullCountry | null>(null);
  const searchParams = useSearchParams();

  const countryCode = searchParams.get('countryCode')

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      setCountryData(response.data[0]);
    } catch (error) {
      setCountryData(null);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [countryCode]);

  const formatLaguages = (languages: Languages) => {
    const valuesArray = Object.values(languages);
    return valuesArray.join(', ');
  }

  const formatCurrencies = (currencies: Currencies) => {
    const valuesArray: Array<string> = [];
    for (const [key, value] of Object.entries(currencies)) {
      valuesArray.push(value.name)
    }
    return valuesArray.join(', ');
  }

  const formatNativeNames = (NativeNames: NativeName) => {
    const valuesArray: Array<string> = [];
    for (const [key, value] of Object.entries(NativeNames)) {
      valuesArray.push(value.common)
    }
    return valuesArray.join(', ');
  }

  return (
    <div className='container w-full mx-auto pt-20'>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !countryData && <div>Country not found.</div>}
      {!isLoading && countryData && <div className="container mx-auto p-4">
        <Link href="/" className='flex flex-row items-center px-8 py-2 mb-15 w-min rounded-sm shadow-lg cursor pointer' style={{
          backgroundColor: 'var(--background-elements)'
        }}><i className="fa-solid fa-arrow-left mr-5"></i>Back</Link>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-15 xl:gap-x-30'>
          <img src={countryData.flags.svg} alt={countryData.flags.alt} className='w-full' />
          <div className='flex flex-col'>
            <span className='font-extrabold pb-6 text-2xl'>{countryData.name.common}</span>
            <div className='flex flex-row flex-wrap justify-between'>
              <div className='flex flex-col gap-2'>
                <div><span className='font-semibold'>Native Name:</span> <span className='font-light'>{formatNativeNames(countryData.name.nativeName)}</span></div>
                <div><span className='font-semibold'>Population:</span> <span className='font-light'>{countryData.population}</span></div>
                <div><span className='font-semibold'>Region:</span> <span className='font-light'>{countryData.region}</span></div>
                <div><span className='font-semibold'>Sub Region:</span> <span className='font-light'>{countryData.subregion}</span></div>
                <div><span className='font-semibold'>Capital:</span> <span className='font-light'>{countryData.capital}</span></div>
              </div>
              <div className='flex flex-col gap-2'>
                <div><span className='font-semibold'>Top Level Domain:</span> <span className='font-light'>{countryData.tld}</span></div>
                <div><span className='font-semibold'>Currencies:</span> <span className='font-light'>{formatCurrencies(countryData.currencies)}</span></div>
                <div><span className='font-semibold'>Languages:</span> <span className='font-light'>{formatLaguages(countryData.languages)}</span></div>
              </div>
            </div>
            {countryData.borders && <div className='flex flex-row items-center mt-20'>
              <span className='font-semibold mr-5'>Border Countries:</span>
              {countryData.borders.map((border) => (
                <div className='flex flex-row flex-wrap mr-2 px-4 py-1 w-min rounded-sm shadow-sm' style={{
                  backgroundColor: 'var(--background-elements)'
                }} key={border}>
                  <div className='font-light'>{border}</div>
                </div>))}

            </div>}
          </div>
        </div>
      </div>}
    </div>
  );
}