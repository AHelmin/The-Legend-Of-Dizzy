import { useEffect, useState } from "react";
import Header from "../components/Header";
import { AppTurnBattle } from "../components/turnbattle";
import Canvas from "../components/Canvas";
import TargetPractice from '../components/targetpractice/TargetPractice/TargetPractice'
import { IntroPage } from "../components/IntroPage";
import { GameOver } from "../components/GameOver";
import { ChangeScore } from "../components/ChangeScore";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';




export default function Game() {

  const [gameUrl, setGameUrl] = useState("../../snes-rpg/levels/open-field.html");
  const [currentScore, setCurrentScore] = useState(0)

  const stageName = useSelector((state) => state.stagename);
  const dispatch = useDispatch();


  return (
    <>
      <Header />
      <div>
      {stageName === "start" && (
        ChangeScore(0),
        dispatch({ type: 'SET_SHOOTERSCORE', payload: 0 }),
        dispatch({ type: 'SET_BATTLESCORE', payload: 0 }),
        dispatch({ type: 'SET_RPGSCORE', payload: 0 }),
          <IntroPage />
        )}

        {stageName === "stage1" && (
          <TargetPractice />
        )}
        
        {stageName === "stage2" && (
          <AppTurnBattle />
        )}

        {stageName === "stage3" && (
          <Canvas gameUrl={gameUrl}/>
        )}

        {stageName === "gameOver" && (
          <GameOver />
        )}
      </div>
    </>
  );
}
