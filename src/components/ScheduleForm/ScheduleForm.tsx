import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react'
import Schedule from '../../api/Schedule'
import Task from '../../api/Task'
import { USER_ID } from '../../constants'
import { ScheduleContext, SettingsContext, ViewContext } from '../../contexts'
import { ITask } from '../../types'
import { errorToStr, validateSchedule } from '../../utils'
import TaskTable from '../TaskTable'
import styles from './ScheduleForm.module.css'

export default function ScheduleForm() {
    const { getTheme, scheduleRange: { startDate, endDate } } = useContext(SettingsContext)
    const initialTask = { name: '', start: startDate, end: new Date(endDate.getTime() + 15 * 60 * 1000) }
    const { setSchedule: setGlobalSchedule, schedule: currSchedule, refreshSchedule } = useContext(ScheduleContext)
    const { setActiveModal, launchModal } = useContext(ViewContext)
    
    const [dateList, setDateList] = useState([getLocalDate(startDate)])
    const [scheduleGroup, setScheduleGroup] = useState({ [getLocalDate(startDate)]: [initialTask] })

    const [note, setNote] = useState('')
    const [preventNote, setPreventNote] = useState(false)
    const [isValidSchedule, setIsValidSchedule] = useState(false)
    const [isSortedSchedule, setIsSortedSchedule] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (!dateList.length && !Object.keys(scheduleGroup).length) {
            setDateList([getLocalDate(startDate)])
            setScheduleGroup({ [getLocalDate(startDate)]: [initialTask] })
        }
    })

    useEffect(() => {
        if (isEdit) {
            const generatedGroup = scheduleToGroup(currSchedule)
            setScheduleGroup(generatedGroup)
            setDateList(Object.keys(generatedGroup))
        } else {
            const rawScheduleGroup = window.localStorage.getItem('scheduleGroup')
            if (rawScheduleGroup) {
                const savedScheduleGroup = generateDates(JSON.parse(rawScheduleGroup))
                setScheduleGroup(savedScheduleGroup)
                setDateList(Object.keys(savedScheduleGroup))
            }
        }
    }, [isEdit])

    function onAddDateClick() {
        setDateList(dateList => {
            const lastDate = new Date(`${dateList[dateList.length - 1]} 00:00`)
            const nextDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000)
            const initialTask = { name: '', start: nextDate, end: new Date(nextDate.getTime() + 15 * 60 * 1000) }
            setScheduleGroup(scheduleGroup => ({ ...scheduleGroup, [getLocalDate(nextDate)]: [initialTask] }))
            return [...dateList, getLocalDate(nextDate)]
        })
    }

    function onDateChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { value } = e.target
        setDateList(dateList => {
            if (dateList.includes(value)) {
                if (!preventNote) {
                    setNote('Date already exists')
                } else {
                    setPreventNote(false)
                }
                return dateList
            }
            setScheduleGroup(scheduleGroup => {
                const taskList = scheduleGroup[dateList[index]]
                delete scheduleGroup[dateList[index]]
                return { ...scheduleGroup, [value]: taskList }
            })
            setNote('')
            return resortDates([...dateList.slice(0, index), value, ...dateList.slice(index + 1)])
        })
    }

    function resortDates(dateList: string[]) {
        setPreventNote(true)
        return dateList.sort((a, b) => (a > b) ? 1 : 0)
    }

    function handleTask(localDate: string, index: number, task: ITask) {
        setScheduleGroup(scheduleGroup => {
            const updatedTaskList = [...scheduleGroup[localDate].slice(0, index), task, ...scheduleGroup[localDate].slice(index + 1)]
            try {
                validateSchedule(updatedTaskList)
                setIsValidSchedule(true)
                setIsSortedSchedule(isSortedTaskList(updatedTaskList))
                setNote('')
            } catch (error) {
                setNote(errorToStr(error))
                setIsValidSchedule(false)
            } finally {
                const updatedScheduleGroup = { ...scheduleGroup, [localDate]: updatedTaskList }
                if (!isEdit) window.localStorage.setItem('scheduleGroup', JSON.stringify(updatedScheduleGroup))
                return updatedScheduleGroup
            }
        })
    }

    function addTask(localDate: string) {
        setScheduleGroup(scheduleGroup => {
            const taskList = scheduleGroup[localDate]
            const start = taskList[taskList.length - 1].end
            return { ...scheduleGroup, [localDate]: [...taskList, {
                name: '', start, end: new Date(start.getTime() + 15 * 60 * 1000)
            }] }
        })
    }

    function deleteTask(localDate: string, index: number) {
        setScheduleGroup(scheduleGroup => {
            const taskList = scheduleGroup[localDate]
            if (taskList.length === 1) {
                setDateList(dateList => dateList.filter(date => date !== localDate))
                delete scheduleGroup[localDate]
                return scheduleGroup
            }
            const updatedScheduleGroup = { ...scheduleGroup, [localDate]: [...taskList.slice(0, index), ...taskList.slice(index + 1)] }
            if (!isEdit) window.localStorage.setItem('scheduleGroup', JSON.stringify(updatedScheduleGroup))
            return updatedScheduleGroup
        })
    }

    async function createSchedule() {
        const schedule = Object.values(scheduleGroup).flatMap(taskList => taskList)

        try {
            const scheduleApi = new Schedule(USER_ID)
            const taskApi = new Task(USER_ID)
            await taskApi.DeleteAll()
            const recordedSchedule = await scheduleApi.Create(schedule)
            setTimeout(() => {
                window.localStorage.setItem('schedule', JSON.stringify(recordedSchedule))
                setGlobalSchedule(recordedSchedule)
                launchModal(false)
                refreshSchedule(true)
            }, 1000)
            setActiveModal('schedule-created')
            if (!isEdit) window.localStorage.removeItem('scheduleGroup')
            setNote('')
        } catch (error) {
            setNote(errorToStr(error))
        }
    }

    function resetForm() {
        setDateList([])
        setScheduleGroup({})
        if (!isEdit) window.localStorage.removeItem('scheduleGroup')
    }

    function renderDayTasks() {
        return dateList.map((localDate, index) => (
            <DayTasks key={index} localDate={localDate} taskList={scheduleGroup[localDate]}
                editDate={e => onDateChange(e, index)} handleTask={(index, task) => handleTask(localDate, index, task)}
                addTask={() => addTask(localDate)} deleteTask={index => deleteTask(localDate, index)} />
        ))
    }

    function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked } = e.target
        setIsEdit(checked)
    }

    return (
        <div className={`${styles.container} ${styles['theme-' + getTheme()]}`}>
            <div className={styles["edit-check"]}>
                <label htmlFor="edit">...or edit existing</label>
                <input type="checkbox" name="edit" checked={isEdit} onChange={onCheckboxChange} />
            </div>
            {note ? <div className={styles["note-area"]}>{note}</div> : ''}
            {renderDayTasks()}
            <div className={styles.buttons}>
                <button onClick={resetForm}>Reset</button>
                <button onClick={onAddDateClick}>Add date</button>
                {isSortedSchedule ? <button disabled={!isValidSchedule} onClick={createSchedule}>Create</button> : <button>Sort</button>}
            </div>
        </div>
    )
}

