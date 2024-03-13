import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import angryGary from '../../../assets/images/sprites/angry_gary.png'
import { useTypedMessage } from '../../../hooks'
import runningKaty from '../../../assets/images/sprites/runniing_katy.jpg'
import { useEffect } from 'react';

export default function ShooterEnd({ score }) {
    const dispatch = useDispatch()
    const changeStage2 = () => {
        dispatch({ type: 'SET_STAGENAME', payload: 'stage2' })
    }

    useEffect(() => {
        const audioEl = document.getElementById("music");
        audioEl.pause();
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <p className="mt-2 press-start medium-text text-white text-center">
                    {useTypedMessage(`"Impressive!", yells Gary. "You managed to hit the target ${score / 5} times! But no matter how much you try, you'll never get Dizzy back!"`)}
                </p>
                <div className="flex justify-center">
                    <img
                        src={angryGary}
                        alt="Image of Gary angry"
                    />
                </div>
                <p className="mt-2 press-start medium-text text-white text-center">
                   Katy, now a little more confident, continues her journey to find Dizzy.
                </p>
                <div className="flex justify-center">
                    <img
                        src={runningKaty}
                        alt="Image of Katy running"
                    />
                </div>
                <div className={styles.main}>
                    <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 mt-4 rounded hyrule" onClick={changeStage2}>
                        Continue Your Journey
                    </button>
                </div>
            </div>
        </>
    );
};