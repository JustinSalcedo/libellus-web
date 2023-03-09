import React, { useContext } from "react"
import { SettingsContext, ViewContext } from "../../contexts"
import { ITask } from "../../types"
import styles from './TaskQueue.module.css'

export default function TaskQueue({ prev, next, current }: {
    prev?: ITask, current?: ITask, next?: ITask
}) {
    const { getTheme } = useContext(SettingsContext)
    const { setActiveModal, launchModal } = useContext(ViewContext)

    function handleOnClick() {
        setActiveModal('task-history')
        launchModal(true)
    }

    return (
        <div className={`${styles['task-queue']} ${styles['theme-' + getTheme()]}`} onClick={handleOnClick}>
            <ul>
                <li>{prev ? prev.name : "..."}</li>
                <li className={styles.current}>{current ? current.name : "..."}</li>
                <li>{next ? next.name : "..."}</li>
            </ul>
        </div>
    )
}