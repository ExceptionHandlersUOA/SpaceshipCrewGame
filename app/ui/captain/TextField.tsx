'use client'
import styles from "./TextField.module.css"

import { Michroma, Chivo_Mono } from "next/font/google";
const michroma = Michroma({ weight: '400', subsets: ["latin"] });
const chivo_mono = Chivo_Mono({ weight: '400', subsets: ["latin"] });

export default function TextField({text} : {text: string}) {
    return (
        <div className={styles.bg + ' ' + michroma.className}>
            {text}
        </div>
    );
}