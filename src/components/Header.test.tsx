import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'dark',
    setTheme: jest.fn(),
  })),
}));

describe('Header', () => {
  it('renders the application title', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Where in the world?/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the dark mode toggle button', () => {
    render(<Header />);
    const toggleButton = screen.getByRole('button', { name: /Dark Mode/i });
    expect(toggleButton).toBeInTheDocument();
  });

  
  it('calls toggleDarkMode when the theme toggle button is clicked', () => {
    const mockSetTheme = jest.fn();
    const { useTheme } = require('next-themes');

    useTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });
    
    render(<Header />);
    const toggleButton = screen.getByRole('button', { name: /Dark Mode/i });
    fireEvent.click(toggleButton);

    // It should have been called two times because when whe create the mock and simulate the initial theme counts as one
    expect(mockSetTheme).toHaveBeenCalledTimes(2);
  });
});