const GAME_URL = "../maze-game.index.html";

export default function MazeGame() {
  return (
    <div>
      <iframe src={GAME_URL} width={540} height={600}></iframe>
    </div>
  );
}