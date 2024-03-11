import { useEffect, useState } from 'react';


export const ChangeScore = (addPoints) => {
  let currentScore = JSON.parse(localStorage.getItem("currentScore"));
  if (!currentScore) {
    currentScore = 0;
}
  let newScore = currentScore += addPoints;
  localStorage.setItem("currentScore", JSON.stringify(newScore));

  return newScore;
};
