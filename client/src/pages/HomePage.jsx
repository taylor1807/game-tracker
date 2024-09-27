import "../styles/HomePage.css";
import { useState, useEffect } from "react";
import GameList from "../components/GameList";

export default function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("http://localhost:8080/games");
      const data = await response.json();
      setGames(data);
      //console.log(data)
    };
    fetchGames();
  }, []);

  return (
    <div className="home-page">
      <GameList games={games} />
    </div>
  );
}
