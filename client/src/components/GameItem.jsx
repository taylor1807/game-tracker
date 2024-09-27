import "../styles/GameItem.css";
import { Link } from "react-router-dom";

export default function GameItem({ game }) {
  //console.log(game)
  return (
    <li className="game-item">
      <div className="game-info">
        <h2>{game.title}</h2>
        <p>Likes: {game.likes}</p>
      </div>
      <div className="game-actions">
        <Link to={`/game/${game.id}`} className="game-link">
          View Details of This Game
        </Link>
      </div>
    </li>
  );
}
