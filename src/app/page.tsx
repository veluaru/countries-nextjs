'use client';
import React, { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CountryFilters from './components/CountryFilters';
import ReactPaginate from 'react-paginate';
import { ReducedCountry } from '@/types/country';
import { useCountryStore } from '../stores/countryStore';

export default function Home() {
  const [countriesData, setCountriesData] = useState<ReducedCountry[]>([]);
  const [allCountriesDataFiltered, setAllCountriesDataFiltered] = useState<ReducedCountry[]>([]);
  const [isFirstFetch, setIsFirstFetch] = useState<Boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const { allCountries, isLoading, error, fetchCountries, fetchCountriesByName, clearCountries } = useCountryStore();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (error === null) {
      setAllCountriesDataFiltered(allCountries);
    } else {
      setCountriesData([]);
      setAllCountriesDataFiltered([]);
      console.error('Error fetching data:', error);
    }
    setIsFirstFetch(true);
  }, [allCountries]);


  useEffect(() => {
    const newPageCount = Math.ceil(allCountriesDataFiltered.length / itemsPerPage);
    setPageCount(newPageCount);
    setCurrentPage(0);
  }, [allCountriesDataFiltered, itemsPerPage]);

  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    const endOffset = offset + itemsPerPage;
    const newCountries = allCountriesDataFiltered.slice(offset, endOffset);
    setCountriesData(newCountries);
  }, [currentPage, allCountriesDataFiltered, itemsPerPage]);


  const handleKeyDownSearchText = (text: string) => {
    if (!isLoading) {
      if (text) {
        fetchCountriesByName(text);
      }
      else {
        fetchCountries();
      }
    }
  }

  const handleRegionSelect = (region: string) => {
    let filtered: ReducedCountry[];
    if (region) {
      filtered = allCountries.filter((country) => country.region.toLocaleLowerCase() === region.toLocaleLowerCase());
    } else {
      filtered = allCountries;
    }
    setAllCountriesDataFiltered(filtered);
  };

  interface onPageChangeEvent {
    selected: number;
  }

  const handlePageClick = (event: onPageChangeEvent) => {
    setCurrentPage(event.selected);
  };

  return (
    <main className="h-full overflow-y-scroll transition-colors duration-300 text-sm">
      <CountryFilters onKeyDownSearchText={handleKeyDownSearchText} onRegionSelect={handleRegionSelect} />
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(isLoading || !isFirstFetch) && <LoadingSpinner />}
        {!isLoading &&  isFirstFetch && countriesData.length > 0 && countriesData.map((country) => (
          <CountryCard key={country.ccn3} countryData={country} />))}
        {!isLoading && isFirstFetch && countriesData.length == 0 && <div>No countries found, please try again</div>}
      </div>
      {!isLoading && countriesData.length > 0 && <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        containerClassName="flex justify-center items-center space-x-2 mt-8 mb-8"
        pageLinkClassName="px-3 py-1 rounded-lg font-semibold text-gray-400 transition-colors duration-200 hover:text-white bg-[var(--background-elements)] dark:bg-[var(--background-elements)] hover:bg-gray-300 dark:hover:bg-gray-600 hover:cursor-pointer shadow-sm"
        activeLinkClassName="!bg-emerald-400 !text-white"
        previousLinkClassName="px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50 transition-colors duration-200"
        nextLinkClassName="px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50 transition-colors duration-200"
        breakLinkClassName="px-3 py-1 rounded-lg font-semibold text-gray-400"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
      />}
    </main>
  );
}
