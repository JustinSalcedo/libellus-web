// Missing fields
const schedule1 = [
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 11:45`)
    },
    {
        name: "Meditate",
        start: new Date(`${FRIDAY} 9:00`),
        end: new Date(`${FRIDAY} 9:30`)
    },
    {
        name: "Breakfast",
        end: new Date(`${FRIDAY} 10:00`)
    }
]

// Invalid fields
const schedule2 = [
    {
        name: "Trip to the Ancient City of Atlantis",
        start: new Date(`${THURSDAY} 11:45`),
        end: new Date(`${FRIDAY} 9:00`)
    },
    {
        name: "Meditate",
        start: new Date(`9:00`),
        end: new Date(`${FRIDAY} 9:30`)
    },
    {
        name: "",
        start: new Date(`${FRIDAY} 9:30`),
        end: new Date(`${FRIDAY} 10:00`)
    }
]

// Overlap
const schedule3 = [
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 11:45`),
        end: new Date(`${FRIDAY} 9:00`)
    },
    {
        name: "Meditate",
        start: new Date(`${FRIDAY} 8:45`),
        end: new Date(`${FRIDAY} 9:30`)
    },
    {
        name: "Breakfast",
        start: new Date(`${FRIDAY} 9:30`),
        end: new Date(`${FRIDAY} 10:00`)
    }
]

// End before start
const schedule4 = [
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 11:45`),
        end: new Date(`${FRIDAY} 9:00`)
    },
    {
        name: "Meditate",
        start: new Date(`${FRIDAY} 9:00`),
        end: new Date(`${FRIDAY} 8:30`)
    },
    {
        name: "Breakfast",
        start: new Date(`${FRIDAY} 9:30`),
        end: new Date(`${FRIDAY} 10:00`)
    }
]

// Duplicated tasks (overlap)
const schedule5 = [
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 11:45`),
        end: new Date(`${FRIDAY} 9:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${FRIDAY} 9:00`),
        end: new Date(`${FRIDAY} 9:30`)
    },
    {
        name: "Sleep",
        start: new Date(`${FRIDAY} 9:00`),
        end: new Date(`${FRIDAY} 9:30`)
    }
]

