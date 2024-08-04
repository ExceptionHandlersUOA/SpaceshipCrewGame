'use client'

import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
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
  
  // Engineer Variables
  const [waterAmount, setWaterAmount] = useState(100);

  // TODO this is never updated yet
  const [correctSequence, setCorrectSequence] = useState("HOHOHO");

  // reference to state, userid
  const stateRef = useRef(state);
  const userIdRef = useRef(userId);

  useEffect(() => {
    async function doAsyncStuff() {
      await comm.start();
    }

    comm.onState((state: State) => {
      console.log(state);
      setState(state);
      stateRef.current = state;
      setGameState(state.gameState);
    });

    comm.onGameNotReady(() => { setIsGameReady(false); });
    comm.onGameReady(() => { setIsGameReady(true); });

    comm.onGameStart(() => {
      const roleId = stateRef.current?.roles[userIdRef.current as number]?.roleId;
      if (roleId != null) {
        setUserRole(roleId);
        setCurrentPage("play");
      }
    });

    comm.onGameEnd(() => {
      setCurrentPage("gameover");
    });

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
        userIdRef.current = res.userId;
        setCurrentPage("queue");
      }
    });
  }

  function onGameStartPressed() {
    comm.roomStart().then(() => {});
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
  function handleHarvestAsteroid() {
    // TODO increase water, reduce electricity?
    comm.actionEvent('harvestAsteroid');
  }
  //#endregion

  //#region Engineer API Methods
  function handleSineMatch() {
    // TODO increase water, reduce electricity?
    comm.actionEvent('matchSine');
  }

  //#endregion

  return (
    <main>
            {/* <button onClick={changePage} className={styles.button}>C</button> */}
            {/* <button onClick={changeRole} className={styles.button}>R</button> */}
            {currentPage === "play" ? (
                  (userRole === "pilot") ?
                    <CaptainPage onAsteroidClick={handleHarvestAsteroid} fuelAmount={state?.resources.fuel ?? 0} chemSequence={state!.currentSequence}/>
                  : (userRole === "chemist") ?
                    <ChemistPage correctSequence={state!.currentSequence} fuelAmount={state?.resources.fuel ?? 0} onSequenceCorrect={onSequenceCorrect} />
                  : (userRole === "engineer") ?
                    <EngineerPage onSineMatch={handleSineMatch} waterAmount={state?.resources.water ?? 0}/>
                  : <></>
             ) : null}
            {currentPage === "gameover" ? <GameOverPage /> : null}
            {currentPage === "login" ? <LoginPage onLoginPressed={onLoginPressed} /> : null}
            {currentPage === "queue" ? <QueuePage canStart={isGameReady} onStart={onGameStartPressed} /> : null}
        </main>
  );
}
