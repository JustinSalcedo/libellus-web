import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import Schedule from "../../api/Schedule";
import Task from "../../api/Task";
import { USER_ID } from "../../constants";
import { ScheduleContext, SettingsContext, ViewContext } from "../../contexts";
import { ITask, ScheduleRangeSettings } from "../../types";
import { errorToStr, getTodayRange, validateSchedule } from "../../utils";
import TaskTable from "../TaskTable"
import styles from './TaskListPrompt.module.css'

export default function TaskListPrompt() {
    const { scheduleRange } = useContext(SettingsContext)
    const { setSchedule: setGlobalSchedule, schedule: currSchedule } = useContext(ScheduleContext)
    const { setActiveModal } = useContext(ViewContext)

    const [schedule, setSchedule] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [wasPreviewed, setWasPreviewed] = useState(false)
    const [note, setNote] = useState('')

    useEffect(() => {
        if (isEdit) {
            const generatedPrompt = scheduleToPrompt(currSchedule)
            setPrompt(generatedPrompt)
        } else {
            const savedPrompt = localStorage.getItem('prompt')
            if (savedPrompt) setPrompt(savedPrompt)
        }
    }, [isEdit])

    function previewSchedule() {
        if (!prompt) return false

        try {
            setSchedule(validateSchedule(generateFromScratch(parsePrompt(prompt), scheduleRange, setNote)))
            setWasPreviewed(true)
        } catch (error) {
            setNote(errorToStr(error))
        }
    }

    function parsePrompt(text: string) {
        return text.trim().split(',').map(arg => arg.trim())
    }

    async function createSchedule() {
        if (!schedule || !schedule.length) return

        try {
            const scheduleApi = new Schedule(USER_ID)
            const taskApi = new Task(USER_ID)
            await taskApi.DeleteAll()
            const recordedSchedule = await scheduleApi.Create(schedule)
            setTimeout(() => {
                window.localStorage.setItem('schedule', JSON.stringify(recordedSchedule))
                setGlobalSchedule(recordedSchedule)
            }, 1000)
            setActiveModal('schedule-created')
            if (!isEdit) window.localStorage.removeItem('prompt')
        } catch (error) {
            setNote(errorToStr(error))
        }
    }

    function resetPrompt() {
        setSchedule(null)
        setPrompt('')
        if (!isEdit) window.localStorage.removeItem('prompt')
    }

    function onPromptChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = e.target
        setPrompt(value)
        setWasPreviewed(false) // prompt was altered
        if (!isEdit) window.localStorage.setItem('prompt', value)
    }

    function onPromptEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
            previewSchedule()
        }
    }

    function onCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked } = e.target
        setIsEdit(checked)
    }

    return (
        <>
            <div className={styles["edit-check"]}>
                <label htmlFor="edit">...or edit existing</label>
                <input type="checkbox" name="edit" checked={isEdit} onChange={onCheckboxChange} />
            </div>
            <label htmlFor="tasklist">Task list:</label>
            <textarea className={styles.prompt} name="tasklist" cols={30} rows={3}
                value={prompt} onChange={onPromptChange} onKeyDown={onPromptEnter}></textarea>
            {note ? <div className={styles["note-area"]}>{note}</div> : ''}
            <div className={styles.buttons}>
                <button onClick={resetPrompt}>Reset</button>
                <button disabled={!prompt} onClick={previewSchedule}>Preview</button>
                <button disabled={!wasPreviewed} onClick={createSchedule}>Create</button>
            </div>
            { schedule ? 
            <div className={styles["task-preview"]}>
                <div className={styles["fixed-header"]}>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>start</th>
                                <th>end</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <TaskTable schedule={schedule} showHistory={true} />
            </div> : '' }
        </>
    )
}

function generateFromScratch(taskList: string[], scheduleRange: ScheduleRangeSettings, errorHandler?: (errorMsg: string) => void) {
    const schedule = []

    let { dateRange, startDate, endDate } = scheduleRange
    if (dateRange === "today") {
        const { startsAt, endsAt } = getTodayRange()
        startDate = startsAt; endDate = endsAt
    }
    let lastTimestamp = startDate
    const timestampLimit = endDate

    for (let index = 0; index < taskList.length; index++) {
        const taskName = taskList[index];
        const timespanInMin = parseInt(taskList[index + 1])

        if (index % 2 || !timespanInMin) continue;

        if (!(typeof taskName === 'string')) throw new Error(`Task '${taskName}' has invalid name or type`)
        if (!(typeof timespanInMin === 'number')) throw new Error(`Task '${taskName}' misses a timespan`)

        if (!taskName) {
            lastTimestamp = new Date(lastTimestamp.getTime() + timespanInMin * 60 * 1000)
            continue;
        }

        const task = generateTask(taskName, timespanInMin, lastTimestamp)

        if (task.end > timestampLimit) {
            if (errorHandler) errorHandler(`Task '${task.name}' ${(taskList.length - 2 === index)
                ? 'exceeds the timespan and was skipped'
                : `and other ${Math.floor((taskList.length - index - 1) / 2)} exceed the timespan and were skipped`
            }`)
            break;
        }

        schedule.push(task)
        lastTimestamp = task.end
    }

    return validateSchedule(schedule)
}

function generateTask(name: string, timespanInMin: number, lastTimestamp: Date) {
    return {
        name,
        start: lastTimestamp,
        end: new Date(lastTimestamp.getTime() + timespanInMin * 60 * 1000)
    } as ITask
}

function scheduleToPrompt(schedule: ITask[]) {
    return schedule
        .map(({name, start, end}, index) => {
            let prefix = ''
            if (index && (start.getTime() !== schedule[index - 1].end.getTime()))
                prefix = `, ${Math.floor((start.getTime() - schedule[index - 1].end.getTime()) / 1000 / 60)}, `
            return prefix + `${name}, ${Math.floor((end.getTime() - start.getTime()) / 1000 / 60)}`
        })
        .join(', ')
}