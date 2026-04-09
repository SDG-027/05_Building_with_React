import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="header">
      {/* Anchor-Tags nur für Externes oder für Navigation innerhalb einer einzelnen Page
       */}
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
          {/* NavLink für Client-Side Navigation mit automatischer "active" CSS-Klasse */}
          {/* NavLink verhindert Page-Reload und navigiert per JavaScript */}
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'alpha-centauri'}>Alpha Centauri</NavLink>
        </ul>
      </nav>
    </header>
  );
}
