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
          <li>Home</li>
          <li>Alpha Centauri</li>
        </ul>
      </nav>
    </header>
  );
}
