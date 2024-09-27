import { useState, useEffect } from "react";
import GameList from "../components/GameList";
import Navbar from "../components/Navbar";
import "../styles/HomePage.css";

export default function HomePage() {
  const [games, setGames] = useState([]); // State to hold the list of games
  const [selectedGenre, setSelectedGenre] = useState(""); // State to track the selected genre

  // Fetch games based on the selected genre
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Check if a genre is selected, include it in the API request
        const url = selectedGenre
          ? `https://game-tracker-server-1aqv.onrender.com/games?genre=${selectedGenre}`
          : "https://game-tracker-server-1aqv.onrender.com/games"; // Fetch all games if no genre is selected

        console.log("Fetching games from:", url); // Debug: log the URL

        const response = await fetch(url);
        const data = await response.json();
        setGames(data); // Update games state
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [selectedGenre]); // Re-fetch games when selectedGenre changes
  // Re-fetch games whenever selectedGenre changes

  return (
    <div className="home-page">
      {/* Pass selectedGenre and setSelectedGenre to the Navbar */}
      <Navbar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {/* Pass the list of games to the GameList component */}
      <GameList games={games} />
    </div>
  );
}
