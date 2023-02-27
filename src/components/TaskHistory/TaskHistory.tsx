import React, { ChangeEvent, useContext, useState } from "react"
import { ScheduleContext } from "../../contexts"
import TaskTable from "../TaskTable"
import styles from "./TaskHistory.module.css"

export default function TaskHistory() {
    const { schedule } = useContext(ScheduleContext)

    const [showHistory, setShowHistory] = useState(false)

    function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
        const { target } = e
        setShowHistory(target.checked)
    }

    return (
        <div className={styles["task-history"]}>
            <div className={styles["fixed-header"]}>
                <form>
                    <label htmlFor="showHistory">Show past tasks:</label>
                    <input type="checkbox" name="showHistory" checked={showHistory} onChange={handleCheckbox}></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>start</th>
                            <th>end</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <TaskTable schedule={schedule} showHistory={showHistory} />
        </div>
    )
}