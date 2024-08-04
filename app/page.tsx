'use client'

import styles from "./page.module.css";
import { useState } from "react";
import GameOverPage from "./ui/GameOverPage";
import LoginPage from "./ui/LoginPage";
import QueuePage from "./ui/QueuePage";
import CaptainPage from "./ui/captain/CaptainPage"
import ChemistPage from "./ui/chemist/ChemistPage"
import EngineerPage from "./ui/engineer/EngineerPage"
import Comm from "./comm";

const comm: Comm = new Comm();

export default function Home() {
  const [currentPage, setCurrentPage] = useState("login")
  const [userRole, setUserRole] = useState("captain")

  // Captain Variables
  const [fuelAmount, setFuelAmount] = useState(100)
  const [chemSequence, setChemSequence] = useState("");

  //#region Debugging methods
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

  const changeRole = () => {
    if (userRole==="captain") {
        setUserRole("chemist")
    } else if (userRole==="chemist") {
        setUserRole("engineer")
    } else {
      setUserRole("captain")
    }
  };
  //#endregion

  //#region Captain API Methods
  function onHarvestAsteroid() {
    return;
    // TODO increase water, reduce electricity?
    comm.actionEvent('harvestAsteroid');
  }

  function onChangeFuelAmount() {
    // TODO Get the fuel level from server and pass it on to play page
    setFuelAmount(fuelAmount+5);
  }

  function getNewSequence() {
    // TODO get new sequence from server
    return;
    setChemSequence("");
  }
  //#endregion

  const playPage = () => {
    if (userRole === "captain") {
      return <CaptainPage handleAsteroidClick={onHarvestAsteroid} fuelAmount={fuelAmount} chemSequence={chemSequence}/>
    } else if (userRole === "chemist") {
      return <ChemistPage />
    } else if (userRole === "engineer")
      return <EngineerPage />
  }

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
            <button onClick={changeRole} className={styles.button}>R</button>
            {currentPage === "play" ? playPage() : null}
            {currentPage === "gameover" ? gameOverPage() : null}
            {currentPage === "login" ? loginPage() : null}
            {currentPage === "queue" ? queuePage() : null}
        </main>
  );
}
