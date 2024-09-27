import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  // Fetch the game details when the component is mounted
  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(
        `https://game-tracker-server-1aqv.onrender.com/games/${id}`
      );
      const data = await response.json();
      setGame(data);
    };

    fetchGame();
  }, [id]);

  // Function to handle liking a game
  const handleLike = async () => {
    await fetch(
      `https://game-tracker-server-1aqv.onrender.com/games/${id}/like`,
      {
        method: "POST",
      }
    );

    // Re-fetch the full game details to update the state
    const response = await fetch(
      `https://game-tracker-server-1aqv.onrender.com/games/${id}`
    );
    const updatedGame = await response.json();
    setGame(updatedGame); // Update the game with the new like count and full details
  };

  // Function to handle deleting a game
  const handleDelete = async () => {
    await fetch(`https://game-tracker-server-1aqv.onrender.com/games/${id}`, {
      method: "DELETE",
    });
    navigate("/"); // Redirect to homepage after deletion
  };

  return (
    <div className="container">
      {game && (
        <>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
          <p>Release Year: {game.release_year}</p>
          <p>Genre: {game.genre_name}</p>
          <p>Likes: {game.likes}</p>
          <button onClick={handleLike}>Like</button>
          <button
            onClick={handleDelete}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
