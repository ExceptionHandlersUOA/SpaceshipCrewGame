'use client'

import { useState } from "react";
import styles from "./EngineerPage.module.css"
import SineGraph from '../engineer/SineGraph';
import ResourceBar, { Resources } from "../ResourceBar";

export default function EngineerPage() {
    const [electricityAmount, setElectricityAmount] = useState(0)


    return (
        <div className={styles.playPage}>
            <h1>ENGINEER</h1>
            {/* style={{
                border: '2px solid black',  // Border thickness, style, and color
                padding: '10px',            // Optional: Add padding inside the border
                margin: '10px'              // Optional: Add margin outside the border
            }} */}
            <h2>Match the waves!</h2>
            <SineGraph />
            <ResourceBar resource={Resources.Electricity} value={electricityAmount} />
        </div>
    );
}