import React, { useContext, useEffect, useState } from "react"
import TaskQueue from "../../components/TaskQueue/TaskQueue"
import Timer from "../../components/Timer"
import Minimal from "../../layouts/Minimal"
import { ITask } from "../../types"
import { getCurrentTask, getNextTask, getPreviousTask, getVirtualSchedule, validateSchedule } from "../../utils"
import styles from "./MainScreen.module.css"
import { ScheduleContext } from "../../contexts"

export default function MainScreen() {
    const { schedule } = useContext(ScheduleContext)

    const [switcher, setSwitcher] = useState(null)
    const [prevTask, setPrevTask] = useState(null as ITask)
    const [currentTask, setCurrentTask] = useState(null as ITask)
    const [nextTask, setNextTask] = useState(null as ITask)

    useEffect(() => {
        switchTask(getVirtualSchedule(schedule))

        return clearInterval(switcher)
    }, [schedule])

    function switchTask(virtualSchedule: ITask[]) {
        if (switcher) clearInterval(switcher)

        const currentTask = getCurrentTask(virtualSchedule)
        if (!currentTask) return false

        setSwitcher(setInterval(() => switchTask(virtualSchedule),  currentTask.end.getTime() - Date.now()))
        setCurrentTask(currentTask)
        setPrevTask(getPreviousTask(virtualSchedule))
        setNextTask(getNextTask(virtualSchedule))
    }

    function nullifyGaps(task: ITask) {
        if (!task || task.name === "Chill") return null

        return task
    }

    return (
        <Minimal>
            <div className={styles.container}>
                <div className={styles.top}>
                    {currentTask ? (
                        <>
                            <Timer task={currentTask}/>
                            <div className="task-name">{currentTask.name}</div>
                        </>
                    ) : false}
                </div>
                <div className={styles.middle + ' ' + styles['next-task']}>
                    {nextTask ? (
                        <>
                            <span className={styles.label}>Next: </span>
                            <span className="text">{nextTask.name}</span>
                        </>
                    ): ( <span className={styles['last-task']}>Last task</span> )}
                </div>
                <div className={styles.bottom}>
                    <TaskQueue prev={nullifyGaps(prevTask)} current={nullifyGaps(currentTask)} next={nullifyGaps(nextTask)} />
                </div>
            </div>
        </Minimal>
    )
}