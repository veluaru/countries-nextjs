'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      if (savedMode) {
        setTheme(savedMode);
      } else {
        setTheme(theme === 'system' ? systemTheme : theme);
        localStorage.setItem('theme', theme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);


  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="w-full p-4 shadow-md transition-colors duration-300" style={{ backgroundColor: 'var(--background-elements)', color: 'var(--color)' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold p-2">
          Where in the world?
        </Link>

        <button
          onClick={toggleDarkMode}
          className="flex items-center p-2 rounded-lg cursor-pointer
            hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none"
        >
          <i className={"mr-3 fa-moon " + (theme === 'dark' ? 'fa-solid' : 'fa-regular')} suppressHydrationWarning></i>
          <span className="font-semibold text-sm md:text-base">
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
