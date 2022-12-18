import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, MouseEvent, MouseEventHandler, useState } from "react"
import { ITask } from "../../types"
import { isValidTask, validateSchedule } from "../../utils"
import styles from "./ScheduleForm.module.css"

const todayDate = new Date().toLocaleDateString()
const INVALID_TASK_MSG = 'Your task is missing something...'

export default function ScheduleForm() {
    const [tasks, setTasks] = useState([] as ITask[])
    const [errorMsg, setErrorMsg] = useState('')

    function addNewTask(task: ITask) {
        setTasks(tasks => [...tasks, task])
    }

    function updateTask(index: number, task: Partial<ITask>) {
        setTasks(tasks => {
            const updatedTasks = [...tasks]
            updatedTasks[index] = { ...updatedTasks[index], ...task }
            setErrorMsg(isValidTask(updatedTasks[index]) ? '' : INVALID_TASK_MSG)
            return updatedTasks
        })
    }

    function deleteTask(index: number) {
        setTasks(tasks => [...tasks.slice(0, index), ...tasks.slice(index + 1)])
    }

    function addSchedule(e: MouseEvent) {
        e.preventDefault()
        try {
            const schedule = validateSchedule(tasks)
            console.log(schedule)
        } catch (error) {
            setErrorMsg(error.toString())
        }
    }

    function clearForm(e: MouseEvent) {
        e.preventDefault()
        setTasks([])
    }

    return (
        <>
            {errorMsg ? ( <p>{errorMsg}</p> ) : ''}
            <form>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <h3>Tasks</h3><p>Start</p><p>End</p>
                    </div>
                    {tasks.map((task, index) => (
                        <EditTask key={index} task={task}
                            updateTask={task => updateTask(index, task)} deleteTask={() => deleteTask(index)} />
                    ))}
                    <NewTask addNewTask={addNewTask} handleError={setErrorMsg} />
                </div>
                <div className={styles.buttons}>
                    <button onClick={clearForm}>Reset</button>
                    <button onClick={addSchedule}>Add</button>
                </div>
            </form>
        </>
    )
}

function NewTask({ addNewTask, handleError }: {
    addNewTask: (task: ITask) => void, handleError: (errorMsg: string) => void
}) {
    const [task, setTask] = useState(getTaskDraft())

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        const parsedValue = (name === "name")
            ? value
            : new Date(`${todayDate} ${value}`)

        setTask(task => ({ ...task, [name]: parsedValue }))
    }

    function handleButton() {
        validateAndAddTask()
    }

    function handleEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
            validateAndAddTask()
        }
    }

    function validateAndAddTask() {
        if (!isValidTask(task)) return handleError(INVALID_TASK_MSG)

        addNewTask(task)
        setTask(({ end }) => getTaskDraft(end))
        handleError('')
    }

    const props = { task, handleChange, handleButton, isNew: true, handleEnter }
    return ( <InputGroup {...props} /> )
}

function EditTask({ task, updateTask, deleteTask }: {
    task: ITask, updateTask: (task: Partial<ITask>) => void, deleteTask: () => void
}) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        const parsedValue = (name === "name")
            ? value
            : new Date(`${todayDate} ${value}`)

        updateTask({ [name]: parsedValue })
    }

    function handleButton() {
        deleteTask()
    }

    const props = { task, handleChange, handleButton }
    return ( <InputGroup {...props} /> )
}

function InputGroup({ task, handleChange, isNew, handleButton, handleEnter }: {
    task: ITask, handleChange: ChangeEventHandler, isNew?: boolean, handleButton: MouseEventHandler
    handleEnter?: KeyboardEventHandler
}) {
    const { name, start, end } = task
    const parseTime = (date: Date) => date.toTimeString().substring(0, 5)    // 12:34

    const inputTextProps = handleEnter ? { onKeyDown: handleEnter } : {}
    return (
        <div>
            <input type="text" name="name" onChange={handleChange} {...inputTextProps} value={name} />
            <input type="time" name="start" onChange={handleChange} value={parseTime(start)} />
            <input type="time" name="end" onChange={handleChange} value={parseTime(end)} />
            <span onClick={handleButton}>{isNew ? '+' : 'x'}</span>
        </div>
    )
}

function getTaskDraft(date?: Date): ITask {
    const start = date || new Date()
    const end = new Date(start.getTime() + 60 * 60 * 1000)
    return { name: '', start, end }
}