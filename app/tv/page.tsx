"use client";
import { useEffect, useState } from "react";
import { RoleName } from "../common";
import styles from "./page.module.css";

import { Michroma, Chivo_Mono } from "next/font/google";
import Comm from "../comm";
const michroma = Michroma({ weight: '400', subsets: ["latin"] });
const chivoMono = Chivo_Mono({ weight: '400', subsets: ["latin"] });

const NICE_ROLE_NAME: { [roleName in RoleName]: string } = {
    'pilot': 'Captain',
    'engineer': 'Engineer',
    'chemist': 'Chemist',
};

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


export default function Lobby() {
    const [players, setPlayers] = useState<PlayerData[]>(PLAYERS);

    const [timeSecs, setTimeSecs] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeSecs((timeSecs) => timeSecs + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <div className={(styles.tv + ' ' + michroma.className)}>
        <div className={styles.infoColumn}>
            <div className={styles.playerList}>
                {
                    players.map((player: PlayerData) => {
                        return (
                            <ul className={styles.playerRow} key={player.user_id.toString()}>
                                <span className={styles.circleSpan}>P{player.user_id}</span> {NICE_ROLE_NAME[player.role_name]}
                            </ul>
                        );
                    })
                }
            </div>
            <div className={styles.timer}>
                <span className={(styles.time + ' ' + chivoMono.className)}>{getElapsedString(timeSecs)}</span>
                <span className={styles.label}>Time Survived</span>
            </div>
        </div>
        <div className={styles.visual}>
            <canvas className={styles.canvas}>

            </canvas>
        </div>
    </div>
}

