import { render, screen, fireEvent } from '@testing-library/react';
import CountryFilters from './CountryFilters';
import { regionOptions } from '../../lib/constants';

const handleKeyDownSearchText = () => { }
const handleRegionSelect = () => { }

describe('Country Filters', () => {
    it('renders the search bar', () => {
        render(<CountryFilters onKeyDownSearchText={handleKeyDownSearchText} onRegionSelect={handleRegionSelect} />);
        const searchBar = screen.getByPlaceholderText('Search for a country');
        expect(searchBar).toBeInTheDocument();
    });

    it('renders the filters select', () => {
        render(<CountryFilters onKeyDownSearchText={handleKeyDownSearchText} onRegionSelect={handleRegionSelect} />);
        const filtersSelect = screen.getByRole('combobox', { name: /Filter by Region/i });
        expect(filtersSelect).toBeInTheDocument();
    });

    it('displays options on select', () => {
        render(<CountryFilters onKeyDownSearchText={handleKeyDownSearchText} onRegionSelect={handleRegionSelect} />);
        const filtersSelect = screen.getByRole('combobox', { name: /Filter by Region/i });
        fireEvent.click(filtersSelect);
        for (let index = 0; index < regionOptions.length; index++) {
            expect(screen.getByText(regionOptions[index].label)).toBeInTheDocument();
        }
    });
});