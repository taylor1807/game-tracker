import "../styles/GameList.css";
import GameItem from "./GameItem";

export default function GameList({ games }) {
  //console.log(games)
  return (
    <ul className="games-list">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </ul>
  );
}
