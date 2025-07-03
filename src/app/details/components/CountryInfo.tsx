'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Languages, Currencies, NativeName, FullCountry } from '@/types/country';
import { useCountryStore } from '../../../stores/countryStore';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';


export default function CountryInfo() {
  const searchParams = useSearchParams();
  const countryCode = searchParams.get('countryCode');
  const { countryDetails, isLoading, fetchCountryByCode, fetchCountriesByCode } = useCountryStore();

  useEffect(() => {
    if (countryCode) {
      fetchCountryByCode(countryCode);
    }
  }, [countryCode]);

  // useEffect(() => {
  //   if (countryDetails?.borders && countryDetails?.borders.length > 0) {
  //     fetchCountriesByCode(countryDetails.borders);
  //   }
  // }, [countryDetails]);

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
      {!isLoading && !countryDetails && <div>Country not found.</div>}
      {!isLoading && countryDetails && <div className="container mx-auto p-4">
        <Link href="/" className='flex flex-row items-center px-8 py-2 mb-15 w-min rounded-sm shadow-lg cursor pointer' style={{
          backgroundColor: 'var(--background-elements)'
        }}><i className="fa-solid fa-arrow-left mr-5"></i>Back</Link>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-15 xl:gap-x-30'>
          <img src={countryDetails.flags.svg} alt={countryDetails.flags.alt} className='w-full' />
          <div className='flex flex-col justify-center'>
            <span className='font-extrabold pb-6 text-2xl'>{countryDetails.name.common}</span>
            <div className='flex flex-row flex-wrap justify-between'>
              <div className='flex flex-col gap-2'>
                <div><span className='font-semibold'>Native Name:</span> <span className='font-light'>{formatNativeNames(countryDetails.name.nativeName)}</span></div>
                <div><span className='font-semibold'>Population:</span> <span className='font-light'>{countryDetails.population}</span></div>
                <div><span className='font-semibold'>Region:</span> <span className='font-light'>{countryDetails.region}</span></div>
                <div><span className='font-semibold'>Sub Region:</span> <span className='font-light'>{countryDetails.subregion}</span></div>
                <div><span className='font-semibold'>Capital:</span> <span className='font-light'>{countryDetails.capital}</span></div>
              </div>
              <div className='flex flex-col gap-2'>
                <div><span className='font-semibold'>Top Level Domain:</span> <span className='font-light'>{countryDetails.tld}</span></div>
                <div><span className='font-semibold'>Currencies:</span> <span className='font-light'>{formatCurrencies(countryDetails.currencies)}</span></div>
                <div><span className='font-semibold'>Languages:</span> <span className='font-light'>{formatLaguages(countryDetails.languages)}</span></div>
              </div>
            </div>
            {countryDetails.borders && <div className='flex flex-row flex-wrap gap-2 items-center mt-20'>
              <span className='font-semibold mr-5'>Border Countries:</span>
              {countryDetails.borders.map((border) => (
                <Link href={{ pathname: '/details', query: { countryCode: border.ccn3 }, }} className='flex flex-row flex-wrap mr-2 px-4 py-1 w-min rounded-sm shadow-sm' style={{
                  backgroundColor: 'var(--background-elements)'
                }} key={border.ccn3}>
                  <div className='font-light'>{border.name.common}</div>
                </Link>))}

            </div>}
          </div>
        </div>
      </div>}
    </div>
  );
}