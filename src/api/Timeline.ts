import { ITask } from "../types";
import APIHandler from "./APIHandler";

export default class Timeline extends APIHandler {
    constructor(userId: string, errorHandler?: (errorMsg: string) => void) {
        super(userId, errorHandler)
        this.apiUrl = this.serverUrl + '/timeline'
    }

    public async GetByDateRange(start: Date, end: Date): Promise<ITask[]> {
        const { timeline: rawTimeline } = await this.requestData('GET', `?start=${start.toJSON()}&end=${end.toJSON()}`) as { timeline: ITask[] }
        return rawTimeline.map(this.parseDates)
    }
}