import styles from '../styles/Home.module.css';

export function Card(props) {
    return (
        <div className={styles.card}>
            {
                props.child ?
                    <div className={styles.titleBarChild}>
                        <h2>{props.title}</h2>
                        {props.button && props.button}
                    </div>
                    :
                    <div className={styles.titleBar}>
                        <h1>{props.title}</h1>
                        {props.closePopup && <button onClick={props.closePopup}>&#128938;</button>}
                    </div>
            }
            {props.children}
        </div>
    );
}