import styles from "./TextField.module.css"

export default function TextField({text} : {text: string}) {
    return (
        <div className={styles.container}>
            <p className={styles.p}>{text}</p>
        </div>
    );
}