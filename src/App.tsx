import './styles/global.css'
import React, { useEffect, useState } from "react"
import Schedule from "./api/Schedule"
import MainScreen from "./pages/MainScreen"
import { ScheduleContext } from './contexts'
import { timelineIncludesToday, validateSchedule, getTaskQueue } from './utils'
import ScheduleComplete from './pages/ScheduleComplete'
import { USER_ID } from './constants'
import { ITask } from './types'

const App = () => {
    const [schedule, setSchedule] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
        if (!hasLoaded) {
            try {
                const localSchedule = window.localStorage.getItem('schedule')
                if (localSchedule) {
                    setSchedule(validateSchedule(formatSchedule(JSON.parse(localSchedule))))
                    setHasLoaded(true)
                } else {
                    const scheduleApi = new Schedule(USER_ID)
                    scheduleApi.Get()
                        .then(data => {
                            setSchedule(validateSchedule(data))
                            window.localStorage.setItem('schedule', JSON.stringify(data))
                        })
                        .catch(e => console.error(e))
                        .finally(() => setHasLoaded(true))
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [hasLoaded])

    function refreshSchedule() {
        window.localStorage.removeItem('schedule')
        setHasLoaded(false)
    }

    const isActiveSchedule = () => {
        const { currentTask, nextTask } = getTaskQueue(validateSchedule(schedule), true)
        return schedule.length && (currentTask || nextTask)
    }

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule, refreshSchedule }}>
            {!hasLoaded ? "Loading..." : (isActiveSchedule() ? <MainScreen/> : <ScheduleComplete/>)} 
        </ScheduleContext.Provider>
    )
}

function formatSchedule(localSchedule: ITask[]) {
    return localSchedule.map(task => ({ ...task, start: new Date(task.start), end: new Date(task.end) }))
}

export default App