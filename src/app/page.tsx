'use client';
import React, { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CountryFilters from './components/CountryFilters';
import ReactPaginate from 'react-paginate';
import { ReducedCountry } from '@/types/country';
import { reducedCountryRequiredFields } from '@/lib/constants';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [countriesData, setCountriesData] = useState<ReducedCountry[]>([]);
  const [allCountriesData, setAllCountriesData] = useState<ReducedCountry[]>([]);
  const [allCountriesDataFiltered, setAllCountriesDataFiltered] = useState<ReducedCountry[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://restcountries.com/v3.1/all?fields=${reducedCountryRequiredFields.toString()}`);
      setCountriesData(response.data);
      setAllCountriesData(response.data);
      setAllCountriesDataFiltered(response.data)
    } catch (error) {
      setCountriesData([]);
      setAllCountriesData([]);
      setAllCountriesDataFiltered([]);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);


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


  const handleKeyDownSearchText = async (text: string) => {
    if (!isLoading) {
      if (text) {
        try {
          setIsLoading(true);
          const response = await axios.get(`https://restcountries.com/v3.1/name/${text}?fields=${reducedCountryRequiredFields.toString()}`);
          setAllCountriesData(response.data);
          setAllCountriesDataFiltered(response.data)
        } catch (error) {
          setAllCountriesData([]);
          setAllCountriesDataFiltered([])
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
    let filtered: ReducedCountry[];
    if (region) {
      filtered = allCountriesData.filter((country) => country.region.toLocaleLowerCase() === region.toLocaleLowerCase());
    } else {
      filtered = allCountriesData;
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
        {isLoading && <LoadingSpinner />}
        {!isLoading && countriesData.length > 0 && countriesData.map((country) => (
          <CountryCard key={country.ccn3} countryData={country} />))}
        {!isLoading && countriesData.length == 0 && <div>No countries found, please try again</div>}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        containerClassName="flex justify-center items-center space-x-2 mt-8 mb-8"
        pageLinkClassName="px-3 py-1 rounded-lg font-semibold text-gray-400 transition-colors duration-200 hover:text-white bg-[var(--background-elements)] dark:bg-[var(--background-elements)] hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer shadow-sm"
        activeLinkClassName="!bg-emerald-400 !text-white"
        previousLinkClassName="px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        nextLinkClassName="px-4 py-2 rounded-lg bg-emerald-400 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        breakLinkClassName="px-3 py-1 rounded-lg font-semibold text-gray-400"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
      />
    </main>
  );
}
