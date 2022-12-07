import React from "react"
import { ITask } from "../../types"
import styles from './TaskQueue.module.css'

export default function TaskQueue({ prev, next, current }: {
    prev?: ITask, current?: ITask, next?: ITask
}) {
    return (
        <div className={styles['task-queue']}>
            <ul>
                <li>{prev ? prev.name : "..."}</li>
                <li className={styles.current}>{current ? current.name : "------"}</li>
                <li>{next ? next.name : "..."}</li>
            </ul>
        </div>
    )
}