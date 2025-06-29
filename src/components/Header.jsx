'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // const html = document.documentElement;
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      if (savedMode === 'dark') {
        setIsDarkMode(true);
        // html.classList.add('dark');
      } else {
        setIsDarkMode(false);
        // html.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    // const html = document.documentElement;
    if (isDarkMode) {
      // html.classList.add('dark');
    } else {
      // html.classList.remove('dark');
    }
    // Solo guardar en localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);


  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header className="fixed top-0 left-0 w-full p-4 shadow-md rounded-b-lg z-50
      bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold rounded-lg p-2">
          Where in the world?
        </Link>

        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-2 p-2 rounded-lg
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className={"fa-moon " + (isDarkMode ? 'fa-solid' : 'fa-regular')} suppressHydrationWarning></i>
          <span className="font-semibold text-sm md:text-base">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
