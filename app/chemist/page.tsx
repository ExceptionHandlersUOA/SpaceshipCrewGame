'use client'

import { useState } from 'react';
import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';

export default function Page() {
    const temporaryCorrectSequence = "HOHOHO"; // replace with correctSequence
    // removed from Page() props:  { correctSequence }: { correctSequence: string }
    const [sequence, setSequence] = useState("");

    const handleButtonClick = (element: string) => {
        if (temporaryCorrectSequence === sequence + element) {
            // Increase fuel, reduce water
            setSequence(sequence + element + " (correct sequence!)");
        } else if (temporaryCorrectSequence.startsWith(sequence + element)) {
            setSequence(sequence + element);
        } else {
            setSequence("");
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

        </div>
    );
}
