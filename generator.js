const NOW = new Date('2023/02/16')
const YESTERDAY = new Date(NOW.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US')
const TODAY = NOW.toLocaleDateString('en-US')
const TOMORROW = new Date(NOW.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US')

const oneDayBack = date => new Date(date.getTime() - 24 * 60 * 60 * 1000)

const WAKEUP_LATE = [
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

const WORKDAY = [
    {
        name: "Wake up!",
        start: new Date(`${TODAY} 6:00`),
        end: new Date(`${TODAY} 6:30`)
    },
    {
        name: "Dance it",
        start: new Date(`${TODAY} 6:30`),
        end: new Date(`${TODAY} 6:45`)
    },
    {
        name: "Setup",
        start: new Date(`${TODAY} 6:45`),
        end: new Date(`${TODAY} 7:00`)
    },
    {
        name: "Work",
        start: new Date(`${TODAY} 7:00`),
        end: new Date(`${TODAY} 11:00`)
    },
    {
        name: "Lunch",
        start: new Date(`${TODAY} 11:00`),
        end: new Date(`${TODAY} 11:15`)
    },
    {
        name: "Work",
        start: new Date(`${TODAY} 11:15`),
        end: new Date(`${TODAY} 13:15`)
    },
    {
        name: "Setup and remind",
        start: new Date(`${TODAY} 13:15`),
        end: new Date(`${TODAY} 13:30`)
    },
    {
        name: "Check email",
        start: new Date(`${TODAY} 13:30`),
        end: new Date(`${TODAY} 13:45`)
    },
    {
        name: "Detoxify",
        start: new Date(`${TODAY} 13:45`),
        end: new Date(`${TODAY} 14:00`)
    }
]

const WORK_N_CLASS = [
    ...WORKDAY,
    {
        name: "CT Discussion",
        start: new Date(`${TODAY} 14:00`),
        end: new Date(`${TODAY} 14:30`)
    },
    {
        name: "Salad time!",
        start: new Date(`${TODAY} 14:30`),
        end: new Date(`${TODAY} 14:45`)
    },
    {
        name: "CompTIA Linux+",
        start: new Date(`${TODAY} 14:45`),
        end: new Date(`${TODAY} 16:00`)
    },
    {
        name: "PHYS204 live lesson",
        start: new Date(`${TODAY} 16:00`),
        end: new Date(`${TODAY} 17:00`)
    }
]

const SLEEP_EARLY = [
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
        name: "Brush teeth",
        start: new Date(`${TODAY} 22:15`),
        end: new Date(`${TODAY} 22:30`)
    },
    {
        name: "Sleep",
        start: new Date(`${TODAY} 23:00`),
        end: new Date(`${TOMORROW} 6:00`)
    }
]

const SLEPT_EARLY = SLEEP_EARLY.map(task => ({
    ...task,
    start: oneDayBack(task.start),
    end: oneDayBack(task.end)
}))

const SLEEP_LATE = [
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
        name: "Brush teeth",
        start: new Date(`${TODAY} 22:15`),
        end: new Date(`${TODAY} 22:30`)
    },
    {
        name: "Sleep",
        start: new Date(`${TOMORROW} 0:00`),
        end: new Date(`${TOMORROW} 7:45`)
    }
]

const SLEPT_LATE = SLEEP_LATE.map(task => ({
    ...task,
    start: oneDayBack(task.start),
    end: oneDayBack(task.end)
}))

/* Templates */

const WEEKDAY = {
    head: [
        // Yesterday
        ...SLEPT_EARLY,

        // Today
        ...WORKDAY
    ],
    tail: SLEEP_EARLY
}

const MONDAY = {
    ...WEEKDAY,
    head: [
        ...WEEKDAY.head,
        {
            name: "AP Project",
            start: new Date(`${TODAY} 14:00`),
            end: new Date(`${TODAY} 15:15`)
        },
        {
            name: "Salad time!",
            start: new Date(`${TODAY} 15:15`),
            end: new Date(`${TODAY} 15:30`)
        },
        {
            name: "AP Discussion",
            start: new Date(`${TODAY} 15:45`),
            end: new Date(`${TODAY} 16:45`)
        },
        {
            name: "CT Discussion",
            start: new Date(`${TODAY} 17:00`),
            end: new Date(`${TODAY} 18:00`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 18:00`),
            end: new Date(`${TODAY} 18:15`)
        },
        {
            name: "Max Interval Training",
            start: new Date(`${TODAY} 18:15`),
            end: new Date(`${TODAY} 19:15`)
        },
        {
            name: "Shower",
            start: new Date(`${TODAY} 19:15`),
            end: new Date(`${TODAY} 19:45`)
        }
    ]
}

const TUESDAY = {
    ...WEEKDAY,
    head: [
        // Yesterday
        ...SLEPT_EARLY,

        // Today
        ...WORK_N_CLASS,
        {
            name: "AP Discussion",
            start: new Date(`${TODAY} 17:00`),
            end: new Date(`${TODAY} 18:30`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 18:30`),
            end: new Date(`${TODAY} 18:45`)
        },
        {
            name: "Max Interval Plyo",
            start: new Date(`${TODAY} 18:45`),
            end: new Date(`${TODAY} 19:45`)
        },
        {
            name: "Shower",
            start: new Date(`${TODAY} 19:45`),
            end: new Date(`${TODAY} 20:15`)
        }
    ],
}

const WEDNESDAY = {
    ...WEEKDAY,
    head: [
        ...WEEKDAY.head,
        {
            name: "CT Discussion",
            start: new Date(`${TODAY} 14:00`),
            end: new Date(`${TODAY} 14:30`)
        },
        {
            name: "Salad time!",
            start: new Date(`${TODAY} 14:30`),
            end: new Date(`${TODAY} 14:45`)
        },
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 15:00`),
            end: new Date(`${TODAY} 16:00`)
        },
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 16:15`),
            end: new Date(`${TODAY} 17:45`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 18:00`),
            end: new Date(`${TODAY} 18:15`)
        },
        {
            name: "Max Cardio Conditioning",
            start: new Date(`${TODAY} 18:15`),
            end: new Date(`${TODAY} 19:15`)
        },
        {
            name: "Shower",
            start: new Date(`${TODAY} 19:15`),
            end: new Date(`${TODAY} 19:45`)
        }
    ]
}

const THURSDAY = {
    ...WEEKDAY,
    head: [
        ...WEEKDAY.head,
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 14:00`),
            end: new Date(`${TODAY} 15:00`)
        },
        {
            name: "Salad time!",
            start: new Date(`${TODAY} 15:00`),
            end: new Date(`${TODAY} 15:15`)
        },
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 15:15`),
            end: new Date(`${TODAY} 17:45`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 18:00`),
            end: new Date(`${TODAY} 18:15`)
        },
        {
            // name: "Max Recovery",
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 18:15`),
            end: new Date(`${TODAY} 19:15`)
        },
        {
            name: "Shower",
            start: new Date(`${TODAY} 19:15`),
            end: new Date(`${TODAY} 19:45`)
        }
    ]
}

const FRIDAY = {
    head: [
        ...WEEKDAY.head,
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 14:00`),
            end: new Date(`${TODAY} 15:00`)
        },
        {
            name: "Salad time!",
            start: new Date(`${TODAY} 15:00`),
            end: new Date(`${TODAY} 15:15`)
        },
        {
            name: "CompTIA Linux+",
            start: new Date(`${TODAY} 15:15`),
            end: new Date(`${TODAY} 17:45`)
        },
        {
            name: "Setup",
            start: new Date(`${TODAY} 18:00`),
            end: new Date(`${TODAY} 18:15`)
        },
        {
            name: "Max Interval Circuit",
            start: new Date(`${TODAY} 18:15`),
            end: new Date(`${TODAY} 19:15`)
        },
        {
            name: "Shower",
            start: new Date(`${TODAY} 19:15`),
            end: new Date(`${TODAY} 19:45`)
        }
    ],
    tail: SLEEP_LATE
}

