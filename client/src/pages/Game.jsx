import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// const GAME_URL = "../../snes-rpg/levels/open-field.html";
// import { AppTurnBattle} from "../components/turnbattle";
// import { OpenField } from "../../snes-rpg/levels/OpenField";
// import Canvas from "../components/Canvas";
import TargetPractice from '../components/targetpractice/TargetPractice/TargetPractice'
// import Matterjs from '../components/matter'
// import { IntroPage } from "../components/IntroPage";
import { GameOver } from "../components/GameOver";
import { useSelector } from 'react-redux';




export default function Game() {

  const [gameUrl, setGameUrl] = useState("../../snes-rpg/levels/open-field.html");
  const [stageName, setStageName] = useState("start");
  const [currentScore, setCurrentScore] = useState(0)

  const scoreNow = useSelector((state) => state.shooterScore);


  return (
    <>
    <h5>{stageName} {scoreNow}</h5>
      <div>
      {stageName === "start" && (
          <GameOver setStageName={setStageName} onStartClick={() => setStageName("game1") } />
        )}
        
        {/* {stageName === "start" && (
          <Canvas gameUrl={gameUrl} setGameUrl={setGameUrl} onStartClick={() => setStageName("game2") } />
        )} */}
        
        {/* {stageName === "game1" && (
          <Matterjs onStartClick={() => setStageName("game2") } />
        )}

        {stageName === "game2" && (
          <AppTurnBattle setCurrentScore={setCurrentScore} onStartClick={() => setStageName("game3") } />
        )}

        {stageName === "game3" && (
          <Canvas gameUrl={gameUrl} setGameUrl={setGameUrl} stageName={stageName} setStageName={setStageName} currentScore={currentScore} setCurrentScore={setCurrentScore}/>
          )}

        {stageName === "gameOver" && (
          <GameOver onStartClick={() => setStageName("game3") } />
        )} */}


      </div>
    <TargetPractice />
    </>
  );
}
