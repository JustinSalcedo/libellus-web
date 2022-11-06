const TODAY = "2022/11/5"

const clock = document.querySelector('.main-task .clock')

let interval

const task = {
    name: "Homework",
    start: new Date(`${TODAY} 14:00`),
    end: new Date(`${TODAY} 15:00`)
}

const mySchedule = MY_SCHEDULE.sort((a, b) => a.start.getTime() - b.start.getTime())

// get previous, current, and next task

function getTaskQueue(schedule) {
    const time  = new Date()
    const currentIndex = schedule.findIndex(task => time >= task.start && time < task.end)
    console.log(currentIndex)
    // assumes the schedule is time sorted
    let queue = schedule.slice(currentIndex - 1, currentIndex + 2)
    if (currentIndex === -1) {
        const defaultGap = getDefaultGap(schedule, time)
        if (defaultGap) queue = defaultGap
    }
    if (currentIndex === 0) queue = [null, ...schedule.slice(currentIndex, currentIndex + 2)]
    return queue
}

function getDefaultGap(schedule, time) {
    // assumes the schedule is time sorted
    const prevIndex = schedule.findIndex(task => time >= task.end)
    const nextIndex = schedule.findIndex(task => time < task.start)

    if (nextIndex === -1) return null

    return [
        schedule[prevIndex],
        {
            name: 'Chill',
            start: schedule[prevIndex].end,
            end: schedule[nextIndex].start
        },
        schedule[nextIndex]
    ]
}

// regular clock

// const renderTime = () => {
//     let time = new Date()
//     clock.textContent = time.toLocaleTimeString()
// }

// setInterval(renderTime, 1000)

// timer

function getTimeLeft(task, unit) {
    const msCurrentTime = Date.now()
    const msEndTime = task.end.getTime()

    return formatTimeLeft(msEndTime - msCurrentTime, unit)
}

function formatTimeLeft(timeInMs, unit) {
    let timeInSec = Math.floor(timeInMs / 1000)
    // let timeString = `${Math.floor(timeInSec / 3600)}:`
    let timeString = `${Math.floor(timeInSec / 3600)}:${Math.floor(timeInSec % 3600 / 60)}`

    if (unit === 's') {
        timeString = `${timeString}:${timeInSec % 60}`
    }

    return timeString
}

const renderTimeLeft = currentTask => {
    const timeLeft = getTimeLeft(currentTask, 's')
    clock.textContent = timeLeft
}

// content loader (current and next task)

let currentTaskCache = null

function loadContent(taskQueue) {
    const [_, currentTask, nextTask] = taskQueue
    if (!currentTask) {
        clearInterval(interval)
        return redirectCompletion()
    }

    if (currentTask !== currentTaskCache) {
        loadTask(currentTask)
        loadNextTask(nextTask)
        loadTaskQueue(taskQueue)

        currentTaskCache = currentTask
    }
    renderTimeLeft(currentTask)
}

const taskName = document.querySelector('.main-task .task-name')

function loadTask(currentTask) {
    taskName.textContent = currentTask.name
}

const nextTaskElement = document.querySelector('.next-task')

function loadNextTask(nextTask) {
    nextTaskElement.innerHTML = ''

    if (nextTask) {
        const label = document.createElement('span')
        label.className = 'label'
        label.textContent = 'Next: '

        const text = document.createElement('span')
        text.className = 'text'
        text.textContent = nextTask.name

        nextTaskElement.appendChild(label)
        nextTaskElement.appendChild(text)

        return;
    }

    const lastTaskNote = document.createElement('span')
    lastTaskNote.className = 'last-task'
    lastTaskNote.textContent = 'Last task'

    nextTaskElement.appendChild(lastTaskNote)
}

// load task queue

const taskQueueList = document.querySelector('.task-queue ul')

function loadTaskQueue(taskQueue) {
    taskQueueList.innerHTML = ''

    taskQueue.forEach((task, index) => {
        const taskElement = document.createElement('li')
        if (index === 1) taskElement.className = 'current'
        taskElement.textContent = task ? task.name : '...'
        console.log(task)
        taskQueueList.appendChild(taskElement)
    })
}

// redirect to completion screen (no more scheduled tasks)

function redirectCompletion() {
    window.location.href = 'complete.html'
}

// Main function

function main() {
    const taskQueue = getTaskQueue(mySchedule)
    interval = setInterval(() => loadContent(taskQueue), 1000)
}

main()