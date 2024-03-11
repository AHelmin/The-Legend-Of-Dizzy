import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// const GAME_URL = "../../snes-rpg/levels/open-field.html";
import { AppTurnBattle, StartMenu } from "../components/turnbattle";
import { OpenField } from "../../snes-rpg/levels/OpenField";
import Canvas from "../components/Canvas";
import Matterjs from '../components/matter'

import { useAppCtx } from "../providers/AppProvider";



export default function Game() {

  const [gameUrl, setGameUrl] = useState("../../snes-rpg/levels/open-field.html");
  const [stageName, setStageName] = useState("start");
  const [currentScore, setCurrentScore] = useState("0")

  // const { currentLevel } =useAppCtx();

// window.addEventListener("message", function (e) {
//   this.window.location.replace("/home")
//   if (e.message === "dungeon") {
//     setStageName("dungeon")
//     this.alert("test")
//   }
// })

  return (
    <>
    <h5>{stageName} {currentScore}</h5>
      <div>
        {stageName === "start" && (
          <StartMenu onStartClick={() => setStageName("intro") } />
        )}

        {stageName === "intro" && (
          <Canvas gameUrl={gameUrl} setGameUrl={setGameUrl} stageName={stageName} setStageName={setStageName} currentScore={currentScore} setCurrentScore={setCurrentScore}/>
          )}
      </div>
    <AppTurnBattle/>
    <Matterjs />
    </>
  );
}
