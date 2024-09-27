import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", function (request, response) {
  response.json("This is my root route.");
});

// get route to display a list of all games and genres
app.get("/games", async (request, response) => {
  const { genre } = request.query; // Get genre filter from the query parameters

  try {
    let query = `
      SELECT games.*, genres.name as genre_name 
      FROM games 
      JOIN genres ON games.genre_id = genres.id
    `;

    const params = [];

    if (genre) {
      query += ` WHERE games.genre_id = $1`;
      params.push(genre); // Add genre to the query parameters
    }

    query += ` ORDER BY games.id ASC`;

    const result = genre
      ? await db.query(query, params)
      : await db.query(query);

    response.json(result.rows);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// get route to look at all the details of 1 game
app.get("/games/:id", async (request, response) => {
  const { id } = request.params;
  //console.log(id)
  try {
    const result = await db.query(
      `
      SELECT games.*, genres.name as genre_name 
      FROM games 
      JOIN genres ON games.genre_id = genres.id
      WHERE games.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "not found" });
    }
    //console.log(result.rows)
    response.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// post route to add a new game
app.post("/games", async (request, response) => {
  const { title, description, release_year, genre_id } = request.body;
  try {
    const newGame = await db.query(
      `
      INSERT INTO games (title, description, release_year, genre_id) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [title, description, release_year, genre_id]
    );
    //console.log(newGame.rows)
    response.json(newGame.rows[0]);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// post route to add new genres to the genre table
app.post("/genres", async (request, response) => {
  const { name } = request.body;
  try {
    const newGenre = await db.query(
      "INSERT INTO genres (name) VALUES ($1) RETURNING *",
      [name]
    );
    //console.log(newGenre.rows[0])
    response.json(newGenre.rows[0]);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// get route to get a all genres from the genre table
app.get("/genres", async (request, response) => {
  try {
    const result = await db.query("SELECT * FROM genres");
    //console.log(result.rows)
    response.json(result.rows);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// added a delete route to delete games
app.delete("/games/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const result = await db.query("DELETE FROM games WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return response.status(404).json({ message: "not found" });
    }
    //console.log(id)
    response.json({ message: "deleted" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server error");
  }
});

// added a like route for liking games
app.post("/games/:id/like", async (request, response) => {
  const { id } = request.params;
  try {
    const result = await db.query(
      `
      UPDATE games 
      SET likes = likes + 1 
      WHERE id = $1 RETURNING *
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return response.status(404).json({ message: "not found" });
    }
    //console.log(result.rows[0])
    response.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("internal server errorr");
  }
});

//watched sam write it like this and it worked :)
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
