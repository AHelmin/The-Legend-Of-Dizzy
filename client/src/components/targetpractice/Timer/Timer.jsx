import styles from './styles.module.css';
import React from 'react'
import { useState, useEffect } from 'react';


export default function Timer() {

    const [seconds, setSeconds] = useState(10)

    useEffect(() => {
        
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
    }, [])

    return (
        <div className={styles.timer}>
            {seconds}
        </div>
    );
};