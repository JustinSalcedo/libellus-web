/* Global variables */

let interval

const mySchedule = MY_SCHEDULE.sort((a, b) => a.start.getTime() - b.start.getTime())

let currentTaskCache = null

// Elements

const clock = document.querySelector('.main-task .clock')

const taskName = document.querySelector('.main-task .task-name')

const nextTaskElement = document.querySelector('.next-task')

const taskQueueList = document.querySelector('.task-queue ul')
taskQueueList.addEventListener('click', displayTaskHistory)

const overlay = document.querySelector('.overlay')
overlay.addEventListener('click', hideModal)

const modalElement = document.querySelector('.modal')
const modalHeaderElement = document.querySelector('.modal > .modal-header')
const modalBodyElement = document.querySelector('.modal > .modal-body')

/* Utilities */

// get formatted time
function formatTimeToStr(timestamp, locale, is12hr) {
    return timestamp.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: is12hr })
}

// get previous, current, and next task
function getTaskQueue(schedule) {
    const time  = new Date()
    const currentIndex = schedule.findIndex(task => time >= task.start && time < task.end)
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

// // regular clock
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

function loadTask(currentTask) {
    taskName.textContent = currentTask.name
}

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
function loadTaskQueue(taskQueue) {
    taskQueueList.innerHTML = ''

    taskQueue.forEach((task, index) => {
        const taskElement = document.createElement('li')
        if (index === 1) taskElement.className = 'current'
        taskElement.textContent = task ? task.name : '...'
        taskQueueList.appendChild(taskElement)
    })
}

function displayTaskHistory() {
    loadTaskHistory(mySchedule)
    displayModal()
}

// load task history
function loadTaskHistory(mySchedule) {
    clearModal()

    modalHeaderElement.textContent = 'Task history'

    // general element
    const today = new Date().getDay()

    const taskHistoryCont = document.createElement('div')
    taskHistoryCont.className = 'task-history'
    const taskHistoryTable = document.createElement('table')

    const fixedTable = document.createElement('table')
    fixedTable.className = 'fixed-header'
    const fixedTableHead = document.createElement('thead')

    const headCell = headStr => {
        cell = document.createElement('th')
        cell.textContent = headStr; return cell
    }

    // Setup fixed table header
    fixedTableHead.appendChild(headCell(''))
    fixedTableHead.appendChild(headCell('start'))
    fixedTableHead.appendChild(headCell('end'))
    fixedTable.appendChild(fixedTableHead)
    
    // Write task rows in the table
    let currentDay = today
    mySchedule.forEach((task, index) => {
        if (today !== task.start.getDay()) {
        }

        if (currentDay !== task.start.getDay()) {
            const dayRow = document.createElement('tr')
            dayRow.className = 'day-subhead'
            const dayCell = document.createElement('td')
            dayCell.setAttribute('colspan', '3')
            const dayStr = today !== task.start.getDay()
                ? task.start.toLocaleDateString('en-US', { weekday: 'long' })
                : 'Today'

            dayCell.textContent = dayStr
            dayRow.appendChild(dayCell)
            taskHistoryTable.appendChild(dayRow)

            currentDay = task.start.getDay()
        }

        const taskRow = document.createElement('tr')
        taskRow.id = `def_${index}` // task ID = def(ault)_TASKINDEX

        const taskNameCell = document.createElement('td')
        taskNameCell.textContent = task.name

        const taskStartCell = document.createElement('td')
        taskStartCell.textContent = formatTimeToStr(task.start, 'en-US', true)

        const taskEndCell = document.createElement('td')
        taskEndCell.textContent = formatTimeToStr(task.end, 'en-US', true)

        taskRow.appendChild(taskNameCell)
        taskRow.appendChild(taskStartCell)
        taskRow.appendChild(taskEndCell)
        taskHistoryTable.appendChild(taskRow)
    });

    // append fixed table and history table to container, then containter to modal
    taskHistoryCont.appendChild(fixedTable)
    taskHistoryCont.appendChild(taskHistoryTable)

    modalBodyElement.appendChild(taskHistoryCont)
}

// display modal and overlay
function displayModal() {
    overlay.className = 'overlay on'
    modalElement.className = 'modal on'
}

// hide modal and overlay
function hideModal() {
    overlay.className = 'overlay'
    modalElement.className = 'modal'
}

// clear modal
function clearModal() {
    modalHeaderElement.textContent = ''
    modalBodyElement.textContent = ''
}

// redirect to completion screen (no more scheduled tasks)
function redirectCompletion() {
    window.location.href = 'complete.html'
}


/* Main function */

function main() {
    // TODO: create custom intervals to recall the task queue
    interval = setInterval(() => loadContent(getTaskQueue(mySchedule)), 1000)
}

main()