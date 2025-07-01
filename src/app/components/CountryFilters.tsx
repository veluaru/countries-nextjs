'use client';
import React, { useState } from 'react';
import { regionOptions } from '@/lib/constants';

interface ChildProps {
  onKeyDownSearchText: (data: string) => void;
  onRegionSelect: (data: string) => void;
}

const CountryFilters: React.FC<ChildProps> = ({ onKeyDownSearchText, onRegionSelect }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const handleKeyDownSearchText = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onKeyDownSearchText(searchText);
    }
  }

  const handleRegionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    onRegionSelect(event.target.value)
  };

  return (
    <div className='container flex flex-row flex-wrap items-center justify-between gap-10 mx-auto px-4 py-10 text-sm'>
      <div
        className="flex items-center py-4 px-8 max-w-md w-full rounded-sm shadow-md overflow-hidden"
        style={{
          backgroundColor: 'var(--background-elements)',
        }}
      >
        <i className="fa-solid fa-magnifying-glass mr-5" style={{ color: 'var(--input)' }} suppressHydrationWarning></i>
        <input
          type="text"
          placeholder='Search for a country'
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleKeyDownSearchText}
          className="focus:outline-none bg-transparent border-none w-85"
          style={{
            color: 'var(--color)',
          }}
        />
      </div>
      <div>
        <select
          value={selectedRegion}
          onChange={handleRegionSelect}
          className="w-full border-x-20 border-transparent py-4 pr-3 rounded-sm focus:outline-none cursor-pointer rounded-sm shadow-md"
          style={{ backgroundColor: 'var(--background-elements)', color: 'var(--text-primary)' }}
          aria-label='Filter by Region'
        >
          <option value="" disabled hidden>
            Filter by Region
          </option>
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CountryFilters;