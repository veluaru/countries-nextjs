import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryCard from './CountryCard';
import { ReducedCountry } from '@/types/country';

describe('CountryCard', () => {
  const mockCountryData: ReducedCountry = {
    name: {
      common: 'Canada',
        nativeName: {},
        official: 'Canada',
    },
    flags: {
      svg: 'https://flagcdn.com/ca.svg',
      alt: 'Flag of Canada',
      png: 'https://flagcdn.com/w320/ca.png',
    },
    population: 38005238,
    region: 'Americas',
    capital: 'Ottawa',
    ccn3: '124',
  };

  it('should render country data correctly', () => {
    render(<CountryCard countryData={mockCountryData} />);

    expect(screen.getByText('Canada')).toBeInTheDocument();
    const flagImage = screen.getByAltText('Flag of Canada');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'https://flagcdn.com/ca.svg');
    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByText('38005238')).toBeInTheDocument();
    expect(screen.getByText('Region:')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Capital:')).toBeInTheDocument();
    expect(screen.getByText('Ottawa')).toBeInTheDocument();
  });

  it('should have the correct link href', () => {
    render(<CountryCard countryData={mockCountryData} />);

    const linkElement = screen.getByRole('link', { name: /canada/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/details?countryCode=124');
  });

  it('should render without capital if not provided (though component expects it)', () => {
    const countryWithoutCapital = {
      ...mockCountryData,
      capital: '',
    };
    render(<CountryCard countryData={countryWithoutCapital} />);
    expect(screen.getByText('Capital:')).toBeInTheDocument();
    expect(screen.queryByText('Ottawa')).not.toBeInTheDocument();
  });
});
