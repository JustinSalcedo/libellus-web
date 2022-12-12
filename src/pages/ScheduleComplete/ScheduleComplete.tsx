import React from "react"
import Minimal from "../../layouts/Minimal"
import styles from './ScheduleComplete.module.css'

export default function ScheduleComplete() {
    return (
        <Minimal>
            <div className={styles.container}>
                <div className={styles.message}>
                    <h3>Schedule finished<span>✔️</span></h3>
                </div>
                <div className={styles.note}>No more schedules</div>
                <div className={styles.schedule}>Default tasklist</div>
            </div>
        </Minimal>
    )
}