import "../styles/GameForm.css";
import { useState, useEffect } from "react";

export default function GameForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [addGenre, setAddGenre] = useState(false);

  // fetch the genres already in the table
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        "https://game-tracker-server-1aqv.onrender.com/genres"
      );
      const data = await response.json();
      setGenres(data);
      // console.log(data)
    };
    fetchGenres();
  }, []);

  // add a new genre to the table
  const handleAddNewGenre = async () => {
    try {
      const response = await fetch(
        "https://game-tracker-server-1aqv.onrender.com/genres",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newGenre }),
        }
      );
      const data = await response.json();
      setGenres((prevGenres) => [...prevGenres, data]);
      setSelectedGenre(data.id);
      setNewGenre("");
      setAddGenre(false);
      //console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const genre_id = selectedGenre || null;
    onSubmit({ title, description, release_year: releaseYear, genre_id });
    //console.log("form submitted")
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Enter game title"
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          placeholder="Enter a short description of the game"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <label>Release Year</label>
        <input
          type="text"
          value={releaseYear}
          placeholder="Enter Release Year e.g. 2024"
          onChange={(event) => setReleaseYear(event.target.value)}
        />
      </div>

      <div>
        <label>Genre</label>
        {!addGenre ? (
          <>
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setAddGenre(true)}>
              Add A New Genre
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter a new genre"
              value={newGenre}
              onChange={(event) => setNewGenre(event.target.value)}
            />
            <button type="button" onClick={handleAddNewGenre}>
              Save
            </button>
            <button type="button" onClick={() => setAddGenre(false)}>
              Cancel
            </button>
          </>
        )}
      </div>

      <button type="submit">Add Game</button>
    </form>
  );
}
