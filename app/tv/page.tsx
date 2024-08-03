"use client";
import { useEffect, useRef, useState } from "react";
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

function getPlayerDisplayText(roleData: RoleData): string {
    let displayText = roleData.username;
    let role = NICE_ROLE_NAME[roleData.roleId];
    if (role !== '') {
        displayText += ` (${role})`;
    }
    return displayText;
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
                    <span className={styles.circleSpan}>P{userId}</span> {getPlayerDisplayText(roleData)}
                </ul>
            );
        });
    }
}

function setUpCanvas(canvas: HTMLCanvasElement) {
    // draw a starfield effect

    const ctxNullable = canvas.getContext('2d');
    if (ctxNullable == null) {
        return;
    }
    const ctx = ctxNullable;

    // set canvas size to parent container
    if (canvas.parentElement != null) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    const width = canvas.width;
    const height = canvas.height;

    const starCount = 100;
    const stars: { x: number; y: number; size: number; }[] = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3,
        });
    }

    function drawStar(star: {x: number, y: number, size: number}) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    // draws an old-school style asteroid (like the game asteroids)
    function drawAsteroid() {
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        for (const star of stars) {
            drawStar(star);
        }
    }

    function update() {
        for (const star of stars) {
            star.y += 0.5;
            star.x += (star.x - width / 2) * 0.001 * star.y / height;
            if (star.y > height) {
                star.y = 0;
            }
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}

const comm = new Comm();

function TvDisplay() {
    const [players, setPlayers] = useState<PlayerData[]>(PLAYERS);

    const [timeSecs, setTimeSecs] = useState(0);

    const [state, setState] = useState<State | null>(null);

    const [roomCode, setRoomCode] = useState<string>('');

    const [isGameReady, setIsGameReady] = useState(false);

    const [isGameEnded, setIsGameEnded] = useState(false);

    const [gameState, setGameState] = useState<GameStateType>('lobby');
    const gameStateRef = useRef(gameState);

    useEffect(() => {
        async function doAsyncStuff() {
            await comm.start();

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

        interval = setInterval(() => {
            if (gameStateRef.current == 'inGame') {
                setTimeSecs((timeSecs) => timeSecs + 1);
            }
        }, 1000);

        doAsyncStuff().catch((e) => {
            console.error(e);
        });

        setUpCanvas(document.getElementById('starCanvas') as HTMLCanvasElement);

        return () => {
            clearInterval(interval);
            comm.stop();
        };
    }, []);

    function handleStartGame() {
        async function doAsyncStuff() {
            await comm.roomStart();
        }

        doAsyncStuff().catch((e) => {
            console.error(e);
        });
    }

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
                    (isGameReady && gameState === 'lobby') ?
                        <button className={styles.ready + ' ' + chivoMono.className} onClick={handleStartGame}>
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
            <div className={styles.visualContainer}>
                <canvas id="starCanvas" className={styles.canvas}>

                </canvas>

                <div className={styles.instructions}>
                    <h2>How to play:</h2>
                    <span>TODO</span>
                </div>
            </div>
        </div>
    </div>
}

export default function Tv() {
    return TvDisplay();
}
