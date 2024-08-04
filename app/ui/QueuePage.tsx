import styles from './QueuePage.module.css';

export default function QueuePage({ canStart, onStart }: { canStart: boolean, onStart: () => void }) {

    const handleStart = () => {
        console.log("Start Game")
        if (onStart != null) {
            onStart();
        }
    }

    return (
        <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.titleContainer}>
            <span className={styles.emoji}>🚀</span>
            <p className={styles.titleText}>
              Welcome to the<br />
              <i>Ship Lobby!</i>
            </p>
            <span className={styles.emoji}>🚀</span>
          </div>
          <br />
          <button className={styles.start} onClick={handleStart} disabled={!canStart}>
          ➡️ Start ⬅️
          </button>
        </div>
      </div>  
    );
}
