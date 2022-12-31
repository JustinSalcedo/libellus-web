const NOW = new Date('2022/12/30')
const YESTERDAY = new Date(NOW.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US')
const TODAY = NOW.toLocaleDateString('en-US')
const TOMORROW = new Date(NOW.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US')

const WEEKDAY = {
    head: [
        // Yesterday
        {
            name: "Dinner",
            start: new Date(`${YESTERDAY} 21:30`),
            end: new Date(`${YESTERDAY} 21:45`)
        },
        {
            name: "Libellus",
            start: new Date(`${YESTERDAY} 21:45`),
            end: new Date(`${YESTERDAY} 22:00`)
        },
        {
            name: "Setup",
            start: new Date(`${YESTERDAY} 22:00`),
            end: new Date(`${YESTERDAY} 22:15`)
        },
        {
            name: "Sleep",
            start: new Date(`${YESTERDAY} 23:00`),
            end: new Date(`${TODAY} 6:45`)
        },

        // Today
        {
            name: "Meditate",
            start: new Date(`${TODAY} 6:45`),
            end: new Date(`${TODAY} 7:00`)
        },
        {
            name: "Work",
            start: new Date(`${TODAY} 7:00`),
            end: new Date(`${TODAY} 13:15`)
        },
        {
            name: "Lunch",
            start: new Date(`${TODAY} 13:30`),
            end: new Date(`${TODAY} 13:45`)
        },
        {
            name: "Check email",
            start: new Date(`${TODAY} 13:45`),
            end: new Date(`${TODAY} 14:00`)
        },
    ],
    tail: [
        // Today
        {
            name: "Dinner",
            start: new Date(`${TODAY} 21:30`),
            end: new Date(`${TODAY} 21:45`)
        },
        {
            name: "Libellus",
            start: new Date(`${TODAY} 21:45`),
            end: new Date(`${TODAY} 22:00`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 22:00`),
            end: new Date(`${TODAY} 22:15`)
        },
        {
            name: "Sleep",
            start: new Date(`${TODAY} 23:00`),
            end: new Date(`${TOMORROW} 6:45`)
        },
    ]
}

const WEEKEND = {
    head: [
        // Yesterday
        {
            name: "Dinner",
            start: new Date(`${YESTERDAY} 21:30`),
            end: new Date(`${YESTERDAY} 21:45`)
        },
        {
            name: "Libellus",
            start: new Date(`${YESTERDAY} 21:45`),
            end: new Date(`${YESTERDAY} 22:00`)
        },
        {
            name: "Setup",
            start: new Date(`${YESTERDAY} 22:00`),
            end: new Date(`${YESTERDAY} 22:15`)
        },
        {
            name: "Sleep",
            start: new Date(`${YESTERDAY} 23:00`),
            end: new Date(`${TODAY} 6:45`)
        },

        // Today
        {
            name: "Meditate",
            start: new Date(`${TODAY} 7:45`),
            end: new Date(`${TODAY} 8:15`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 8:15`),
            end: new Date(`${TODAY} 8:30`)
        },
        {
            name: "Laundry/Clean up",
            start: new Date(`${TODAY} 8:30`),
            end: new Date(`${TODAY} 8:45`)
        },
        {
            name: "(Get ahead)",
            start: new Date(`${TODAY} 9:00`),
            end: new Date(`${TODAY} 10:00`)
        },
        {
            name: "Breakfast",
            start: new Date(`${TODAY} 10:00`),
            end: new Date(`${TODAY} 10:15`)
        },
    ],
    tail: [
        // Today
        {
            name: "Dinner",
            start: new Date(`${TODAY} 21:30`),
            end: new Date(`${TODAY} 21:45`)
        },
        {
            name: "Libellus",
            start: new Date(`${TODAY} 21:45`),
            end: new Date(`${TODAY} 22:00`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 22:00`),
            end: new Date(`${TODAY} 22:15`)
        },
        {
            name: "Sleep",
            start: new Date(`${TODAY} 23:00`),
            end: new Date(`${TOMORROW} 6:45`)
        },
    ]
}

function generate(day, ...taskList) {
    const { head, tail } = getTemplate(day)

    const subSchedule = []

    let lastTimestamp = validateSchedule(head)[head.length - 1].end
    const timestampLimit = validateSchedule(tail)[0].start

    for (let index = 0; index < taskList.length; index++) {
        const taskName = taskList[index]
        const timespanInMin = taskList[index + 1]
        // skip timespans or task names without timespan
        if (index % 2 || !timespanInMin) continue;

        // NOTE: wrap in parenthesis to compare typeof
        if (!(typeof taskName === 'string')) throw new Error(`Task '${taskName}' has invalid name or type`)
        if (!(typeof timespanInMin === 'number')) throw new Error(`Task '${taskName}' misses a timespan`)
        
        // empty string = task gap
        if (!taskName) {
            lastTimestamp = new Date(lastTimestamp.getTime() + timespanInMin * 60 * 1000)
            continue;
        }

        const task = generateTask(taskName, timespanInMin, lastTimestamp)

        // task goes over the subschedule timespan
        if (task.end > timestampLimit) {
            console.warn(`Task '${task.name}' ${(taskList.length - 2 === index)
                ? 'exceeds the timespan and was skipped'
                : `and other ${Math.floor((taskList.length - index - 1) / 2)} exceed the timespan and were skipped`
            }`)
            break;
        }

        subSchedule.push(task)
        lastTimestamp = task.end
    }

    return validateSchedule([...head, ...subSchedule, ...tail])
}

function generateTask(name, timespanInMin, lastTimestamp) {
    return {
        name,
        start: lastTimestamp,
        end: new Date(lastTimestamp.getTime() + timespanInMin * 60 * 1000)
    }
}

function getTimespan(day) {
    const { head, tail } = getTemplate(day)
    const headEnd = validateSchedule(head)[head.length - 1].end
    const tailStart = validateSchedule(tail)[0].start

    const diffInMin = Math.floor((tailStart.getTime() - headEnd.getTime()) / 1000 / 60)
    const hours = Math.floor(diffInMin / 60)
    const mins = diffInMin % 60
    if (hours) return `${hours} hours${mins ? ` and ${mins} minutes` : ''}`
    return `${mins} minutes`
}

function getTemplate(day) {
    let template = null
    if (day === "weekday") {
        template = WEEKDAY
    }

    if (day === "weekend") {
        template = WEEKEND
    }

    if (!template) throw new Error('No valid template selected')

    return template
}

mySchedule = generate('weekday', 'Shopping cart', 15, 'Get Insanity', 15, 'Transfer domain', 30, 'Talk to aunt', 30, '', 30, 'CompTIA Linux+', 3 * 60, '', 30, 'CompTIA Linux+', 60 + 45, 'Photo session', 15)
clearInterval(interval)
interval = setInterval(() => loadContent(getTaskQueue(mySchedule)), 1000)