function DayTasks({ localDate, taskList, editDate, handleTask, addTask, deleteTask }: {
    localDate: string, taskList: ITask[], editDate: ChangeEventHandler<HTMLInputElement>
    handleTask: (index: number, task: ITask) => void, addTask: () => void
    deleteTask: (index: number) => void
}) {
    const [canEdit, setCanEdit] = useState(true)

    function toggleEdit() {
        setCanEdit(canEdit => !canEdit)
    }

    const day = (new Date().getDay() === new Date(localDate).getDay()) ? 'Today' : new Date(`${localDate} 00:00`).toLocaleDateString('en-US', { weekday: 'long' })

    return (
        <div className={styles['day-tasks']}>
            <div className={styles['day-header']}>
                <label htmlFor="date">{day} - </label>
                <input type="date" name="date" onChange={editDate} value={localDate} />
                <button onClick={toggleEdit}>{canEdit ? '✓' : '✎'}</button>
            </div>
            {canEdit ? (<>
                {taskList.map((task, index) => (
                    <TaskInput key={index} task={task} localDate={localDate} handleTask={task => handleTask(index, task)} deleteTask={() => deleteTask(index)} />
                ))}
                <div className={styles['add-task']}>
                    <button className={styles.add} onClick={addTask}>+</button>
                </div>
            </>) : <TaskTable schedule={taskList} showHistory={true} noDays={true} />}
        </div>
    )
}

