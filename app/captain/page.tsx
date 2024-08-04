'use client'

import { useState, useEffect } from "react";
import DirectionBar from "../ui/captain/DirectionBar";
import TextField from "../ui/captain/TextField";
import styles from "./page.module.css"
import ResourceBar, { Resources } from "../ui/ResourceBar";
import GameOverPage from "../ui/GameOverPage";
import LoginPage from "../ui/LoginPage";
import QueuePage from "../ui/QueuePage";

export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)
    const [currentPage, setCurrentPage] = useState("login")

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
        } else if (currentPage==="gameover") {
            setCurrentPage("login")
        } else if (currentPage==="login") {
            setCurrentPage("queue")
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

    const loginPage = () => {
        return <LoginPage />
    }

    const queuePage = () => {
        return <QueuePage />
    }
    
    return (
        <main>
            <button onClick={changePage} className={styles.button}>C</button>
            {currentPage === "play" ? playPage() : null}
            {currentPage === "gameover" ? gameOverPage() : null}
            {currentPage === "login" ? loginPage() : null}
            {currentPage === "queue" ? queuePage() : null}
        </main>
        
    ); 
}