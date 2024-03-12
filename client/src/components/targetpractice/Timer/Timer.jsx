import styles from './styles.module.css';
import React from 'react'
import { useState, useEffect } from 'react';


export default function Timer({ onEnd }) {

    const [seconds, setSeconds] = useState(2)

    useEffect(() => {

        if(seconds === 0) {
            onEnd();
            return
        }
        
        const interval = setInterval(() => {
            setSeconds(secs => {
            if(secs <= 1) {
                clearInterval(interval)
                return 0
            } else {
                return secs - 1
            }
        })
    }, 1000)
        return () => clearInterval(interval);
    }, [seconds, onEnd])

    return (
        <div className={styles.timer}>
            {seconds}
        </div>
    );
};