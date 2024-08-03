'use client'
import styles from "./TextField.module.css"

export default function TextField({text} : {text: string}) {
    return (
        <div className={styles.bg}>
            {text}
        </div>
    );
}