'use client'

import { useState } from 'react';
import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';

export default function Page({ correctSequence }: { correctSequence: string }) {
    const temporaryCorrectSequence = "HOHOHO"; // replace with correctSequence
    const [sequence, setSequence] = useState("");

    const handleButtonClick = (element: string) => {
        if (temporaryCorrectSequence === sequence + element) {
            // Increase fuel/electricity
            setSequence(sequence + element + " (correct sequence!)");
        } else if (temporaryCorrectSequence.startsWith(sequence + element)) {
            setSequence(sequence + element);
        } else {
            setSequence("");
        }
    };

    return (
        <main className="main">
            <div className="description">
                <p>
                <ElementTube sequence={sequence} />
                </p>
                {/* <div>
                    <p>I'm a thing in the top right</p>
                </div> */}
            </div>

            <div className="center">
                <div>
                    
                </div>

                <div>
                    <button onClick={() => handleButtonClick("H")}>Hydrogen</button>
                    <button onClick={() => handleButtonClick("O")}>Oxygen</button>
                </div>

            </div>

            <div className="grid">
                classname grid
            </div>
        </main>
    );
}
