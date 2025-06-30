'use client';
import React from 'react';
import Link from 'next/link';
import { ReducedCountry } from '@/types/country';

const CountryCard = ({ countryData }: { countryData: ReducedCountry }) => {
  return (
    <Link href={{ pathname: '/details', query: { countryCode: countryData.ccn3 }, }} className='flex flex-col rounded-sm shadow-md hover:scale-102 duration-300 ease-in-out'
      style={{
        backgroundColor: 'var(--background-elements)',
      }}>
      <img src={countryData.flags.svg} alt={countryData.flags.alt} className='rounded-t-sm h-50 object-cover' />
      <div className='flex flex-col p-7'>
        <span className='font-extrabold pb-6'>{countryData.name.common}</span>
        <div><span className='font-semibold'>Population:</span> <span className='font-light'>{countryData.population}</span></div>
        <div><span className='font-semibold'>Region:</span> <span className='font-light'>{countryData.region}</span></div>
        <div><span className='font-semibold'>Capital:</span> <span className='font-light'>{countryData.capital}</span></div>
      </div>

    </Link>
  )
}

export default CountryCard;