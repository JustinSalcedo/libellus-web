const API_URL = window.localStorage.getItem('apiurl')

const getUserId = () => window.localStorage.getItem('userid')

function getError(data) {
    return data.errors
}

async function setScheduleForLb(schedule) {
    try {
        await removeScheduleFromLb()
        return addScheduleToLb(schedule)
    } catch (error) {
        console.error(error)
    }
}

async function addScheduleToLb(schedule) {
    const userid = getUserId()
    if (!userid) return console.warn('No user ID provided')
    if (!API_URL) return console.error('No API URL set')
    try {
        const response = await fetch(API_URL + 'schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                userid
            },
            body: JSON.stringify({ schedule })
        })
        const data = await response.json()
        if (response.status !== 201) {
            const { message } = getError(data)
            throw new Error(message)
        }
        return data.schedule
    } catch (error) {
        console.error(error)
    }
}

async function removeScheduleFromLb() {
    const userid = getUserId()
    if (!userid) return console.warn('No user ID provided')
    if (!API_URL) return console.error('No API URL set')
    try {
        const response = await fetch(API_URL + 'task/all', {
            method: 'DELETE',
            headers: {
                userid
            }
        })
        const data = await response.json()
        if (response.status !== 200) {
            const { message } = getError(data)
            throw new Error(message)
        }
        return data.deletedCount
    } catch (error) {
        console.error(error)
    }
}