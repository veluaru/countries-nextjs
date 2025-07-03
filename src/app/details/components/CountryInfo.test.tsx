import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryInfo from './CountryInfo';
import { useCountryStore } from '../../../stores/countryStore';
import { useSearchParams } from 'next/navigation';
import { FullCountry } from '@/types/country';

// Mock Next.js useSearchParams
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

// Mock your Zustand store
jest.mock('../../../stores/countryStore');

describe('<CountryInfo />', () => {
    const mockUseSearchParams = useSearchParams as jest.Mock;
    const mockUseCountryStore = useCountryStore as any as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading spinner when loading', () => {
        mockUseSearchParams.mockReturnValue({
            get: () => 'USA',
        });

        mockUseCountryStore.mockReturnValue({
            isLoading: true,
            countryDetails: null,
            fetchCountryByCode: jest.fn(),
        });

        render(<CountryInfo />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders "Country not found" when no countryDetails', () => {
        mockUseSearchParams.mockReturnValue({
            get: () => 'XYZ',
        });

        mockUseCountryStore.mockReturnValue({
            isLoading: false,
            countryDetails: null,
            fetchCountryByCode: jest.fn(),
        });

        render(<CountryInfo />);
        expect(screen.getByText(/Country not found/i)).toBeInTheDocument();
    });

    it('renders country details when data is available', async () => {
        mockUseSearchParams.mockReturnValue({
            get: () => 'USA',
        });

        const mockCountry: FullCountry = {
            altSpellings: ['US', 'USA'],
            area: 9833520,
            borders: [
                {
                    ccn3: '124',
                    name: { common: 'Canada' },
                },
                {
                    ccn3: '484',
                    name: { common: 'Mexico' },
                },
            ],
            capital: ['Washington, D.C.'],
            capitalInfo: {},
            car: {},
            cca2: 'US',
            cca3: 'USA',
            ccn3: '840',
            cioc: 'USA',
            coatOfArms: {},
            continents: ['North America'],
            currencies: {
                USD: { name: 'United States dollar', symbol: '$' },
            },
            demonyms: {},
            fifa: 'USA',
            flag: '🇺🇸',
            flags: { svg: 'https://flagcdn.com/us.svg', alt: 'USA flag', png: '' },
            gini: {},
            idd: {},
            independent: true,
            landlocked: false,
            languages: { eng: 'English' },
            latlng: [38, -97],
            maps: {},
            name: {
                common: 'United States',
                nativeName: {
                    eng: { official: 'United States of America', common: 'United States' },
                },
                official: ''
            },
            population: 331000000,
            postalCode: {},
            region: 'Americas',
            startOfWeek: 'Sunday',
            status: 'officially-assigned',
            subregion: 'Northern America',
            timezones: ['UTC−04:00'],
            tld: ['.us'],
            translations: {},
            unMember: true,
        };

        mockUseCountryStore.mockReturnValue({
            isLoading: false,
            countryDetails: mockCountry,
            fetchCountryByCode: jest.fn(),
        });

        render(<CountryInfo />);

        expect(await screen.getAllByText('United States')[0]).toBeInTheDocument();
        expect(screen.getByText('Native Name:')).toBeInTheDocument();
        expect(await screen.getAllByText('United States')[1]).toBeInTheDocument()
        expect(screen.getByText('Border Countries:')).toBeInTheDocument();
        expect(screen.getByText('Canada')).toBeInTheDocument();
        expect(screen.getByText('Mexico')).toBeInTheDocument();
    });
});
