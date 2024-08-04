'use client'

import { useState } from "react";
import styles from "./page.module.css"
import GameOverPage from "../ui/GameOverPage";
import LoginPage from "../ui/LoginPage";
import QueuePage from "../ui/QueuePage";
import SineGraph from '../ui/engineer/SineGraph';
import ResourceBar, { Resources } from "../ui/ResourceBar";

export default function Page() {
    const [electricityAmount, setElectricityAmount] = useState(0)
    const [currentPage, setCurrentPage] = useState("login")

    const changePage = () => {
        if (currentPage === "play") {
            setCurrentPage("gameover")
        } else if (currentPage === "gameover") {
            setCurrentPage("login")
        } else if (currentPage === "login") {
            setCurrentPage("queue")
        } else {
            setCurrentPage("play")
        }
    };


    const playPage = () => {
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