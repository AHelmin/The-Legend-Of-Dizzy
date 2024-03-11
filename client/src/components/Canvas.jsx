import React, { useState, useEffect } from "react";

export default function Canvas(props) {
  let gameUrl = props.gameUrl;

  useEffect(() => {
    // props.setStageName("field")
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
