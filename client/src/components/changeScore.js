
export const changeScore = (addPoints) => {

  let currentScore = JSON.parse(localStorage.getItem("currentScore"));
  if (!currentScore || addPoints === 0) {
    currentScore = 0;
}
  let newScore = currentScore += addPoints;
  localStorage.setItem("currentScore", JSON.stringify(newScore));

  return newScore;
};
