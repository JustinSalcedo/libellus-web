import React, { useContext } from "react"
import { ScheduleContext, SettingsContext } from "../../contexts"
import Minimal from "../../layouts/Minimal"
import styles from './ScheduleComplete.module.css'

export default function ScheduleComplete() {
    const { getTheme } = useContext(SettingsContext)
    const { refreshSchedule } = useContext(ScheduleContext)

    return (
        <Minimal>
            <div className={`${styles.container} ${styles['theme-' + getTheme()]}`}>
                <div className={styles.message}>
                    <h3>Schedule finished<span>✔️</span></h3>
                </div>
                <div className={styles.note}>No more schedules</div>
                <div className={styles.schedule}>Default tasklist</div>
                <div className={styles.action}><button onClick={refreshSchedule}>Refresh</button></div>
            </div>
        </Minimal>
    )
}