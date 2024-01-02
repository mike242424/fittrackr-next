'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const NavbarDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const targetElement = e.target as Element;
    if (!targetElement.closest('.dropdown-navbar')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="dropdown dropdown-navbar">
        <label tabIndex={0} className="m-1" onClick={handleClick}>
          <IoIosArrowDropdownCircle
            size={'3rem'}
            className="text-white hover:text-base-100 cursor-pointer"
          />
        </label>
        <div
          className={`dropdown-content px-2 pt-6 shadow text-white bg-indigo-700 w-96 left-[-8rem] z-10 ${
            dropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <div
            className="font-bold p-3 text-left hover:text-black text-white cursor-pointer text-sm"
            onClick={handleLinkClick}
          >
            <Link href="/add-workout">Add Workout</Link>
          </div>
          <div
            className="font-bold p-3 text-left hover:text-black text-white cursor-pointer text-sm"
            onClick={handleLinkClick}
          >
            <Link href="/workouts">My Workouts</Link>
          </div>
          <div
            className="font-bold p-3 pb-6 text-left hover:text-black text-white cursor-pointer text-sm"
            onClick={handleLinkClick}
          >
            <Link href="/search-exercise">Search Exercises</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarDropdown;
