import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="home-link">
        <h1>Dog Training Classes</h1>
      </Link>
    </header>
  );
}

export default Header;

