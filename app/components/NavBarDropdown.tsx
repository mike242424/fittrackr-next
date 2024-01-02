'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const NavBarDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const targetElement = e.target as Element;
    if (!targetElement.closest('.navbar-dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="m-1" onClick={handleClick}>
          <IoIosArrowDropdownCircle
            size={'3rem'}
            className="text-white hover:text-base-100 cursor-pointer"
          />
        </label>
        <ul
          tabIndex={0}
          className={`dropdown-content p-5 shadow text-white bg-indigo-700 w-52 left-[-8rem] ${
            dropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="mt-4 mb-5">
            <Link
              className="font-bold add-workout-btn bg-indigo-700 hover:text-black text-sm hover:bg-indigo-700"
              href="/add-workout"
              onClick={handleLinkClick}
            >
              Add Workout
            </Link>
          </li>
          <li className="mb-5">
            <Link
              className="font-bold my-workout-btn bg-indigo-700 hover:text-black text-sm hover:bg-indigo-700"
              href="/workouts"
              onClick={handleLinkClick}
            >
              My Workouts
            </Link>
          </li>
          <li>
            <Link
              className="font-bold my-workout-btn bg-indigo-700 hover:text-black text-sm hover:bg-indigo-700"
              href="/search-exercise"
              onClick={handleLinkClick}
            >
              Search Exercises
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBarDropdown;
