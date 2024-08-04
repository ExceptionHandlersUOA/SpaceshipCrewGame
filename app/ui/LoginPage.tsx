import { useRef } from "react";
import styles from "./LoginPage.module.css"

export default function LoginPage({ onLoginPressed }: { onLoginPressed: (roomCode: string, username: string) => void }) {
    let codeInput = useRef<HTMLInputElement>(null);
    let nameInput = useRef<HTMLInputElement>(null);

    function onPlay() {
        let roomCode = codeInput.current?.value ?? "";
        let username = nameInput.current?.value ?? "";

        roomCode = roomCode.trim().toUpperCase();
        username = username.trim();

        if (roomCode.length != 4) {
            alert("Invalid room code");
            return;
        }

        if (username.length == 0) {
            alert("Invalid username");
            return;
        }

        if (onLoginPressed != null) {
            onLoginPressed(roomCode, username);
        }
    }

    function goToHost() {
        window.location.href = "/tv";
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <div className={styles.titleContainer}>
                <span className={styles.emoji}>🚀</span>
                <p className={styles.titleText}>
                Join the<br />
                <i>Space Crew!~</i>
                </p>
                <span className={styles.emoji}>🚀</span>
            </div>
            <br />
            <div className={styles.inputContainer}>
                <h3 className={styles.subtitle}>Invite Code</h3>
                <input
                className={styles.input}
                type="text"
                placeholder="Enter 4-Letter Room Code"
                minLength={4}
                maxLength={4}
                ref={codeInput}
                />
            </div>
            <div className={styles.inputContainer}>
                <h3 className={styles.subtitle}>Name</h3>
                <input className={styles.input} type="text" placeholder="Enter your name" ref={nameInput} />
            </div>
            <br />
            <div className={styles.buttonContainer}>
                <button className={styles.primaryButton} onClick={onPlay}>Play 📱</button>
                <button className={styles.secondaryButton} onClick={goToHost}>Host 🖥️</button>
            </div>
            </div>
        </div>
    );
}
