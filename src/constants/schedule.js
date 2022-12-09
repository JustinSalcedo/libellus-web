// const task = {
//     name: "Homework",
//     start: new Date(`${TODAY} 14:00`),
//     end: new Date(`${TODAY} 15:00`)
// }


// {
//     name: "",
//     start: new Date(`${}`),
//     end: new Date(`${}`)
// },

const SATURDAY = "2022/12/03"
const SUNDAY = "2022/12/04"
const MONDAY = "2022/12/05"
const TUESDAY = "2022/12/06"
const WEDNESDAY = "2022/12/07"
const THURSDAY = "2022/12/08"
const FRIDAY = "2022/12/09"
// const SATURDAY = "2022/12/10"
// const SUNDAY = "2022/12/11"

const MY_SCHEDULE = [
    {
        name: "Libellus",
        start: new Date(`${WEDNESDAY} 23:30`),
        end: new Date(`${WEDNESDAY} 23:45`),
    },
    {
        name: "Sleep",
        start: new Date(`${WEDNESDAY} 23:45`),
        end: new Date(`${THURSDAY} 6:45`),
    },

    // Monday
    {
        name: "Work",
        start: new Date(`${THURSDAY} 7:00`),
        end: new Date(`${THURSDAY} 13:15`)
    },
    {
        name: "Unload cardboard",
        start: new Date(`${THURSDAY} 13:15`),
        end: new Date(`${THURSDAY} 13:30`)
    },
    {
        name: "Call uncle",
        start: new Date(`${THURSDAY} 13:30`),
        end: new Date(`${THURSDAY} 13:45`)
    },
    {
        name: "Libellus refactor",
        start: new Date(`${THURSDAY} 14:00`),
        end: new Date(`${THURSDAY} 16:00`)
    },
    {
        name: "Printer setup",
        start: new Date(`${THURSDAY} 16:00`),
        end: new Date(`${THURSDAY} 16:30`)
    },
    {
        name: "Shower",
        start: new Date(`${THURSDAY} 16:30`),
        end: new Date(`${THURSDAY} 17:30`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${THURSDAY} 17:30`),
        end: new Date(`${THURSDAY} 18:30`)
    },
    {
        name: "CT Knowledge",
        start: new Date(`${THURSDAY} 18:30`),
        end: new Date(`${THURSDAY} 19:30`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${THURSDAY} 19:30`),
        end: new Date(`${THURSDAY} 20:30`)
    },
    // {
    //     name: "Libellus server",
    //     start: new Date(`${THURSDAY} `),
    //     end: new Date(`${THURSDAY} `)
    // },
    {
        name: "Plan SNT",
        start: new Date(`${THURSDAY} 20:30`),
        end: new Date(`${THURSDAY} 21:30`)
    },
    {
        name: "Libellus",
        start: new Date(`${THURSDAY} 21:30`),
        end: new Date(`${THURSDAY} 21:45`)
    },
    {
        name: "Setup",
        start: new Date(`${THURSDAY} 21:45`),
        end: new Date(`${THURSDAY} 22:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${THURSDAY} 22:00`),
        end: new Date(`${FRIDAY} 6:45`)
    },
]

export default MY_SCHEDULE