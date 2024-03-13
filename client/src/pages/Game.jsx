import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AppTurnBattle } from "../components/turnbattle";
import Canvas from "../components/Canvas";
import TargetPractice from '../components/targetpractice/TargetPractice/TargetPractice'
import { IntroPage } from "../components/IntroPage";
import { GameOver } from "../components/GameOver";
import { ChangeScore } from "../components/ChangeScore";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../output.css';
import '../assets/css/header.css';



export default function Game() {

  const [gameUrl, setGameUrl] = useState("../../snes-rpg/levels/open-field.html");
  const [currentScore, setCurrentScore] = useState(0)

  const userName = useSelector((state) => state.name);
  const stageName = useSelector((state) => state.stagename);
  const battleScore = useSelector((state) => state.battlescore);
  const rpgScore = useSelector((state) => state.rpgscore);
  const shooterScore = useSelector((state) => state.shooterScore);
  const dispatch = useDispatch();

  const audioTrackList = ["the-bards-tale.mp3", "battle-theme.mp3",]
  const audioEl = new Audio(audioTrackList)
  let currentMusic = audioTrackList[0];


function changeTrack(track) {
  audioEl.src = audioTrackList[track];
  audioEl.preload = "";
  audioEl.volume = 0.1;
  if (!audioEl.currentTime) {
    audioEl.play();
    }
}

  return (
    <>
    <audio src={currentMusic} id="music" loop></audio>
      <Header />
      {(stageName === "stage1" || stageName === "stage2"|| stageName === "stage3") && (
      <div className="text-center mt-2 flex press-start">
        Current Score: {battleScore + shooterScore + rpgScore}
      </div>
      )}
      <div>
      {stageName === "start" && (
        ChangeScore(0),
        dispatch({ type: 'SET_SHOOTERSCORE', payload: 0 }),
        dispatch({ type: 'SET_BATTLESCORE', payload: 0 }),
        dispatch({ type: 'SET_RPGSCORE', payload: 0 }),
          <IntroPage />
        )}
 
  <div className="game-flex">
        {stageName === "stage1" && (
          <TargetPractice className="game-disp"/>
        )}
        
        {stageName === "stage2" && (
          <AppTurnBattle className="game-disp" />
        )}

        {stageName === "stage3" && (
          // changeTrack(1),
          <Canvas className="game-disp" gameUrl={gameUrl}/>
        )}
</div>

        {stageName === "gameOver" && (
          <GameOver />
        )}
      </div>
    </>
  );
}
