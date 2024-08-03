'use client'

import { useState, useEffect } from "react";
import DirectionBar from "../ui/captain/DirectionBar";
import TextField from "../ui/captain/TextField";
import styles from "./page.module.css"
import ResourceBar, { Resources } from "../ui/ResourceBar";
import GameOverPage from "../ui/GameOverPage";

export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)
    const [currentPage, setCurrentPage] = useState("play")

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

    const changePage = () => {
        if (currentPage==="play") {
            setCurrentPage("gameover")
        } else {
            setCurrentPage("play")
        }
    };

    
    const playPage = () => {
        return (
            <div className={styles.playPage}>
                <DirectionBar redSection={2} />
                <TextField text={"OHHOHOO"} />
                <ResourceBar resource={Resources.Electricity} value={resourceAmount} />
                {/* Debugging buttons for resource bar  */}
                    {/* <button onClick={increment} className={styles.button}>INCREMENT</button>
                    <button onClick={decrement} className={styles.button}>DECREMENT</button>  */}
               
            </div>
        );
    };

    const gameOverPage = () => {
        return <GameOverPage />
    }
    
    return (
        <main>
            {/* <button onClick={changePage} className={styles.button}>C</button> */}
            {currentPage === "play" ? playPage() : gameOverPage()}
        </main>
        
    ); 
}