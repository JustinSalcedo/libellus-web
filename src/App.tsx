import './styles/global.css'
import React, { useEffect, useState } from "react"
import Schedule from "./api/Schedule"
import MainScreen from "./pages/MainScreen"
import { ScheduleContext, SettingsContext } from './contexts'
import { validateSchedule, getTaskQueue, getTodayRange } from './utils'
import ScheduleComplete from './pages/ScheduleComplete'
import { USER_ID } from './constants'
import { ITask, ScheduleRangeSettings, Settings, Theme } from './types'
import Timeline from './api/Timeline'
import LoadScreen from './pages/LoadScreen'
const { startsAt, endsAt } = getTodayRange()

const App = () => {
    const [schedule, setSchedule] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)

    const [dateRange, setDateRange] = useState('custom' as 'today' | 'custom')
	const [startDate, setStartDate] = useState(startsAt)
	const [endDate, setEndDate] = useState(endsAt)

    const [theme, setTheme] = useState('system' as Theme)

    const [hasLoadedSettings, setHasLoadedSettings] = useState(false)

    useEffect(() => {
        if (!hasLoadedSettings) {
            const { schedule: { dateRange, startDate, endDate }, theme } = recoverSettings()
            setDateRange(dateRange); setStartDate(startDate); setEndDate(endDate); setTheme(theme)
            setHasLoadedSettings(true)
        }
    })

    useEffect(() => {
        if (!hasLoaded) {
            try {
                const localSchedule = window.localStorage.getItem('schedule')
                if (localSchedule) {
                    setSchedule(validateSchedule(formatSchedule(JSON.parse(localSchedule))))
                    setHasLoaded(true)
                } else {
                    if (dateRange === "custom") {
                        const timelineApi = new Timeline(USER_ID)
                        timelineApi.GetByDateRange(startDate, endDate)
                            .then(data => {
                                setSchedule(validateSchedule(data))
                                window.localStorage.setItem('schedule', JSON.stringify(data))
                            })
                            .catch(e => console.error(e))
                            .finally(() => setHasLoaded(true))
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
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [hasLoaded])

    function refreshSchedule(loadOnly?: boolean) {
        if (!loadOnly) window.localStorage.removeItem('schedule')
        setHasLoaded(false)
    }

    function storeSettings({ schedule, theme }: Partial<Settings>) {
        const rawSettings = window.localStorage.getItem('settings')
        const settings: Partial<Settings> = rawSettings ? { ...JSON.parse(rawSettings) } : {}
        if (schedule) {
            settings.schedule = schedule
            setScheduleSettings(schedule)
        }
        if (theme) {
            settings.theme = theme
            setTheme(theme)
        }
        window.localStorage.setItem('settings', JSON.stringify(settings))
    }

    function recoverSettings(): Settings {
        const rawSettings = window.localStorage.getItem('settings')
        if (rawSettings) {
            const { schedule, theme } = JSON.parse(rawSettings) as Settings
            return { schedule: formatDateRange(schedule), theme: theme || 'system'  }
        }
        return { schedule: { dateRange: 'today', startDate: startsAt, endDate: endDate }, theme: 'system' }
    }

    function setScheduleSettings({ dateRange, startDate, endDate }: ScheduleRangeSettings) {
        setDateRange(dateRange)
        if (endDate > startDate) {
            setStartDate(startDate); setEndDate(endDate)
        }
    }

    function getTheme(): Theme {
        if (theme === 'system') {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) return 'dark'
            return 'light'
        }

        return theme
    }

    const isActiveSchedule = () => {
        const { currentTask, nextTask } = getTaskQueue(validateSchedule(schedule), true)
        return schedule.length && (currentTask || nextTask)
    }

    return (
        <SettingsContext.Provider value={{ scheduleRange: { dateRange, startDate, endDate }, setSettings: storeSettings, theme, getTheme, setTheme }}>
            <ScheduleContext.Provider value={{ schedule, setSchedule, refreshSchedule }}>
                {!hasLoaded ? <LoadScreen/> : (isActiveSchedule() ? <MainScreen/> : <ScheduleComplete/>)} 
            </ScheduleContext.Provider>
        </SettingsContext.Provider>
    )
}

function formatSchedule(localSchedule: ITask[]) {
    return localSchedule.map(task => ({ ...task, start: new Date(task.start), end: new Date(task.end) }))
}

function formatDateRange(scheduleSettings: ScheduleRangeSettings): ScheduleRangeSettings {
    return { ...scheduleSettings, startDate: new Date(scheduleSettings.startDate), endDate: new Date(scheduleSettings.endDate) }
}

export default App