import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="header">
      <a href="#">
        <h1>Webb Gallery</h1>
        <p>
          Fancy stars
          <span role="img" aria-label="Star">
            💫
          </span>
        </p>
      </a>
      <nav>
        <ul>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'alpha-centauri'}>Alpha Centauri</NavLink>
        </ul>
      </nav>
    </header>
  );
}
