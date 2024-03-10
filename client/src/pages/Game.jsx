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

  // const { currentLevel } =useAppCtx();



  return (
    <>
    <h5>{stageName}</h5>
      <div>
        {stageName === "start" && (
          <StartMenu onStartClick={() => setStageName("intro") } />
        )}

        {/* {stageName === "intro" && (
          <OpenField onLevel2={gameUrl => {
            setGameUrl(gameUrl);
            setStageName("level2");
          }} />
        )} */}

        {stageName === "intro" && (
          <Canvas gameUrl={gameUrl}/>
          )}
      </div>
    <AppTurnBattle/>
    <Matterjs />
    </>
  );
}
