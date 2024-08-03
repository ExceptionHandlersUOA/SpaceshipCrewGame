'use client'

import { useState } from 'react';
import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';

export default function Page({ correctSequence }: { correctSequence: string }) {
    const temporaryCorrectSequence = "HOHOHO"; // replace with correctSequence
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
        <main className="main">
            <h1>CHEMIST</h1>
            <div className="elementtube">
                <p>
                    Sequence: <ElementTube sequence={sequence} />
                </p>
            </div>

            <div className="center">
                <div>
                    <button onClick={() => handleButtonClick("H")}>Hydrogen</button>
                    <button onClick={() => handleButtonClick("O")}>Oxygen</button>
                </div>

            </div>
        </main>
    );
}
