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
				set({ isLoading: true });
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
			clearCountries: () => set({ allCountries: [], countryDetails: null }),
		}),
		{
			name: 'country-storage',
		}
	)
);