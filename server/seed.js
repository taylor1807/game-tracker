import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const seedDatabase = async () => {
  try {
    // learnt the below code in the pair programming excercise to clear the db and start from scratch
    await db.query("TRUNCATE games, genres RESTART IDENTITY CASCADE");
    //adding some basic genres to the genre table
    const genres = ["Action", "RPG", "Strategy", "Adventure"];
    for (let genre of genres) {
      await db.query("INSERT INTO genres (name) VALUES ($1)", [genre]);
    }
    //adding some basic info to the games table
    await db.query(`
      INSERT INTO games (title, description, release_year, genre_id, likes)
      VALUES 
        ('The Witcher 3', 'A fantasy RPG.', 2015, 2, 10),
        ('DOOM Eternal', 'An action-packed FPS.', 2020, 1, 15),
        ('Civilization VI', 'A grand strategy game.', 2016, 3, 20),
        ('Hades', 'A rogue-like action game.', 2020, 1, 25)
    `);

    console.log("seeded successfully!");
    db.end();
  } catch (error) {
    console.error("problem seeding database:", error);
    db.end();
  }
};

seedDatabase();
