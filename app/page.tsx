'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function doAsyncStuff() {
      await comm.start();
    }

    doAsyncStuff().catch((e) => {
      console.error(e);
    });

    return () => {
      comm.stop();
    };
  }, []);

  // TODO
  function onSequenceCorrect(seqLength: number) {
    // TODO increase fuel, reduce water?
    comm.actionEvent('correctFormula');
  }

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

  const playPage = () => {
    if (userRole === "captain") {
      return <CaptainPage />
    } else if (userRole === "chemist") {
      return <ChemistPage correctSequence={""} fuelAmount={0} onSequenceCorrect={onSequenceCorrect} />
    } else if (userRole === "engineer") {
      return <EngineerPage />
    }
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
