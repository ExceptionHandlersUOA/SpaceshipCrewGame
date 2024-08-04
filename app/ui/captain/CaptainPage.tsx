'use client'

import { useState, useEffect } from "react";
import DirectionBar from "../captain/DirectionBar";
import TextField from "../captain/TextField";
import styles from "./CaptainPage.module.css"
import ResourceBar, { Resources } from "../ResourceBar";
import GameOverPage from "../GameOverPage";
import LoginPage from "../LoginPage";
import QueuePage from "../QueuePage";
import AsteroidField from "../captain/AsteroidField";

export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)

    /** Debugging methods */
    const increment = () => {
        if (resourceAmount < 100) {
            setResourceAmount(resourceAmount+1)
        }
    };
    const decrement = () => {
        if (resourceAmount > 0) {
            setResourceAmount(resourceAmount-1)
        }
    };

    const handleAsteroidClick = () => {
        console.log("Destroy Asteroid")
    }
    
    return (
        <div className={styles.playPage}>
                <AsteroidField onAsteroidClick={handleAsteroidClick} className={styles.canvas}/>
                <DirectionBar redSection={2} />
                <TextField text={"OHHOHOO"} />
                <ResourceBar resource={Resources.Electricity} value={resourceAmount} />
                {/* Debugging buttons for resource bar  */}
                    {/* <button onClick={increment} className={styles.button}>INCREMENT</button>
                    <button onClick={decrement} className={styles.button}>DECREMENT</button>  */}
               
            </div>
    ); 
}