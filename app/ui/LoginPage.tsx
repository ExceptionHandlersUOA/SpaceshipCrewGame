import styles from "./LoginPage.module.css"

export default function LoginPage() {
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
                />
            </div>
            <div className={styles.inputContainer}>
                <h3 className={styles.subtitle}>Name</h3>
                <input className={styles.input} type="text" placeholder="Enter your name" />
            </div>
            <br />
            <div className={styles.buttonContainer}>
                <button className={styles.primaryButton}>Play (Mobile)</button>
                <button className={styles.secondaryButton}>Host (Desktop)</button>
            </div>
            </div>
        </div>
    );
}