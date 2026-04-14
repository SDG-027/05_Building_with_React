import { NavLink, useNavigate } from 'react-router';

const navLinkClass = ({ isActive }) =>
  isActive ? `underline underline-offset-2` : ``;

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Travel Agency
        </a>
        <button className="text-2xl" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <button className="text-2xl" onClick={() => navigate(1)}>
          &rarr;
        </button>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal gap-2.5 px-1">
          <li>
            <NavLink to={'/'} className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={'/about'} className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={'/destinations'} className={navLinkClass}>
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink to={'/contact'} className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
