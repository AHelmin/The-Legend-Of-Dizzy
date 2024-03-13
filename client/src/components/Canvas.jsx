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
          dispatch({ type: 'SET_RPGSCORE', payload: newScore });
          }),[]
    });

    useEffect(() => {
      window.addEventListener("storage", () => {
        // When local storage changes, dump the list to
        // the console.
        let gameOver = JSON.parse(window.localStorage.getItem("gameOver"));
        if (gameOver) {
          dispatch({ type: 'SET_STAGENAME', payload: "gameOver" });
        }
            }),[]
      });

  useEffect(() => {
    const audioEl = document.getElementById("music");
    
  }, []);


  return (
    <>
      <iframe
        src={gameUrl}
        width={900}
        height={700}
        id="iframe"
      ></iframe>
    </>
  );
}
