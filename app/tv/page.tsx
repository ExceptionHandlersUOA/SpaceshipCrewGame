"use client";
import { useEffect, useState } from "react";
import { GameStateType, NICE_ROLE_NAME, RoleData, RoleName, State } from "../common";
import styles from "./page.module.css";

import { Michroma, Chivo_Mono } from "next/font/google";
import Comm from "../comm";
const michroma = Michroma({ weight: '400', subsets: ["latin"] });
const chivoMono = Chivo_Mono({ weight: '400', subsets: ["latin"] });

type PlayerData = {user_id: number; role_name: RoleName };

const PLAYERS: PlayerData[] = [
    {user_id: 1, role_name: 'pilot'},
    {user_id: 2, role_name: 'engineer'},
    {user_id: 3, role_name: 'chemist'},
];

function getElapsedString(elapsedSecs: number): string {
    const secs = elapsedSecs % 60;
    const secsString = secs.toString().padStart(2, '0');
    const mins = Math.floor((elapsedSecs - secs) / 60);
    const minsString = mins.toString().padStart(2, '0');
    return `${minsString}:${secsString}`;
}

function playerList(players: { [user_id: string | number]: RoleData }) {
    const playerArr = Object.entries(players);
    playerArr.sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10));
    if (playerArr.length === 0) {
        return <div style={{color: "grey"}}>No players</div>;
    } else {
        return playerArr.map(([userId, roleData]: [string, RoleData]) => {
            return (
                <ul className={styles.playerRow} key={userId.toString()}>
                    <span className={styles.circleSpan}>P{userId}</span> {`${roleData.username} (${NICE_ROLE_NAME[roleData.roleId]})`}
                </ul>
            );
        });
    }
}


function TvDisplay() {
    const [players, setPlayers] = useState<PlayerData[]>(PLAYERS);

    const [timeSecs, setTimeSecs] = useState(0);

    const [state, setState] = useState<State | null>(null);

    const [roomCode, setRoomCode] = useState<string>('');

    const [isGameReady, setIsGameReady] = useState(false);

    const [isGameEnded, setIsGameEnded] = useState(false);

    const [gameState, setGameState] = useState<GameStateType>('lobby');

    useEffect(() => {
        const comm = new Comm();

        async function doStuff() {
            try {
                await comm.start();
            } catch (e) {
                console.error(e);
            }

            let roomCreateRes = await comm.roomCreate();
            console.log(roomCreateRes);
            if (roomCreateRes != null) {
                setRoomCode(roomCreateRes.roomCode);
            }
        }

        comm.onWriteMessage((data: string) => {
            console.log(data);
        });

        comm.onState((state: State) => {
            console.log(state);
            setState(state);
            setGameState(state.gameState);
        });

        comm.onGameNotReady(() => { setIsGameReady(false); });
        comm.onGameReady(() => { setIsGameReady(true); });

        let interval = undefined;

        // TODO run when the game starts
        //interval = setInterval(() => {
        //    setTimeSecs((timeSecs) => timeSecs + 1);
        //}, 1000);

        doStuff();

        return () => {
            clearInterval(interval);
            comm.stop();
        };
    }, []);

    return <div className={(styles.tv + ' ' + michroma.className)}>
        <div className={styles.infoColumn}>
            <div>
                <div>
                    <h1>Among Us 2</h1>
                </div>
                <div className={styles.playerList}>
                    {
                        playerList(state?.roles ?? {})
                    }
                </div>
                {
                    (isGameReady && gameState === 'lobby' || true) ?
                        <button className={styles.ready + ' ' + chivoMono.className}>
                            Start game!
                        </button>
                    :
                        <></>
                }
            </div>
            <>
                {
                    (false) ?
                        <div className={styles.timer}>
                            <span className={(styles.time + ' ' + chivoMono.className)}>{getElapsedString(timeSecs)}</span>
                            <span className={styles.label}>Time Survived</span>
                        </div>
                    :
                        <div className={styles.timer}>
                            <span className={(styles.time + ' ' + chivoMono.className)}>{roomCode}</span>
                            <span className={styles.label}>Room Code - Join now!</span>
                        </div>
                }
            </>
        </div>
        <div className={styles.visual}>
            <canvas className={styles.canvas}>

            </canvas>
        </div>
    </div>
}

export default function Tv() {
    return TvDisplay();
}
