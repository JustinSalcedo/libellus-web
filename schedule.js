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

// const SATURDAY = "2022/11/5"
// const SUNDAY = "2022/11/6"
const MONDAY = "2022/11/14"
const TUESDAY = "2022/11/15"
const WEDNESDAY = "2022/11/16"
const THURSDAY = "2022/11/17"
//
const FRIDAY = "2022/11/11"
const SATURDAY = "2022/11/12"
const SUNDAY = "2022/11/13"

const MY_SCHEDULE = [

    // Sunday
    {
        name: "Setup",
        start: new Date(`${SUNDAY} 8:00`),
        end: new Date(`${SUNDAY} 8:15`)
    },
    {
        name: "Meditate",
        start: new Date(`${SUNDAY} 8:15`),
        end: new Date(`${SUNDAY} 8:30`)
    },
    {
        name: "Laundry",
        start: new Date(`${SUNDAY} 8:30`),
        end: new Date(`${SUNDAY} 8:45`)
    },
    {
        name: "Zeeth 0.0",
        start: new Date(`${SUNDAY} 8:45`),
        end: new Date(`${SUNDAY} 9:45`)
    },
    {
        name: "Breakfast",
        start: new Date(`${SUNDAY} 9:45`),
        end: new Date(`${SUNDAY} 10:00`)
    },
    {
        name: "Behind!",
        start: new Date(`${SUNDAY} 10:00`),
        end: new Date(`${SUNDAY} 11:00`)
    },
    {
        name: "Libellus",
        start: new Date(`${SUNDAY} 11:00`),
        end: new Date(`${SUNDAY} 12:45`)
    },
    {
        name: "Laundry*",
        start: new Date(`${SUNDAY} 12:45`),
        end: new Date(`${SUNDAY} 13:00`)
    },
    {
        name: "IP Active Reading",
        start: new Date(`${SUNDAY} 13:00`),
        end: new Date(`${SUNDAY} 13:30`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${SUNDAY} 13:45`),
        end: new Date(`${SUNDAY} 14:30`)
    },
    {
        name: "CT Knowledge check",
        start: new Date(`${SUNDAY} 14:30`),
        end: new Date(`${SUNDAY} 16:00`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${SUNDAY} 16:00`),
        end: new Date(`${SUNDAY} 17:00`)
    },
    {
        name: "Shower",
        start: new Date(`${SUNDAY} 17:00`),
        end: new Date(`${SUNDAY} 18:00`)
    },
    {
        name: "Tickets",
        start: new Date(`${SUNDAY} 18:30`),
        end: new Date(`${SUNDAY} 19:00`)
    },
    {
        name: "Go to bed",
        start: new Date(`${SUNDAY} 19:00`),
        end: new Date(`${MONDAY} 5:00`)
    },

    // Monday
    {
        name: "Get ready",
        start: new Date(`${MONDAY} 5:00`),
        end: new Date(`${MONDAY} 6:00`)
    },
    {
        name: "Work",
        start: new Date(`${MONDAY} 6:00`),
        end: new Date(`${MONDAY} 8:00`)
    },
    {
        name: "IP Knowledge Check",
        start: new Date(`${MONDAY} 8:00`),
        end: new Date(`${MONDAY} 8:15`)
    },
    {
        name: "Work",
        start: new Date(`${MONDAY} 8:15`),
        end: new Date(`${MONDAY} 14:30`)
    },
    {
        name: "Drive",
        start: new Date(`${MONDAY} 14:30`),
        end: new Date(`${MONDAY} 15:00`)
    },
    {
        name: "Nap",
        start: new Date(`${MONDAY} 15:00`),
        end: new Date(`${MONDAY} 15:30`)
    },
    {
        name: "Eat & Setup",
        start: new Date(`${MONDAY} 15:30`),
        end: new Date(`${MONDAY} 15:45`)
    },
    {
        name: "Check email",
        start: new Date(`${MONDAY} 15:45`),
        end: new Date(`${MONDAY} 16:00`)
    },
    {
        name: "Call DMV",
        start: new Date(`${MONDAY} 16:00`),
        end: new Date(`${MONDAY} 16:30`)
    },
    {
        name: "Call Aerotek",
        start: new Date(`${MONDAY} 16:30`),
        end: new Date(`${MONDAY} 17:30`)
    },
    {
        name: "FAFSA Form",
        start: new Date(`${MONDAY} 17:30`),
        end: new Date(`${MONDAY} 18:00`)
    },
    {
        name: "CT Lab",
        start: new Date(`${MONDAY} 18:00`),
        end: new Date(`${MONDAY} 18:45`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${MONDAY} 19:00`),
        end: new Date(`${MONDAY} 20:00`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${MONDAY} 20:00`),
        end: new Date(`${MONDAY} 21:00`)
    },
    {
        name: "Dinner & Setup",
        start: new Date(`${MONDAY} 21:00`),
        end: new Date(`${MONDAY} 21:30`)
    },
    {
        name: "Sleep",
        start: new Date(`${MONDAY} 22:00`),
        end: new Date(`${TUESDAY} 5:00`)
    },

    // Tuesday
    {
        name: "Get ready",
        start: new Date(`${TUESDAY} 5:00`),
        end: new Date(`${TUESDAY} 6:00`)
    },
    {
        name: "Work",
        start: new Date(`${TUESDAY} 6:00`),
        end: new Date(`${TUESDAY} 14:30`)
    },
    {
        name: "Drive",
        start: new Date(`${TUESDAY} 14:30`),
        end: new Date(`${TUESDAY} 15:00`)
    },
    {
        name: "Nap",
        start: new Date(`${TUESDAY} 15:00`),
        end: new Date(`${TUESDAY} 15:30`)
    },
    {
        name: "Eat & Setup",
        start: new Date(`${TUESDAY} 15:30`),
        end: new Date(`${TUESDAY} 15:45`)
    },
    {
        name: "Check email",
        start: new Date(`${TUESDAY} 15:45`),
        end: new Date(`${TUESDAY} 16:00`)
    },
    {
        name: "Call immigration",
        start: new Date(`${TUESDAY} 16:00`),
        end: new Date(`${TUESDAY} 16:30`)
    },
    {
        name: "IP Project",
        start: new Date(`${TUESDAY} 17:00`),
        end: new Date(`${TUESDAY} 18:15`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${TUESDAY} 18:15`),
        end: new Date(`${TUESDAY} 18:45`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${TUESDAY} 19:00`),
        end: new Date(`${TUESDAY} 19:30`)
    },
    {
        name: "Libellus",
        start: new Date(`${TUESDAY} 20:00`),
        end: new Date(`${TUESDAY} 20:45`)
    },
    {
        name: "Setup",
        start: new Date(`${TUESDAY} 21:30`),
        end: new Date(`${TUESDAY} 22:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${TUESDAY} 22:00`),
        end: new Date(`${WEDNESDAY} 5:00`)
    },
    {
        name: "Get Ready",
        start: new Date(`${WEDNESDAY} 5:00`),
        end: new Date(`${WEDNESDAY} 6:00`)
    },
    {
        name: "Work",
        start: new Date(`${WEDNESDAY} 6:00`),
        end: new Date(`${WEDNESDAY} 14:30`)
    },
    {
        name: "Drive",
        start: new Date(`${WEDNESDAY} 14:30`),
        end: new Date(`${WEDNESDAY} 15:00`)
    },
    {
        name: "Nap",
        start: new Date(`${WEDNESDAY} 15:00`),
        end: new Date(`${WEDNESDAY} 15:30`)
    },
    {
        name: "Eat & Setup",
        start: new Date(`${WEDNESDAY} 15:30`),
        end: new Date(`${WEDNESDAY} 15:45`)
    },
    {
        name: "Check email",
        start: new Date(`${WEDNESDAY} 15:45`),
        end: new Date(`${WEDNESDAY} 16:00`)
    },
    // {
    //     name: "",
    //     start: new Date(`${WEDNESDAY} `),
    //     end: new Date(`${WEDNESDAY} `)
    // },
    // {
    //     name: "",
    //     start: new Date(`${WEDNESDAY} `),
    //     end: new Date(`${WEDNESDAY} `)
    // },
]