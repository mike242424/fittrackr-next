import Link from 'next/link';
import { CiDumbbell } from 'react-icons/ci';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const NavBar = () => {
  return (
    <div className="navbar bg-indigo-700 text-white p-5">
      <div className="navbar-start">
        <Link className="flex space-x-4 hover:text-base-100" href="/">
          <CiDumbbell size="3em" />
          <h1 className="text-5xl font-bold">Fittrackr</h1>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className=" bg-indigo-700 hover:text-base-100 text-white border-white"
          >
            <IoIosArrowDropdownCircle size={'3rem'} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-indigo-700 w-52 left-[-8.7rem]"
          >
            <li>
              <Link
                className="add-workout-btn hover:text-indigo-700 hover:bg-black text-sm"
                href="/add-workout"
              >
                Add Workout
              </Link>
            </li>
            <li>
              <Link
                className="my-workout-btn hover:text-indigo-700 hover:bg-black text-sm"
                href="/workouts"
              >
                My Workouts
              </Link>
            </li>
            <li>
              <Link
                className="my-workout-btn hover:text-indigo-700 hover:bg-black text-sm"
                href="/search-exercise"
              >
                Search Exercises
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
