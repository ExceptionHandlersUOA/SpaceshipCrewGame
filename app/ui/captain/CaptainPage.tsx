'use client'

import { useState, useEffect } from "react";
import DirectionBar from "../captain/DirectionBar";
import TextField from "../captain/TextField";
import styles from "./CaptainPage.module.css"
import ResourceBar, { Resources } from "../ResourceBar";
import AsteroidField from "../captain/AsteroidField";

export default function CaptainPage({ onAsteroidClick, fuelAmount, chemSequence }: { onAsteroidClick: () => void, fuelAmount: number, chemSequence: string }) {
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
    
    return (
        <div className={styles.playPage}>
            {/* <DirectionBar redSection={2} /> */}
            <TextField text={chemSequence} />
            <ResourceBar resource={Resources.Fuel} value={fuelAmount} />
            {/* Debugging buttons for resource bar  */}
                {/* <button onClick={increment} className={styles.button}>INCREMENT</button>
                <button onClick={decrement} className={styles.button}>DECREMENT</button>  */}

            <AsteroidField onAsteroidClick={onAsteroidClick} className={styles.canvas}/>               
        </div>
    ); 
}
