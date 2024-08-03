'use client'

import { ElementTube } from '../ui/chemist/elementTube';
import './page.css';

export default function Page() {
    const handleButtonClick = (element: string) => {
        console.log(element);
    };

    return (
        <main className="main">
            <div className="description">
                <p>
                    Get started by editing&nbsp;
                    <code className="code">app/page.tsx</code>
                </p>
                <div>
                    <p>I'm a thing in the top right</p>
                </div>
            </div>

            <div className="center">
                <ElementTube />
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
