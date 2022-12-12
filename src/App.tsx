import './styles/global.css'
import React, { useState } from "react"
import MainScreen from "./pages/MainScreen"
import { ScheduleContext } from './contexts'
import { validateSchedule } from './utils'
import MY_SCHEDULE from './constants/schedule'
import ScheduleComplete from './pages/ScheduleComplete'

const App = () => {
    const [schedule, setSchedule] = useState(validateSchedule(MY_SCHEDULE))

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule }}>
            {schedule.length ? <MainScreen/> : <ScheduleComplete/>}
            
        </ScheduleContext.Provider>
    )
}

export default App