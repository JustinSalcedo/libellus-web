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

const SATURDAY = "2022/11/5"
const SUNDAY = "2022/11/6"
const MONDAY = "2022/11/7"
const TUESDAY = "2022/11/8"
const WEDNESDAY = "2022/11/9"
const THURSDAY = "2022/11/10"
const FRIDAY = "2022/11/11"
// const SATURDAY = "2022/11/11"

const MY_SCHEDULE = [
    // Saturday (today)
    {
        name: "CT Discussion",
        start: new Date(`${SATURDAY} 20:00`),
        end: new Date(`${SATURDAY} 21:00`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${SATURDAY} 21:00`),
        end: new Date(`${SATURDAY} 22:00`)
    },
    {
        name: "IP Project",
        start: new Date(`${SATURDAY} 22:00`),
        end: new Date(`${SATURDAY} 23:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${SATURDAY} 23:00`),
        end: new Date(`${SUNDAY} 7:00`)
    },

    // Sunday
    {
        name: "CT Lab",
        start: new Date(`${SUNDAY} 7:00`),
        end: new Date(`${SUNDAY} 8:30`)
    },
    {
        name: "NSLS Induction",
        start: new Date(`${SUNDAY} 8:30`),
        end: new Date(`${SUNDAY} 10:00`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${SUNDAY} 10:00`),
        end: new Date(`${SUNDAY} 11:00`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${SUNDAY} 11:00`),
        end: new Date(`${SUNDAY} 12:00`)
    },
    {
        name: "Lunch",
        start: new Date(`${SUNDAY} 12:15`),
        end: new Date(`${SUNDAY} 12:30`)
    },
    {
        name: "Libellus API",
        start: new Date(`${SUNDAY} 12:30`),
        end: new Date(`${SUNDAY} 14:00`)
    },
    {
        name: "Shower",
        start: new Date(`${SUNDAY} 14:00`),
        end: new Date(`${SUNDAY} 15:00`)
    },
    {
        name: "IP Quizes",
        start: new Date(`${SUNDAY} 15:00`),
        end: new Date(`${SUNDAY} 15:15`)
    },
    {
        name: "Call",
        start: new Date(`${SUNDAY} 15:15`),
        end: new Date(`${SUNDAY} 15:30`)
    },
    {
        name: "Drive",
        start: new Date(`${SUNDAY} 15:30`),
        end: new Date(`${SUNDAY} 16:20`)
    },
    {
        name: "Aunt's visit",
        start: new Date(`${SUNDAY} 16:20`),
        end: new Date(`${SUNDAY} 18:20`)
    },
    {
        name: "Drive home",
        start: new Date(`${SUNDAY} 18:20`),
        end: new Date(`${SUNDAY} 19:00`)
    },
    {
        name: "Chat",
        start: new Date(`${SUNDAY} 19:30`),
        end: new Date(`${SUNDAY} 20:00`)
    },
    {
        name: "Call",
        start: new Date(`${SUNDAY} 21:00`),
        end: new Date(`${SUNDAY} 22:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${SUNDAY} 22:00`),
        end: new Date(`${MONDAY} 5:00`)
    },
    {
        name: "Get ready",
        start: new Date(`${MONDAY} 5:00`),
        end: new Date(`${MONDAY} 6:00`)
    },
    {
        name: "Work",
        start: new Date(`${MONDAY} 6:00`),
        end: new Date(`${MONDAY} 10:30`)
    },
    {
        name: "Intership call",
        start: new Date(`${MONDAY} 10:30`),
        end: new Date(`${MONDAY} 11:00`)
    },
    {
        name: "Work",
        start: new Date(`${MONDAY} 11:00`),
        end: new Date(`${MONDAY} 14:30`)
    },
    {
        name: "Drive",
        start: new Date(`${MONDAY} 14:30`),
        end: new Date(`${MONDAY} 15:00`)
    },
    {
        name: "Eat & Setup",
        start: new Date(`${MONDAY} 15:00`),
        end: new Date(`${MONDAY} 15:30`)
    },
    {
        name: "IP Reading",
        start: new Date(`${MONDAY} 15:30`),
        end: new Date(`${MONDAY} 16:00`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${MONDAY} 16:00`),
        end: new Date(`${MONDAY} 17:00`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${MONDAY} 17:00`),
        end: new Date(`${MONDAY} 18:00`)
    },
    {
        name: "CT Pre-test",
        start: new Date(`${MONDAY} 18:30`),
        end: new Date(`${MONDAY} 19:00`)
    },
    {
        name: "CT Knowledge Check",
        start: new Date(`${MONDAY} 19:00`),
        end: new Date(`${MONDAY} 20:30`)
    },
    {
        name: "Shower",
        start: new Date(`${MONDAY} 20:30`),
        end: new Date(`${MONDAY} 21:00`)
    },
    {
        name: "Libellus",
        start: new Date(`${MONDAY} 21:00`),
        end: new Date(`${MONDAY} 21:30`)
    },
    {
        name: "Setup",
        start: new Date(`${MONDAY} 21:30`),
        end: new Date(`${MONDAY} 22:00`)
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
        name: "Eat & Setup",
        start: new Date(`${TUESDAY} 15:00`),
        end: new Date(`${TUESDAY} 15:30`)
    },
    {
        name: "Update card",
        start: new Date(`${TUESDAY} 15:30`),
        end: new Date(`${TUESDAY} 16:30`)
    },
    {
        name: "Shopping (2)",
        start: new Date(`${TUESDAY} 16:30`),
        end: new Date(`${TUESDAY} 17:00`)
    },
    {
        name: "Shower",
        start: new Date(`${TUESDAY} 17:00`),
        end: new Date(`${TUESDAY} 17:30`)
    },
    {
        name: "IP Reading",
        start: new Date(`${TUESDAY} 17:45`),
        end: new Date(`${TUESDAY} 18:15`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${TUESDAY} 18:15`),
        end: new Date(`${TUESDAY} 19:15`)
    },
    {
        name: "CT Lab",
        start: new Date(`${TUESDAY} 19:30`),
        end: new Date(`${TUESDAY} 20:00`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${TUESDAY} 20:00`),
        end: new Date(`${TUESDAY} 21:00`)
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

    // Wednesday
    {
        name: "Get ready",
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
        name: "Eat & Setup",
        start: new Date(`${WEDNESDAY} 15:00`),
        end: new Date(`${WEDNESDAY} 15:30`)
    },
    {
        name: "NSLS Induction",
        start: new Date(`${WEDNESDAY} 15:30`),
        end: new Date(`${WEDNESDAY} 16:30`)
    },
    {
        name: "Debt Relief",
        start: new Date(`${WEDNESDAY} 16:30`),
        end: new Date(`${WEDNESDAY} 17:00`)
    },
    {
        name: "Shower",
        start: new Date(`${WEDNESDAY} 17:00`),
        end: new Date(`${WEDNESDAY} 17:30`)
    },
    {
        name: "CT Project",
        start: new Date(`${WEDNESDAY} 17:30`),
        end: new Date(`${WEDNESDAY} 18:30`)
    },
    {
        name: "CT Discussion",
        start: new Date(`${WEDNESDAY} 18:30`),
        end: new Date(`${WEDNESDAY} 19:30`)
    },
    {
        name: "IP Discussion",
        start: new Date(`${WEDNESDAY} 19:30`),
        end: new Date(`${WEDNESDAY} 20:30`)
    },
    {
        name: "Libellus",
        start: new Date(`${WEDNESDAY} 21:00`),
        end: new Date(`${WEDNESDAY} 21:30`)
    },
    {
        name: "Setup",
        start: new Date(`${WEDNESDAY} 21:30`),
        end: new Date(`${WEDNESDAY} 22:00`)
    },
    {
        name: "Sleep",
        start: new Date(`${WEDNESDAY} 22:00`),
        end: new Date(`${THURSDAY} 5:00`)
    },

    // Thursday
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // },
    // {
    //     name: "",
    //     start: new Date(`${}`),
    //     end: new Date(`${}`)
    // }
]