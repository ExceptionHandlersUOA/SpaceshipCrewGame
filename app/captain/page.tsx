'use client'

import { useState } from "react";
import DirectionBar from "../ui/captain/DirectionBar";
import TextField from "../ui/captain/TextField";
import styles from "./page.module.css"
import ResourceBar, { Resources } from "../ui/ResourceBar";

export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)

    const increment = () => {
        if (resourceAmount < 100) {
            setResourceAmount(resourceAmount+1)
        }
    }

    const decrement = () => {
        if (resourceAmount > 0) {
            setResourceAmount(resourceAmount-1)
        }
    }

    return (
        <div className={styles.page}>
            <DirectionBar redSection={2} />
            <TextField text={"OHHOHOO"} />
            <ResourceBar resource={Resources.Electricity} value={resourceAmount} />
            <button onClick={increment} className={styles.button}>INCREMENT</button>
            <button onClick={decrement} className={styles.button}>DECREMENT</button>
        </div>
    );
}