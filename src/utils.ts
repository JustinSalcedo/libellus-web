import { ITask } from "./types"

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
    const schedule = unSchedule.sort((a, b) => a.start.getTime() - b.start.getTime())

    let errorMessage = ''
    schedule.every((task, index) => {
        const startTime = task.start.getTime()
        const endTime = task.end.getTime()

        // Case 1: there's an invalid task
        if (!isValidTask(task)) {
            errorMessage = `Task ${task.name} has invalid timestamp`
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
    const notEmpty = !!schedule.length
    if (schedule.length) {
        const firstTaskDate = schedule[0].start.toLocaleDateString()
        virtualList.push({ name: 'Chill', start: new Date(firstTaskDate), end: schedule[0].start })
    } else {
        const { startsAt: todayStart, endsAt: todayEnd } = getTodayRange()
        virtualList.push({ name: 'Chill', start: todayStart, end: todayEnd })
    }

    validateSchedule(schedule).forEach((task, index) => {
        virtualList.push(task)
        
        if (index < schedule.length - 1 && task.end.getTime() !== schedule[index + 1].start.getTime()) {
            virtualList.push({ name: 'Chill', start: task.end, end: schedule[index + 1].start })
        }
    })
    
    return virtualList
}

export function getCurrentTask(schedule: ITask[]) {
    return schedule.find(task => new Date() >= task.start && new Date() < task.end)
}

export function getPreviousTask(schedule: ITask[]) {
    const prevIndex = schedule.findIndex(task => new Date() >= task.start && new Date() < task.end) - 1
    if (prevIndex < 0) return null
    return schedule[prevIndex]
}

export function getNextTask(schedule: ITask[]) {
    const nextIndex = schedule.findIndex(task => new Date() >= task.start && new Date() < task.end) + 1
    if (nextIndex === 0) return null
    return schedule[nextIndex]
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
    return timeline.some(task => task.start >= startsAt)
        || timeline.some(task => task.end <= endsAt)
}

function getTodayRange() {
    const today = new Date()
    const startsAt = new Date(today.toLocaleDateString())
    const endsAt = new Date(`${today} 23:59:59`)
    return { startsAt, endsAt }
}