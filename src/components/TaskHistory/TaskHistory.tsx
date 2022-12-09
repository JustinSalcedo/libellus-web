import React, { ChangeEvent, useContext, useState } from "react"
import { ScheduleContext } from "../../contexts"
import { ITask } from "../../types"
import { formatTimeToStr, isCurrentTask } from "../../utils"
import styles from "./TaskHistory.module.css"

export default function TaskHistory() {
    const { schedule } = useContext(ScheduleContext)

    const [showHistory, setShowHistory] = useState(false)

    function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
        const { target } = e
        setShowHistory(target.checked)
    }

    function renderTaskRows(schedule: ITask[], showHistory: boolean) {
        const today = new Date().getDay()
        let currentDay = today
        const rows = []

        const parsedSchedule = showHistory ? schedule : schedule.filter(task => Date.now() < task.end.getTime())
        parsedSchedule.forEach((task, index) => {
            if (currentDay !== task.start.getDay()) {
                rows.push(
                    <tr key={'date_' + currentDay} className={styles["day-subhead"]}>
                        <td colSpan={3}>{today !== task.start.getDay()
                            ? task.start.toLocaleDateString('en-US', { weekday: 'long' })
                            : 'Today'
                        }</td>
                    </tr>
                )

                currentDay = task.start.getDay()
            }

            rows.push(
                <tr key={'task_' + index} className={isCurrentTask(task) ? styles['current-task'] : ''} >
                    <td>{task.name}</td>
                    <td>{formatTimeToStr(task.start, 'en-US', true)}</td>
                    <td>{formatTimeToStr(task.end, 'en-US', true)}</td>
                </tr>
            )
        })

        return rows
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
            <table>
                <tbody>
                    {renderTaskRows(schedule, showHistory)}
                </tbody>
            </table>
        </div>
    )
}