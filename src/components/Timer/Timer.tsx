import React, { useEffect, useState } from "react"
import { ITask } from "../../types"
import { getTimeLeft } from "../../utils"
import styles from './Timer.module.css'

export default function Timer({ task }: { task: ITask }) {
    const [timer, setTimer] = useState(null)
    const [timeLeft, setTimeLeft] = useState('0:00')

    const tick = () => {
        const timeLeft = getTimeLeft(task, 's', true)
        setTimeLeft(timeLeft)
        document.title = `${timeLeft} - ${task.name} | Libellus`
    }

    useEffect(() => {
        setTimer(setInterval(tick, 1000))

        return clearInterval(timer)
    }, [task])

    return (
        <div className={styles.timer}>
            <div className="clock">{timeLeft}</div>
        </div>
    )
}