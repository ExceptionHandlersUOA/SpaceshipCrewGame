import styles from "./DirectionBar.module.css"

export default function DirectionBar() {
    return (
        <div>
            <ul className={styles.container}>
                <li className={styles.sectionWhite}>
                </li>
                <li className={styles.sectionRed}>
                </li>
                <li className={styles.sectionWhite}>
                </li>
            </ul>
        </div>
    );
}