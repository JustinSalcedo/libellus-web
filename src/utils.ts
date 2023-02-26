import { ITask } from "./types"

const DEF_GAP = { name: "Chill" }

export function getTimeLeft(task: ITask, unit: 's' | 'm') {
    const msCurrentTime = Date.now()
    const msEndTime = task.end.getTime()

    return formatTimeLeft(msEndTime - msCurrentTime, unit)
}

function formatTimeLeft(timeInMs: number, unit: 's' | 'm') {
    let timeInSec = Math.floor(timeInMs / 1000)
    let timeString = `${Math.floor(timeInSec / 3600)}:${Math.floor(timeInSec % 3600 / 60)}`

    if (unit === 's') {
        timeString = `${timeString}:${timeInSec % 60}`
    }

    return timeString
}

// validate schedule (unsorted)
export function validateSchedule(unSchedule: ITask[]): ITask[] {
    // Case 0: there are no tasks
    if (!unSchedule.length) throw new Error('Empty schedule');

    const schedule = unSchedule.sort((a, b) => a.start.getTime() - b.start.getTime())

    let errorMessage = ''

    schedule.every((task, index) => {
        const startTime = task.start.getTime()
        const endTime = task.end.getTime()

        // Case 1: there's an invalid task
        if (!isValidTask(task)) {
            errorMessage = `Task ${task.name} has invalid timestamp`
            return false
        }

        // Case 2: a task ends before it starts
        if (startTime > endTime) {
            errorMessage = `Task ${task.name} ends before it starts`
            return false
        }

        // Case 3: a task overlaps another one
        if (index > 0 && startTime < schedule[index - 1].end.getTime()) {
            errorMessage = `Task '${task.name}' ovelaps '${schedule[index - 1].name}'`
            return false
        }
        
        return true
    })

    if (!errorMessage) return schedule
    throw new Error(errorMessage)
}

export function isValidTask(task: ITask) {
    const notEmptyOrNull = task.name && task.start && task.end
    const isValidTime = !!task.start.getTime() && !!task.end.getTime()
    return task.name.length <= 20 && notEmptyOrNull && isValidTime
}

export function getVirtualSchedule(schedule: ITask[]) {
    const virtualList: ITask[] = []

    // insert initial task gap so a virtual schedule is never empty
    if (schedule.length) {
        const firstTaskDate = schedule[0].start.toLocaleDateString()
        virtualList.push({ ...DEF_GAP, start: new Date(firstTaskDate), end: schedule[0].start })
    } else {
        const { startsAt: todayStart, endsAt: todayEnd } = getTodayRange()
        virtualList.push({ ...DEF_GAP, start: todayStart, end: todayEnd })
    }

    validateSchedule(schedule).forEach((task, index) => {
        virtualList.push(task)
        
        if (index < schedule.length - 1 && task.end.getTime() !== schedule[index + 1].start.getTime()) {
            virtualList.push({ ...DEF_GAP, start: task.end, end: schedule[index + 1].start })
        }
    })
    
    return virtualList
}

// get previous, current, and next task
export function getTaskQueue(schedule: ITask[]) {
    const time  = new Date()
    const currentIndex = getCurrentTaskIndex(schedule, time)

    // assumes the schedule is time sorted
    const sublist = {
        prevTask: schedule[currentIndex - 1],
        currentTask: schedule[currentIndex],
        nextTask: schedule[currentIndex + 1]
    }
    if (currentIndex === -1) {
        // Case 1: [0, 0, 1]
        const nextIndex = schedule.findIndex(task => time < task.start)
        if (nextIndex !== -1) {
            sublist.currentTask = {
                ...DEF_GAP,
                start: schedule[nextIndex - 1] ? schedule[nextIndex - 1].end : new Date(new Date().toLocaleDateString()),
                end: schedule[nextIndex].start
            },
            sublist.nextTask = schedule[nextIndex]
        }

        // Case 2: [1, 0, 1]
        const prevTask = [...schedule].reverse().find(task => time > task.end)
        if (prevTask) {
            sublist.prevTask = prevTask
        }
    }

    return sublist
}

function getCurrentTaskIndex(schedule: ITask[], timestamp: Date) {
    return schedule.findIndex(task => isTaskInTime(task, timestamp))
}

function isTaskInTime(task: ITask, timestamp: Date) {
    return timestamp >= task.start && timestamp < task.end
}

export function getCurrentTask(schedule: ITask[]) {
    return schedule.find(task => new Date() >= task.start && new Date() < task.end)
}

// get formatted time
export function formatTimeToStr(timestamp: Date, locale: Intl.LocalesArgument, is12hr: boolean) {
    return timestamp.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: is12hr })
}

export function isCurrentTask(task: ITask) {
    return new Date() >= task.start && new Date() < task.end
}

export function timelineIncludesToday(timeline: ITask[]) {
    const { startsAt, endsAt } = getTodayRange()
    return timeline.some(task => (task.start >= startsAt && task.start < endsAt)
        || (task.end >= startsAt && task.end < endsAt))
}

function getTodayRange() {
    const today = new Date().toLocaleDateString()
    const startsAt = new Date(today)
    const endsAt = new Date(`${today} 23:59:59`)
    return { startsAt, endsAt }
}