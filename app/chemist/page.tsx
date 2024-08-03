'use client'

import { useState } from 'react';
import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';
import ResourceBar, { Resources } from '../ui/ResourceBar';

export default function Page() {
    const temporaryCorrectSequence = "HOHOHO"; // replace with correctSequence
    // removed from Page() props:  { correctSequence }: { correctSequence: string }
    const [sequence, setSequence] = useState("");

    const [fuelAmount, setFuelAmount] = useState(0);

    const handleButtonClick = (element: string) => {
        if (temporaryCorrectSequence === sequence + element) {
            setFuelAmount(fuelAmount + sequence.length);
            // reduce water
            setSequence(sequence + element + " (correct sequence!)");
        } else if (temporaryCorrectSequence.startsWith(sequence + element)) {
            setSequence(sequence + element);
        } else {
            setSequence(element);
        }
    };

    return (
        <div className="page">
            <h1>CHEMIST</h1>
            <div className="elementtube">
                <ElementTube sequence={sequence} />
            </div>
            <div>
                <button onClick={() => handleButtonClick("H")}>Hydrogen</button>
                <button onClick={() => handleButtonClick("O")}>Oxygen</button>
            </div>
            <ResourceBar resource={Resources.Fuel} value={fuelAmount} />

        </div>
    );
}
