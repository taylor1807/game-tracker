import { useState, useEffect } from "react";
//found this on the reactRouter docs to auto navigate to the homepage after form submission
import { useParams, useNavigate } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  // fetching the game info
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

  // post to like a game
  const handleLike = async () => {
    await fetch(
      `https://game-tracker-server-1aqv.onrender.com/games/${id}/like`,
      {
        method: "POST",
      }
    );

    // fetching details again to update after like
    const response = await fetch(
      `https://game-tracker-server-1aqv.onrender.com/games/${id}`
    );
    const updatedGame = await response.json();
    setGame(updatedGame);
  };

  // dlete a ageme post
  const handleDelete = async () => {
    await fetch(`https://game-tracker-server-1aqv.onrender.com/games/${id}`, {
      method: "DELETE",
    });
    navigate("/");
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
