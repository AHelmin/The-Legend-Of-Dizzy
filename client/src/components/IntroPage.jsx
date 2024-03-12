import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../output.css";
import "../assets/css/intro.css";
import { useTypedMessage } from "../hooks";
import { wait } from '../shared';
import garyImg from "../assets/images/gary-pixelated-small.png";
import sactownImg from "../assets/images/sactown-pixelated.png";
import noteImg from "../assets/images/note.png";

export const IntroPage = ({ onStartClick }) => {
  let [currentSlide, setCurrentSlide] = useState(0);

  let nextScreen = false;

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const introSlide = document.getElementById("introSlide");
      const introImg = document.getElementById("introImg");
      const introText = document.getElementById("introText");
      let newSlide = currentSlide + 1;
      
      setCurrentSlide(newSlide);
      introImg.setAttribute("src", slideArray[newSlide].image);
      introText.textContent = slideArray[newSlide].text;
      console.log(newSlide)
    }),
      [document];
  });


  const text1 =
    "Once upon a time there was a TA named Katy and her beloved companion Dizzy.  They lived in the shining Capital City in the Golden State.";

  let text2 =
    "Katy’s boss…the Evil Gary…was constantly leaning on her to Concatenate for him because he was scared of it.  He made her do all the heavy lifting and never sent her the Starbucks he promised after she would fix his errors.";

  let text3 = "Worst of all, Gary was extremely jealous of Dizzy. Gary became so jealous of Dizzy that he took a trek all the way from Crab Wire City to Capital City in the Golden State and KIDNAPPED DIZZY!"

    let text4 = "Our hero Katy was at a Reggae Festival at the time so Dizzy was all alone (and legally blind), and he was easily taken by the Evil Gary."

    let text5 = "Katy returned home, shook off the fog and realized Dizzy was nowhere to be found!  In his dog bed was this note:"

const slideArray = [{image: sactownImg, text: text1}, {image: garyImg, text: text2}, {image: garyImg, text: text3}, {image: garyImg, text: text4}, {image: garyImg, text: text5}, {image: noteImg, text: ""},]


  return (
    <div>
      <Header />

      <div className="mx-auto" id="introSlide">
        <div className="mt-8">
          <img
            src={slideArray[currentSlide].image}
            alt="Centered Image"
            className="mx-auto rounded-lg object-scale-down"
            id="introImg"
          />
        </div>
        <div className="container mt-8 px-8 mx-auto max-w-md">
          <div
            className="text-lg mt-2 mb-8 mx-auto press-start text-white"
            id="introText"
          >
            {slideArray[currentSlide].text}
            {/* {useTypedMessage(text1)[1] === true && (
              <p className="mt-8 mx-auto">---Click anywhere to continue---</p>
            )} */}
          </div>
        </div>
      </div>
      <div className="mt-8">
      <p className="mt-8 text-center press-start text-white">---Click anywhere to continue---</p>
      </div>
    </div>
  );
};