const WEEKEND = {
    head: [
        // Yesterday
        ...SLEPT_LATE,

        // Today
        ...WAKEUP_LATE
    ],
    tail: SLEEP_LATE
}

const SATURDAY = {
    ...WEEKEND
}

const SUNDAY = {
    head: [
        ...WEEKEND.head,
        {
            name: "CT PlayPosit",
            start: new Date(`${TODAY} 10:15`),
            end: new Date(`${TODAY} 10:30`)
        },
        {
            name: "CT Poll",
            start: new Date(`${TODAY} 10:30`),
            end: new Date(`${TODAY} 10:45`)
        },
        {
            name: "CT MindTap",
            start: new Date(`${TODAY} 10:45`),
            end: new Date(`${TODAY} 11:00`)
        },
        {
            name: "CT Prep quiz",
            start: new Date(`${TODAY} 11:00`),
            end: new Date(`${TODAY} 11:15`)
        },
        {
            name: "CT Quiz",
            start: new Date(`${TODAY} 11:15`),
            end: new Date(`${TODAY} 11:30`)
        },
        {
            name: "AP Knowledge check",
            start: new Date(`${TODAY} 11:45`),
            end: new Date(`${TODAY} 12:00`)
        },
        {
            name: "AP WebAssign",
            start: new Date(`${TODAY} 12:00`),
            end: new Date(`${TODAY} 14:00`)
        },
        {
            name: "Salad time!",
            start: new Date(`${TODAY} 14:15`),
            end: new Date(`${TODAY} 14:30`)
        }
    ],
    tail: SLEEP_EARLY
}

const CUSTOMDAY = {
    ...MONDAY,
    head: MONDAY.head.map((task) => {
        if (task.name === "Check email") return { ...task, name: "Drive" }
        if (task.name === "Detoxify") return { ...task, name: "Groceries" }
        return task
    })
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
    if (day === "monday") template = MONDAY
    if (day === "tuesday") template = TUESDAY
    if (day === "wednesday") template = WEDNESDAY
    if (day === "thursday") template = THURSDAY
    if (day === "friday") template = FRIDAY
    if (day === "weekend") template = WEEKEND
    if (day === "saturday") template = SATURDAY
    if (day === "sunday") template = SUNDAY
    if (day === "custom") template = CUSTOMDAY

    if (!template) throw new Error('No valid template selected')

    return template
}

mySchedule = generate('thursday', '', 15, 'CT Discussion', 30, 'AP Discussion', 30, 'Surveys', 15)
// setScheduleForLb(mySchedule).then(savedSchedule => console.log(savedSchedule))
clearInterval(interval)
interval = setInterval(() => loadContent(getTaskQueue(mySchedule)), 1000)