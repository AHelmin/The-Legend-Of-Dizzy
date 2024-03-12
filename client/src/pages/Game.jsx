import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// const GAME_URL = "../../snes-rpg/levels/open-field.html";
import { AppTurnBattle } from "../components/turnbattle";
// import { OpenField } from "../../snes-rpg/levels/OpenField";
// import Canvas from "../components/Canvas";
import TargetPractice from '../components/targetpractice/TargetPractice/TargetPractice'
// import Matterjs from '../components/matter'
// import { IntroPage } from "../components/IntroPage";
import { GameOver } from "../components/GameOver";
import { useSelector } from 'react-redux';




export default function Game() {

  const [gameUrl, setGameUrl] = useState("../../snes-rpg/levels/open-field.html");
  const [currentScore, setCurrentScore] = useState(0)

  const stageName = useSelector((state) => state.stagename);




  return (
    <>
      <Header />
      <div>
        {/* {stageName === "start" && (
          <TargetPractice setStageName={setStageName} onStartClick={() => setStageName("game1") } />
        )} */}

        {stageName === "start" && (
          <AppTurnBattle />
        )}

        {stageName === "stage1" && (
          <TargetPractice />
        )}

        {stageName === "stage2" && (
          <GameOver />
        )}
        

        {/* {stageName === "game3" && (
          <Canvas gameUrl={gameUrl} setGameUrl={setGameUrl} stageName={stageName} setStageName={setStageName} currentScore={currentScore} setCurrentScore={setCurrentScore}/>
          )} */}

        {/* {stageName === "gameOver" && (
          <GameOver onStartClick={() => setStageName("game3") } />
        )} } */}


      </div>
    </>
  );
}
