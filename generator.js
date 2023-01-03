const NOW = new Date('2023/01/03')
const YESTERDAY = new Date(NOW.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US')
const TODAY = NOW.toLocaleDateString('en-US')
const TOMORROW = new Date(NOW.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US')

const HEAD_SLEEP_LATE = [
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
        end: new Date(`${TODAY} 7:45`)
    }
]

const HEAD_SLEEP_EARLY = [
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
    }
]

const HEAD_WAKEUP_LATE = [
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
    }
]

const HEAD_WORKDAY = [
    {
        name: "Meditate",
        start: new Date(`${TODAY} 6:45`),
        end: new Date(`${TODAY} 7:00`)
    },
    // {
    //     name: "Work",
    //     start: new Date(`${TODAY} 7:00`),
    //     end: new Date(`${TODAY} 13:15`)
    // },
    // {
    //     name: "Lunch",
    //     start: new Date(`${TODAY} 13:30`),
    //     end: new Date(`${TODAY} 13:45`)
    // },
    // {
    //     name: "Check email",
    //     start: new Date(`${TODAY} 13:45`),
    //     end: new Date(`${TODAY} 14:00`)
    // }
    {
        name: "Work",
        start: new Date(`${TODAY} 7:00`),
        end: new Date(`${TODAY} 14:45`)
    },
    {
        name: "Lunch",
        start: new Date(`${TODAY} 14:45`),
        end: new Date(`${TODAY} 15:00`)
    },
    {
        name: "Check email",
        start: new Date(`${TODAY} 15:00`),
        end: new Date(`${TODAY} 15:15`)
    }
]

const HEAD_WORK_N_CLASS = [
    ...HEAD_WORKDAY,
    {
        name: "Homework",
        start: new Date(`${TODAY} 15:30`),
        end: new Date(`${TODAY} 16:00`)
    },
    {
        name: "PHYS204 live lesson",
        start: new Date(`${TODAY} 16:00`),
        end: new Date(`${TODAY} 17:00`)
    }
]

const TAIL_SLEEP_EARLY = [
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
    }
]

const TAIL_SLEEP_LATE = [
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
        start: new Date(`${TOMORROW} 0:00`),
        end: new Date(`${TOMORROW} 7:45`)
    }
]

/* Templates */

const WEEKDAY = {
    head: [
        // Yesterday
        ...HEAD_SLEEP_EARLY,

        // Today
        ...HEAD_WORKDAY
    ],
    tail: [
        // Today
        ...TAIL_SLEEP_EARLY
    ]
}

const TUESDAY = {
    ...WEEKDAY,
    head: [
        // Yesterday
        ...HEAD_SLEEP_EARLY,

        // Today
        ...HEAD_WORK_N_CLASS
    ],
}

const FRIDAY = {
    ...WEEKDAY,
    tail: [
        ...TAIL_SLEEP_LATE
    ]
}

const WEEKEND = {
    head: [
        // Yesterday
        ...HEAD_SLEEP_LATE,

        // Today
        ...HEAD_WAKEUP_LATE
    ],
    tail: [
        // Today
        ...TAIL_SLEEP_LATE
    ]
}

const SUNDAY = {
    ...WEEKEND,
    tail: [
        ...TAIL_SLEEP_EARLY
    ]
}

const CUSTOMDAY = {
    ...WEEKDAY,
    head: [
        // Yesterday
        ...HEAD_SLEEP_EARLY,

        // Today
        {
            name: "Meditate",
            start: new Date(`${TODAY} 6:45`),
            end: new Date(`${TODAY} 7:00`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 7:00`),
            end: new Date(`${TODAY} 7:15`)
        },
        {
            name: "Breakfast",
            start: new Date(`${TODAY} 7:15`),
            end: new Date(`${TODAY} 7:30`)
        },
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 8:00`),
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
        }
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

    if (day === "weekday") template = WEEKDAY
    if (day === "tuesday") template = TUESDAY
    if (day === "friday") template = FRIDAY
    if (day === "weekend") template = WEEKEND
    if (day === "sunday") template = SUNDAY
    if (day === "custom") template = CUSTOMDAY

    if (!template) throw new Error('No valid template selected')

    return template
}

mySchedule = generate('tuesday', 'AP Discussion', 60, 'Setup', 15, 'Plyometric Cardio Circuit', 60, '', 15, 'Shower', 60, '', 15, 'CT Play Posit', 45)
clearInterval(interval)
interval = setInterval(() => loadContent(getTaskQueue(mySchedule)), 1000)