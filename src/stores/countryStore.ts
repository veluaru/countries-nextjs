import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReducedCountry, FullCountry } from '@/types/country';
import { reducedCountryRequiredFields } from '@/lib/constants';
import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

interface CountryState {
	allCountries: ReducedCountry[];
	countryDetails: FullCountry | null;
	isLoading: boolean;
	error: string | null;
	fetchCountries: () => Promise<void>;
	fetchCountriesByName: (term: string) => Promise<void>;
	fetchCountryByCode: (code: string | null) => Promise<void>;
	fetchCountriesByCode: (code: string[] | null) => Promise<FullCountry[] | null>;
	clearCountries: () => void;
}

export const useCountryStore = create<CountryState>()(
	persist(
		(set, get) => ({
			allCountries: [],
			countryDetails: null,
			isLoading: false,
			error: null,
			fetchCountries: async () => {
				set({ isLoading: true, error: null });
				try {
					const response = await axios.get<ReducedCountry[]>(`${API_URL}/all?fields=${reducedCountryRequiredFields.toString()}`);
					set({ allCountries: response.data, isLoading: false });
				} catch (err) {
					if (axios.isAxiosError(err)) {
						set({ error: err.message, isLoading: false, allCountries: [] });
					} else {
						set({ error: 'An unexpected error occurred', isLoading: false, allCountries: [] });
					}
				}
			},
			fetchCountriesByName: async (term: string) => {
				set({ isLoading: true, error: null });
				try {
					const response = await axios.get<ReducedCountry[]>(`${API_URL}/name/${term}?fields=${reducedCountryRequiredFields.toString()}`);
					set({ allCountries: response.data, isLoading: false });
				} catch (err) {
					if (axios.isAxiosError(err)) {
						set({ error: err.message, isLoading: false, allCountries: [] });
					} else {
						set({ error: 'An unexpected error occurred', isLoading: false, allCountries: [] });
					}
				}
			},
			fetchCountryByCode: async (code: string | null) => {
				set({ isLoading: true, error: null });
				try {
					const response = await axios.get<FullCountry[]>(`${API_URL}/alpha/${code}`);
					const country = response.data[0];
                    if (country.borders && country.borders.length > 0) {
                        const borderCountriesData = await get().fetchCountriesByCode(country.borders);
                        if (borderCountriesData) {
                            country.borders = borderCountriesData;
                        } else {
                            country.borders = [];
                        }
                    }
					set({ countryDetails: country, isLoading: false });
				} catch (err) {
					if (axios.isAxiosError(err)) {
						set({ error: err.message, isLoading: false, countryDetails: null });
					} else {
						set({ error: 'An unexpected error occurred', isLoading: false, countryDetails: null });
					}
				}
			},
			fetchCountriesByCode: async (codes: string[] | null) => {
				set({ isLoading: true, error: null });
				try {
					const response = await axios.get<FullCountry[]>(`${API_URL}/alpha?codes=${codes?.join(',')}`);
					return response.data;
				} catch (err) {
					if (axios.isAxiosError(err)) {
						set({ isLoading: false , error: err.message });
					} else {
						set({ isLoading: false , error: 'An unexpected error occurred' });
					}
					return null;
				}
			},
			clearCountries: () => set({ allCountries: [], countryDetails: null }),
		}),
		{
			name: 'country-storage',
		}
	)
);