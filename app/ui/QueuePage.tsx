import styles from './QueuePage.module.css';

export default function QueuePage() {

    const handleStart = () => {
        console.log("Start Game")
    }

    return (
        <div className={styles.container}>
            <button className={styles.start} onClick={handleStart}>START</button>
        </div>
    );
}