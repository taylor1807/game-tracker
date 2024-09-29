import "../styles/HomePage.css";
import { useState, useEffect } from "react";
import GameList from "../components/GameList";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  //fetching game details after applying filter (set a show all in filter to fetch everything)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          selectedGenre
            ? `https://game-tracker-server-1aqv.onrender.com/games?genre=${selectedGenre}`
            : "https://game-tracker-server-1aqv.onrender.com/games"
        );
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(error);
      }
      //console.log(data)
    };
    fetchGames();
  }, [selectedGenre]);

  return (
    <div className="home-page">
      <Navbar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <GameList games={games} />
    </div>
  );
}
