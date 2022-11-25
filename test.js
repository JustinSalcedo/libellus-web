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

// From DeVry University College of Engineering and Information Sciences
/* Unit Test - Do Not Change Code Below This Line *** *** *** *** *** *** *** *** *** */

function test() {
    let error_count = 0
    const error_list = []
    console.log("Unit Testing Starting---")

    /* validateSchedule() */

    console.log("Testing missing tasks...")
    try {
        validateSchedule(schedule1)
        error_count++
        error_list.push("Passed missing fields")
    } catch (error) {
        console.log('Successful!')
    }

    console.log("Testing invalid tasks...")
    try {
        validateSchedule(schedule2)
        error_count++
        error_list.push("Passed invalid fields")
    } catch (error) {
        console.log('Successful!')
    }

    console.log("Testing overlap tasks...")
    try {
        validateSchedule(schedule3)
        error_count++
        error_list.push("Passed overlapped timestamps")
    } catch (error) {
        console.log('Successful!')
    }

    console.log("Testing end-before-start tasks...")
    try {
        validateSchedule(schedule4)
        error_count++
        error_list.push("Passed tasks that end before they start")
    } catch (error) {
        console.log('Successful!')
    }

    console.log("Testing duplicated tasks...")
    try {
        validateSchedule(schedule5)
        error_count++
        error_list.push("Passed duplicated tasks")
    } catch (error) {
        console.log('Successful!')
    }

    console.log("Testing reverse-ordered tasks...")
    try {
        const t6 = validateSchedule(schedule6)
        console.log(t6)
        console.log('Successful!')
    } catch (error) {
        error_count++
        error_list.push("Didn't pass unsorted tasks")
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