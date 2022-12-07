import React, { useEffect, useState } from "react"
import TaskQueue from "../../components/TaskQueue/TaskQueue"
import Timer from "../../components/Timer"
import Minimal from "../../layouts/Minimal"
import { ITask } from "../../types"
import { getCurrentTask, getNextTask, getPreviousTask, getVirtualSchedule, validateSchedule } from "../../utils"
import styles from "./MainScreen.module.css"
import MY_SCHEDULE from "../../constants/schedule"

export default function MainScreen() {
    const [schedule, setSchedule] = useState(validateSchedule(MY_SCHEDULE))
    const [virtualSchedule, setVirtualSchedule] = useState(getVirtualSchedule(MY_SCHEDULE))
    const [switcher, setSwitcher] = useState(null)
    const [prevTask, setPrevTask] = useState(null as ITask)
    const [currentTask, setCurrentTask] = useState(null as ITask)
    const [nextTask, setNextTask] = useState(null as ITask)

    useEffect(() => {
        switchTask()

        return clearInterval(switcher)
    }, [schedule])

    function switchTask() {
        if (switcher) clearInterval(switcher)
        const theTask = getCurrentTask(virtualSchedule)
        setSwitcher(setInterval(switchTask, theTask.end.getTime() - Date.now()))
        setCurrentTask(theTask)
        setPrevTask(getPreviousTask(virtualSchedule))
        setNextTask(getNextTask(virtualSchedule))
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
                    ): ( <span className={styles['last-task']}></span> )}
                </div>
                <div className={styles.bottom}>
                    <TaskQueue prev={prevTask} current={currentTask} next={nextTask} />
                </div>
            </div>
        </Minimal>
    )
}