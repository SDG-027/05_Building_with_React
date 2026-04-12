const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Travel Agency
        </a>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal gap-2.5 px-1">
          <li>Home</li>
          <li>About</li>
          <li>Destinations</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
