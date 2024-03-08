import { useEffect, useState } from "react"
import Cookie from "js-cookie";

/* 

  Writing your own React hook:

  React hooks are just one or more functions that can be imported to any component
  that needs them. Think of a hook as a function which exports out other functions 
  that it wants to share with other components.

  We know that we may have several parts of our web site that need to verify if 
  the user is logged in. So let's create a hood for that!
*/

export default function playSoundEffect(){

  const [ isPlay, setIsPlay ] = useState(false)


  /* any functions we want other components to have get placed before the return statement */




  /* this is the same function used in App.jsx for the most part, but now we can share it! */
  function playSound(){
    const sound = new Audio((src = "../assets/doorOpen.mp3"));
    sound.volume = 0.2;
    if (!sound.currentTime) {
      sound.play();
      }
    setIsPlay( true )
  }


  // Whenever this hook loads, run the verifyUser function, and update state
  useEffect(() => {
    playSound()
  },[])

  // I am making the state of whether the user is logged in available from this hook
  return {
    isPlay
  }

}


// this mp3 taken from https://opengameart.org/content/town-theme-rpg
const music = new Audio((src = "../assets/openingtheme.mp3"));
music.volume = 0.2;
music.loop = true;

function playMusic() {
    if (!music.currentTime) {
    music.play();
    }
}
