import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://game-tracker-server-1aqv.onrender.com/genres"
        );
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  });
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/new-post" className="nav-link">
            Add A New Game
          </Link>
        </li>
      </ul>
      <select
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
        className="genre-filter"
      >
        <option value="">Show All</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </nav>
  );
}