// Reversed schedule (should not faile)
const schedule6 = [
    {
        name: "Breakfast",
        start: new Date(`${FRIDAY} 9:30`),
        end: new Date(`${FRIDAY} 10:00`)
    },
    {
        name: "Meditate",
        start: new Date(`${FRIDAY} 9:00`),
        end: new Date(`${FRIDAY} 9:30`)
    },
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 11:45`),
        end: new Date(`${FRIDAY} 9:00`)
    }
]

const now = Date.now()
const min = mlSec => mlSec * 1000 * 60

// Task queue => [X, Y, 0] (T1, T2, "...")
const schedule7 = [
    {
        name: "Wake up",
        start: new Date(now - min(90)),
        end: new Date(now - min(30))
    },
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    },
    // {
    //     name: "Sleep",
    //     start: new Date(now + min(30)),
    //     end: new Date(now + min(90))
    // }
]

const queueFrom7 = [
    {
        name: "Wake up",
        start: new Date(now - min(90)),
        end: new Date(now - min(30))
    },
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    }
]

const queueNodes7 = ["Wake up", "Eat", "..."]
    .map(str => ({ name: str }))
    .map(createQueueElement)

// Task queue => [X, 0, Y] (T1, "...", T2)
const schedule8 = [
    {
        name: "Wake up",
        start: new Date(now - min(90)),
        end: new Date(now - min(30))
    },
    // {
    //     name: "Eat",
    //     start: new Date(now - min(30)),
    //     end: new Date(now + min(30))
    // },
    {
        name: "Sleep",
        start: new Date(now + min(30)),
        end: new Date(now + min(90))
    }
]

const queueFrom8 = [
    {
        name: "Wake up",
        start: new Date(now - min(90)),
        end: new Date(now - min(30))
    },
    {
        ...DEF_GAP,
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    },
    {
        name: "Sleep",
        start: new Date(now + min(30)),
        end: new Date(now + min(90))
    }
]

const queueNodes8 = ["Wake up", "...", "Sleep"]
    .map(str => ({ name: str }))
    .map(createQueueElement)

// Task queue => [0, X, Y] ("...", T1, T2)
const schedule9 = [
    // {
    //     name: "Wake up",
    //     start: new Date(now - min(90)),
    //     end: new Date(now - min(30))
    // },
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    },
    {
        name: "Sleep",
        start: new Date(now + min(30)),
        end: new Date(now + min(90))
    }
]

const queueNodes9 = ["...", "Eat", "Sleep"]
    .map(str => ({ name: str }))
    .map(createQueueElement)

const queueFrom9 = [
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    },
    {
        name: "Sleep",
        start: new Date(now + min(30)),
        end: new Date(now + min(90))
    }
]

// Task queue => [0, X, 0] ("...", T1, "...")
const schedule10 = [
    // {
    //     name: "Wake up",
    //     start: new Date(now - min(90)),
    //     end: new Date(now - min(30))
    // },
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    },
    // {
    //     name: "Sleep",
    //     start: new Date(now + min(30)),
    //     end: new Date(now + min(90))
    // }
]

const queueFrom10 = [
    {
        name: "Eat",
        start: new Date(now - min(30)),
        end: new Date(now + min(30))
    }
]

const queueNodes10 = ["...", "Eat", "..."]
    .map(str => ({ name: str }))
    .map(createQueueElement)

function areSchedulesEqual(schedule1, schedule2) {
    if (schedule1.length !== schedule2.length) return false

    for (let i = 0; i < schedule1.length; i++) {
        if (!areTasksEqual(schedule1[i], schedule2[i])) return false
    }

    return true
}

function isNodeTextEqual(nodeList1, nodeList2) {
    if (nodeList1.length !== nodeList2.length) return false
    
    for (let i = 0; i < nodeList1.length; i++) {
        if (nodeList1[i].textContent !== nodeList2[i].textContent) return false
    }

    return true
}

// function testQueue(schedule) {
//     const taskQueue = getTaskQueue(schedule)
//     const currentTask = schedule[getCurrentTaskIndex(schedule, new Date())]

//     let eCount; let eList

//     if (areTasksEqual(currentTask, taskQueue[1])) {
    
//         // Case 1: [X, Y, 0]
//         if ()

//         // Case 2: [X, 0, Y]

//         // Case 3: [0, X, Y]
//     }

//     // Case 4: [0, X, 0]

//     return [eCount, eList]
// }

// From DeVry University - College of Engineering and Information Sciences
/* Unit Test - Do Not Change Code Below This Line *** *** *** *** *** *** *** *** *** */

function test() {
    let error_count = 0
    const error_list = []
    console.log("Unit Testing Starting---")

    /* validateSchedule() */

    // console.log("Testing missing tasks...")
    // try {
    //     validateSchedule(schedule1)
    //     error_count++
    //     error_list.push("Passed missing fields")
    // } catch (error) {
    //     console.log('Successful!')
    // }

    // console.log("Testing invalid tasks...")
    // try {
    //     validateSchedule(schedule2)
    //     error_count++
    //     error_list.push("Passed invalid fields")
    // } catch (error) {
    //     console.log('Successful!')
    // }

    // console.log("Testing overlap tasks...")
    // try {
    //     validateSchedule(schedule3)
    //     error_count++
    //     error_list.push("Passed overlapped timestamps")
    // } catch (error) {
    //     console.log('Successful!')
    // }

    // console.log("Testing end-before-start tasks...")
    // try {
    //     validateSchedule(schedule4)
    //     error_count++
    //     error_list.push("Passed tasks that end before they start")
    // } catch (error) {
    //     console.log('Successful!')
    // }

    // console.log("Testing duplicated tasks...")
    // try {
    //     validateSchedule(schedule5)
    //     error_count++
    //     error_list.push("Passed duplicated tasks")
    // } catch (error) {
    //     console.log('Successful!')
    // }

    // console.log("Testing reverse-ordered tasks...")
    // try {
    //     const t6 = validateSchedule(schedule6)
    //     console.log(t6)
    //     console.log('Successful!')
    // } catch (error) {
    //     error_count++
    //     error_list.push("Didn't pass unsorted tasks")
    // }

    /* getTaskQueue() */

    // console.log("Testing task queue [X, Y, 0]")
    // try {
    //     const t7 = getTaskQueue(schedule7)
    //     if (areSchedulesEqual(t7, queueFrom7)) {
    //         console.log(t7)
    //         console.log('Successful!')
    //     } else {
    //         error_count++
    //         error_list.push('Queue 7 [X, Y, 0] failed')
    //     }
    // } catch (error) {
    //     error_count++
    //     error_list.push(error)
    // }

    // console.log("Testing task queue [X, 0, Y]")
    // try {
    //     const t8 = getTaskQueue(schedule8)
    //     if (areSchedulesEqual(t8, queueFrom8)) {
    //         console.log(t8)
    //         console.log('Successful!')
    //     } else {
    //         error_count++
    //         error_list.push('Queue 8 [X, 0, Y] failed')
    //     }
    // } catch (error) {
    //     error_count++
    //     error_list.push(error)
    // }

    // console.log("Testing task queue [0, X, Y]")
    // try {
    //     const t9 = getTaskQueue(schedule9)
    //     if (areSchedulesEqual(t9, queueFrom9)) {
    //         console.log(t9)
    //         console.log('Successful!')
    //     } else {
    //         error_count++
    //         error_list.push('Queue 9 [0, X, Y] failed')
    //     }
    // } catch (error) {
    //     error_count++
    //     error_list.push(error)
    // }

    // console.log("Testing task queue [0, X, 0]")
    // try {
    //     const t10 = getTaskQueue(schedule10)
    //     if (areSchedulesEqual(t10, queueFrom10)) {
    //         console.log(t10)
    //         console.log('Successful!')
    //     } else {
    //         error_count++
    //         error_list.push('Queue 10 [0, X, 0] failed')
    //     }
    // } catch (error) {
    //     error_count++
    //     error_list.push(error)
    // }

    /* fillGapItems() and createQueueElement() */

    console.log("Testing task queue [X, Y, 0]")
    try {
        const nodes7 = fillGapItems(queueFrom7).map(createQueueElement)
        if (isNodeTextEqual(nodes7, queueNodes7)) {
            console.log('Successful!')
        } else {
            error_count++
            error_list.push('Queue 7 [X, Y, 0] failed')
        }
    } catch (error) {
        error_count++
        error_list.push(error)
    }

    console.log("Testing task queue [X, 0, Y]")
    try {
        const nodes8 = fillGapItems(queueFrom8).map(createQueueElement)
        if (isNodeTextEqual(nodes8, queueNodes8)) {
            console.log('Successful!')
        } else {
            error_count++
            error_list.push('Queue 8 [X, 0, Y] failed')
        }
    } catch (error) {
        error_count++
        error_list.push(error)
    }

    console.log("Testing task queue [0, X, Y]")
    try {
        const nodes9 = fillGapItems(queueFrom9).map(createQueueElement)
        if (isNodeTextEqual(nodes9, queueNodes9)) {
            console.log('Successful!')
        } else {
            error_count++
            error_list.push('Queue 9 [0, X, Y] failed')
        }
    } catch (error) {
        error_count++
        error_list.push(error)
    }

    console.log("Testing task queue [0, X, 0]")
    try {
        const nodes10 = fillGapItems(queueFrom10).map(createQueueElement)
        if (isNodeTextEqual(nodes10, queueNodes10)) {
            console.log('Successful!')
        } else {
            error_count++
            error_list.push('Queue 10 [0, X, 0] failed')
        }
    } catch (error) {
        error_count++
        error_list.push(error)
    }

    // Results
    if (error_count === 0) {
        console.log("Congratulations - All Tests Passed")
    } else {
        console.log("-=== Problem List - Please Fix ===-")
        error_list.forEach(e => console.error(e))
    }
    console.log("Done")
}

test()