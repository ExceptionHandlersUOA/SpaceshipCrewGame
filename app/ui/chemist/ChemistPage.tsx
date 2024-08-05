'use client'

import { useState } from 'react';
import { ElementTube } from '../chemist/elementTube';
import styles from './ChemistPage.module.css';
import ResourceBar, { Resources } from '../ResourceBar';

export default function ChemistPage({correctSequence, electricityAmount, onSequenceCorrect}: { correctSequence: string, electricityAmount: number, onSequenceCorrect: (length: number) => void }) {
    const temporaryCorrectSequence = "HOHOHO"; // replace with correctSequence
    // removed from Page() props:  { correctSequence }: { correctSequence: string }
    const [sequence, setSequence] = useState("");

    const handleButtonClick = (element: string) => {
        if (correctSequence === sequence + element) {
            onSequenceCorrect(sequence.length);
            // reduce water
            setSequence(sequence + element + " (correct sequence!)");
        } else if (correctSequence.startsWith(sequence + element)) {
            setSequence(sequence + element);
        } else {
            setSequence(element);
        }
    };

    return (
        <div className={styles.page}>
        <br/>
            <h1>CHEMIST</h1>
            <h2>Input the correct formula!</h2>
            <div className={styles.elementTube}>
                <ElementTube sequence={sequence} />
            </div>
            <div className={styles.buttonStyle}>
                <button className={styles.button + ' ' + styles.left} onClick={() => handleButtonClick("H")}>H<sub>ydrogen</sub></button>
                <button className={styles.button + ' ' + styles.right} onClick={() => handleButtonClick("O")}>O<sub>xygen</sub></button>
            </div>
            <ResourceBar resource={Resources.Electricity} value={electricityAmount} />
        </div>
    );
}
