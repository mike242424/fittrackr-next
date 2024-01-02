import Link from 'next/link';
import { CiDumbbell } from 'react-icons/ci';
import NavBarDropdown from './components/NavBarDropdown';

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
        <NavBarDropdown />
      </div>
    </div>
  );
};

export default NavBar;
