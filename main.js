/* Global variables */

let interval = 0

let mySchedule = []

try {
    mySchedule = validateSchedule(MY_SCHEDULE)
} catch (error) {
    alert(error)
}

let currentTaskCache = null

let showHistory = false

const DEF_GAP = { name: "Chill" }

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
    }

    return sublist
}

function getCurrentTaskIndex(schedule, timestamp) {
    return schedule.findIndex(task => isTaskInTime(task, timestamp))
}

function isTaskInTime(task, timestamp) {
    return timestamp >= task.start && timestamp < task.end
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
    const {prevTask, currentTask, nextTask} = taskQueue

    if (!currentTask) {
        clearInterval(interval)
        return redirectCompletion()
    }

    if (currentTask !== currentTaskCache) {
        loadTask(currentTask)
        loadNextTask(nextTask)
        loadTaskQueue([prevTask, currentTask, nextTask])

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

        nextTaskElement.append(label, text)

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

    const taskElements = fillGapItems(taskQueue).map(createQueueElement)
    taskQueueList.append(...taskElements)
}

function createQueueElement(task, index) {
    const taskElement = document.createElement('li')
    if (index === 1) taskElement.className = 'current'
    taskElement.textContent = (task && task.name !== DEF_GAP.name) ? task.name : '...'
    return taskElement
}

function fillGapItems(taskQueue) {
    if (taskQueue.length === 2) {

        // Case 1: [X, Y, 0]
        if (isCurrentTask(taskQueue[1])) return [...taskQueue, 0]
    
        // Case 3: [0, X, Y]
        if (isCurrentTask(taskQueue[0])) return [0, ...taskQueue]
    }

    // Case 4: [0, X, 0]
    if (taskQueue.length === 1) return [0, taskQueue[0], 0]
    
    // Case 2: [X, 0, Y]
    return taskQueue
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
    const taskHistoryCont = document.createElement('div')
    taskHistoryCont.className = 'task-history'
    const taskHistoryTable = document.createElement('table')

    const fixedHeader = document.createElement('div')
    fixedHeader.className = 'fixed-header'

    const fixedTable = document.createElement('table')
    const fixedTableHead = document.createElement('thead')

    const headCell = headStr => {
        cell = document.createElement('th')
        cell.textContent = headStr; return cell
    }

    // Setup fixed table header
    fixedTableHead.append(headCell(''), headCell('start'), headCell('end'))
    fixedTable.appendChild(fixedTableHead)

    // Setup showHistory form
    const showHistoryForm = document.createElement('form')
    const sHID = 'showHistory'  // showHistory identifier

    const sHLabel = document.createElement('label')
    sHLabel.setAttribute('for', sHID)
    sHLabel.textContent = 'Show past tasks:'

    const sHCheckbox = document.createElement('input')
    sHCheckbox.setAttribute('type', 'checkbox')
    sHCheckbox.setAttribute('name', sHID)
    sHCheckbox.setAttribute('id', sHID)

    showHistoryForm.append(sHLabel, sHCheckbox)

    // Setup fixed header
    fixedHeader.append(showHistoryForm, fixedTable)

    // Render task history a first time and add to event listener
    renderTaskHistory(mySchedule, taskHistoryTable)
    sHCheckbox.addEventListener('click', e =>
        toggleHistory(e, () => renderTaskHistory(mySchedule, taskHistoryTable)))

    // append showHistory form, fixed table and history table to container, then containter to modal
    taskHistoryCont.append(fixedHeader, taskHistoryTable)

    modalBodyElement.appendChild(taskHistoryCont)
}

function toggleHistory(e, callback) {
    showHistory = e.target.checked
    if (callback) callback()
}

function renderTaskHistory(mySchedule, taskHistoryTable) {
    const today = new Date().getDay()
    taskHistoryTable.textContent = ''

    // Show only scheduled tasks, not the history
    let parsedSchedule = mySchedule
    if (!showHistory)
        parsedSchedule = mySchedule.filter(task => Date.now() < task.end.getTime())
    
    // Write task rows in the table
    let currentDay = today
    parsedSchedule.forEach((task, index) => {

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
        if (isCurrentTask(task)) taskRow.className = 'current-task'

        const taskNameCell = document.createElement('td')
        taskNameCell.textContent = task.name

        const taskStartCell = document.createElement('td')
        taskStartCell.textContent = formatTimeToStr(task.start, 'en-US', true)

        const taskEndCell = document.createElement('td')
        taskEndCell.textContent = formatTimeToStr(task.end, 'en-US', true)

        taskRow.append(taskNameCell, taskStartCell, taskEndCell)
        taskHistoryTable.appendChild(taskRow)
    });
}

function isCurrentTask(task) {
    if (currentTaskCache) return areTasksEqual(task, currentTaskCache)
    return isTaskInTime(task, new Date())
}

function areTasksEqual(task1, task2) {
    if (task1 === 0 && task2 === 0) return true

    return task1.name === task2.name
        && task1.start.getTime() === task2.start.getTime()
        && task1.end.getTime() === task2.end.getTime()
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

// validate schedule (unsorted)
function validateSchedule(unSchedule) {
    const schedule = unSchedule.sort((a, b) => a.start.getTime() - b.start.getTime())

    let errorMessage = ''
    schedule.every((task, index) => {
        const startTime = task.start.getTime()
        const endTime = task.end.getTime()

        // Case 1: there's an invalid task
        if (!isValidTask(task)) {
            errorMessage = `Task ${task.name} has invalid timestamp or name`
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

function isValidTask(task) {
    const notEmptyOrNull = task.name && task.start && task.end
    const isValidTime = !!task.start.getTime() && !!task.end.getTime()
    return task.name.length <= 32 && notEmptyOrNull && isValidTime
}

/* Main function */

function main() {
    // TODO: create custom intervals to recall the task queue
    interval = setInterval(() => loadContent(getTaskQueue(mySchedule)), 1000)
}

main()