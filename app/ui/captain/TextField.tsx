import styles from "./TextField.module.css"

export default function TextField({text} : {text: string}) {
    return (
        <div className={styles.textField}>
            {text}
        </div>
    );
}