import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const GAME_URL = "../../snes-rpg/levels/open-field.html";
import { AppTurnBattle } from "../components/turnbattle";
import Matterjs from '../components/matter'



export default function Game() {
  return (
    <>
      <Header />
      <div>
        <iframe src={GAME_URL} width="100%" height="700px"></iframe>
      </div>
    <AppTurnBattle />
    <Matterjs />
    </>
  );
}
