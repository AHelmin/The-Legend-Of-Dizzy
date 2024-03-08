import { useEffect, useState } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const GAME_URL = "../../snes-rpg/levels/open-field.html";


export default function Game() {
  return (
    <>
      <div>
        <iframe src={GAME_URL} width={900} height={700}></iframe>
      </div>
    </>
  );
}
