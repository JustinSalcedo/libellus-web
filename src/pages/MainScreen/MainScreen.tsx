import React, { useContext, useEffect, useState } from "react"
import TaskQueue from "../../components/TaskQueue/TaskQueue"
import Timer from "../../components/Timer"
import Minimal from "../../layouts/Minimal"
import { ITask } from "../../types"
import { getCurrentTask, getTaskQueue, getVirtualSchedule, validateSchedule } from "../../utils"
import styles from "./MainScreen.module.css"
import { ScheduleContext } from "../../contexts"

export default function MainScreen() {
    const { schedule, refreshSchedule } = useContext(ScheduleContext)

    const [switcher, setSwitcher] = useState(null)
    const [prevTask, setPrevTask] = useState(null as ITask)
    const [currentTask, setCurrentTask] = useState(null as ITask)
    const [nextTask, setNextTask] = useState(null as ITask)
    const [wasNotified, setWasNotified] = useState(false)

    useEffect(() => {
        switchTask(getVirtualSchedule(schedule))

        return clearInterval(switcher)
    }, [schedule])

    useEffect(() => {
        if (!wasNotified && currentTask) {
            notify(currentTask)
            setWasNotified(true)
        }
    }, [currentTask])

    function switchTask(virtualSchedule: ITask[]) {
        if (switcher) clearInterval(switcher)

        const currentTask = getCurrentTask(virtualSchedule)
        if (!currentTask) return refreshSchedule()

        setSwitcher(setInterval(() => switchTask(virtualSchedule),  currentTask.end.getTime() - Date.now()))
        const { prevTask: prev, currentTask: curr, nextTask: next } = getTaskQueue(virtualSchedule)
        setCurrentTask(curr)
        setPrevTask(prev)
        setNextTask(next)
    }

    function nullifyGaps(task: ITask) {
        if (!task || task.name === "Chill") return null

        return task
    }

    function notify(task: ITask) {
        const message = `${task.name} has started`
        if (!("Notification" in window)) {
            return alert(message)
        }

        const title = task.name

        if (Notification.permission === "granted") {
            showNotification(title, message)
        }

        if (Notification.permission === "default") {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === "granted") {
                        showNotification(title, message)
                    }
                })
        }
    }

    function showNotification(title: string, body: string) {
        if (document.visibilityState === "visible") {
            return alert(body)
        }

        const notification = new Notification(title, { body })
        notification.onclick = () => { notification.close(), window.parent.focus() }
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