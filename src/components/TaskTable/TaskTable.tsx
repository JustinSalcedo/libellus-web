import { useCallback, useContext, useState } from "react"
import { SettingsContext } from "../../contexts"
import { ITask } from "../../types"
import { formatTimeToStr, isCurrentTask } from "../../utils"
import styles from './TaskTable.module.css'

export default function TaskTable({ schedule, showHistory, noDays }: { schedule: ITask[], showHistory: boolean, noDays?: boolean }) {
    const { getTheme } = useContext(SettingsContext)

    function renderTaskRows(schedule: ITask[], showHistory: boolean) {
        const today = new Date().getDay()
        let currentDay = today
        const rows = []

        const parsedSchedule = showHistory ? schedule : schedule.filter(task => Date.now() < task.end.getTime())
        parsedSchedule.forEach((task, index) => {
            if (!noDays && (currentDay !== task.start.getDay())) {
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
                    <TaskName name={task.name} />
                    <td>{formatTimeToStr(task.start, 'en-US', true)}</td>
                    <td>{formatTimeToStr(task.end, 'en-US', true)}</td>
                </tr>
            )
        })

        return rows
    }

    return (
        <table className={`${styles.table} ${styles['theme-' + getTheme()]}`}>
            <tbody>
                {renderTaskRows(schedule, showHistory)}
            </tbody>
        </table>
    )
}

function TaskName({ name }: { name: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const props: { style?: React.CSSProperties } = {}

    if (isExpanded) props.style = { whiteSpace: "initial" }

    return (
        <td {...props} onClick={() => setIsExpanded(isExpanded => !isExpanded)} >{name}</td>
    )
}