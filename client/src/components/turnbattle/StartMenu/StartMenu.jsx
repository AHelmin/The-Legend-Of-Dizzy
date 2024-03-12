import "../../../assets/css/header.css"
import { useTypedMessage } from '../../../hooks';
import startTB from "../../../assets/images/sprites/start-turnbattle.png"




export const StartMenu = ({ onStartClick }) => {
  return (
    <>
      <div className="container mx-auto flex-col justify-center align-content-center">
        <p className="mt-2 press-start text-white text-center">
          {useTypedMessage(`Katy continued for miles and miles and miles and miles until she reached Crab Wire City.`)}
        </p>
        <img
          src={startTB}
          alt="Image of Katy Gary and Katy again"
        />
        <p className="mt-2 press-start text-white text-center">
          Standing in the town square was The Evil Gary waiting to battle it out with her.
        </p>
        <p className="mt-2 press-start text-white text-center">
          Gary shouted:  “Your precious puppy isn't here!  You'll have to get past me if you want to rescue him!  Be careful foolish TA….I have HANDLEBARS!!!”
        </p>
        <p className="big-text mt-2 press-start text-red-800 text-center">
          Our Hero rushes into BATTLE!!!!!!!!
        </p>
        <div className="flex justify-center">
        <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={onStartClick}>
          Start Battle
        </button>
        </div>
      </div>


    </>
  );
};