function TaskInput({ task, localDate, handleTask, deleteTask }: { task: ITask, localDate: string, handleTask: (task: ITask) => void , deleteTask: () => void}) {
    function onNameChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        handleTask({ ...task, name: value })
    }

    function onStartChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        handleTask({ ...task, start: new Date(`${localDate} ${value}`) })
    }

    function onEndChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        handleTask({ ...task, end: new Date(`${localDate} ${value}`) })
    } 
    
    return (
        <div className={styles['task-input']}>
            <div className={styles['name-x']}>
                <input type="text" name="name" placeholder='Name' onChange={onNameChange} value={task.name ? task.name : ''} />
                <button onClick={deleteTask}>x</button>
            </div>
            <div className={styles.times}>
                <input type="time" name="start" onChange={onStartChange} value={getTime(task.start)} />
                <span> to </span>
                <input type="time" name="end" onChange={onEndChange} value={getTime(task.end)} />
            </div>
        </div>
    )
}

function getLocalDate(date: Date) {
	const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
	const dateNum = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
	return `${date.getFullYear()}-${month}-${dateNum}`
}

function getTime(date: Date) {
	const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
	const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
	return `${hour}:${minute}`
}

function isSortedTaskList(taskList: ITask[]) {
    let isSorted = true
    taskList.every((task, index) => {
        if (index && (taskList[index - 1].start > task.start)) {
            isSorted = false
            return false
        }
        return true
    })
    
    return isSorted
}

function isSortedScheduleGroup(scheduleGroup: { [key: string]: ITask[] }) {
    let isSorted = true
    Object.values(scheduleGroup).every(taskList => {
        isSorted = isSortedTaskList(taskList)
        return isSorted
    })

    return isSorted
}

function generateDates(scheduleGroup: { [key: string]: ITask[] }) {
    const parsedScheduleGroup: { [key: string]: ITask[] } = {}
    Object.entries(scheduleGroup).forEach(([localDate, taskList]) => {
        parsedScheduleGroup[localDate] = taskList.map(task => ({ ...task, start: new Date(task.start), end: new Date(task.end) }))
    })
    return parsedScheduleGroup
}

function scheduleToGroup(schedule: ITask[]) {
    const scheduleGroup: { [key: string]: ITask[] } = {}
    validateSchedule(schedule).forEach(task => {
        const startDate = getLocalDate(task.start)
        const endDate = getLocalDate(task.end)
        
        if (startDate !== endDate) {
            const firstTask: ITask = { ...task, start: task.start, end: new Date(`${startDate} 23:59`) }
            const secondTask: ITask = { ...task, start: new Date(`${endDate} 00:00`), end: task.end }

            scheduleGroup[startDate] = scheduleGroup[startDate] ? [...scheduleGroup[startDate], firstTask] : [firstTask]
            scheduleGroup[endDate] = scheduleGroup[startDate] ? [...scheduleGroup[startDate], secondTask] : [secondTask]
        } else {
            scheduleGroup[startDate] = scheduleGroup[startDate] ? [...scheduleGroup[startDate], task] : [task]
        }
    })

    return scheduleGroup
}