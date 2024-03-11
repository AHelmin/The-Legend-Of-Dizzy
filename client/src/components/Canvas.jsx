import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function Canvas(props) {
  let gameUrl = props.gameUrl;
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("storage", () => {
      // When local storage changes, dump the list to
      // the console.
      let newScore = JSON.parse(window.localStorage.getItem("currentScore"));
      console.log(newScore);
          dispatch({ type: 'SET_RPGSCORE', payload: newScore });
          }),[]
    });

  useEffect(() => {
    if (window.location.pathname === "/level2") {
      gameUrl = "../../snes-rpg/levels/dungeon.html";
    } else {
      gameUrl = props.gameUrl;
    }
  });

  return (
    <>
      <iframe
        src={gameUrl}
        width={900}
        height={700}
        id="iframe"
        data-state={props.stageName}
      ></iframe>
    </>
  );
}
