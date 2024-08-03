'use client'

import { useState } from 'react';
import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';

export default function Page() {
    const [sequence, setSequence] = useState("Sequence: ");

    const handleButtonClick = (element: string) => {
        setSequence(sequence + element);
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
