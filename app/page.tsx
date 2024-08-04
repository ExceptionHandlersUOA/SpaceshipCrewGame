'use client'

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import GameOverPage from "./ui/GameOverPage";
import LoginPage from "./ui/LoginPage";
import QueuePage from "./ui/QueuePage";
import CaptainPage from "./ui/captain/CaptainPage"
import ChemistPage from "./ui/chemist/ChemistPage"
import EngineerPage from "./ui/engineer/EngineerPage"
import Comm from "./comm";
import { GameStateType, State } from "./common";

const comm: Comm = new Comm();

export default function Home() {
  const [currentPage, setCurrentPage] = useState("login")
  const [userRole, setUserRole] = useState("captain")
  
  const [state, setState] = useState<State | null>(null);
  const [gameState, setGameState] = useState<GameStateType | null>(null);
  const [isGameReady, setIsGameReady] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  
  // Captain Variables
  const [fuelAmount, setFuelAmount] = useState(100)
  const [chemSequence, setChemSequence] = useState("");


  // TODO this is never updated yet
  const [correctSequence, setCorrectSequence] = useState("HOHOHO");

  useEffect(() => {
    async function doAsyncStuff() {
      await comm.start();
    }

    comm.onState((state: State) => {
      console.log(state);
      setState(state);
      setGameState(state.gameState);
    });

    comm.onGameNotReady(() => { setIsGameReady(false); });
    comm.onGameReady(() => { setIsGameReady(true); });

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

  function onLoginPressed(roomCode: string, username: string) {
    comm.roomJoin(roomCode, username).then((res) => {
      if (res?.userId != null) {
        setUserId(res.userId);
        setCurrentPage("queue");
      }
    });
  }

  function onGameStartPressed() {
    comm.roomStart().then(() => {
      console.log("TODO");
    });
  }

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
      return <ChemistPage correctSequence={correctSequence} fuelAmount={state?.resources.fuel ?? 0} onSequenceCorrect={onSequenceCorrect} />
    } else if (userRole === "engineer") {
      return <EngineerPage />
    }
  }

  const gameOverPage = () => {
      return <GameOverPage />
  }

  const loginPage = () => {
      return <LoginPage onLoginPressed={onLoginPressed} />
  }

  const queuePage = () => {
      return <QueuePage canStart={isGameReady} onStart={onGameStartPressed} />
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
