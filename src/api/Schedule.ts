import { ITask } from "../types";
import APIHandler from "./APIHandler";

export default class Schedule extends APIHandler {
    constructor(userId: string, errorHandler?: (errorMsg: string) => void) {
        super(userId, errorHandler)
        this.apiUrl = this.serverUrl + '/schedule'
    }

    public async Get(): Promise<ITask[]> {
        const { schedule: rawSchedule } = await this.requestData('GET') as { schedule: ITask[] }
        return rawSchedule.map(this.parseDates)
    }

    public async Create(tasks: ITask[]): Promise<ITask[]> {
        const bodyData = JSON.stringify({ schedule: tasks })
        
        const { schedule: rawSchedule } = await this.requestData('POST', '', bodyData, 201) as { schedule: ITask[] }
        return rawSchedule.map(this.parseDates)
    }
}