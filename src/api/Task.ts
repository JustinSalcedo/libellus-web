import { ITask } from "../types";
import APIHandler from "./APIHandler";

export default class Task extends APIHandler {
    constructor(userId: string, errorHandler?: (errorMsg: string) => void) {
        super(userId, errorHandler)
        this.apiUrl = this.serverUrl + '/task'
    }

    public async Edit(id: string, task: Partial<ITask>): Promise<boolean> {
        const body = JSON.stringify(task)

        return this.requestStatus('PUT', `/${id}`, body)
    }

    public async Delete(id: string): Promise<boolean> {
        return this.requestStatus('DELETE', `/${id}`)
    }

    public async DeleteMany(ids: string[]): Promise<number> {
        const body = JSON.stringify({ ids })

        const data = await this.requestData('DELETE', '', body)
        return this.getDeletedCount(data)
    }

    public async DeleteAll(): Promise<number> {
        const data = await this.requestData('DELETE', '/all')
        return this.getDeletedCount(data)
    }

    private getDeletedCount({ deletedCount, originalCount }: { deletedCount: number, originalCount: number }) {
        if (this.errorHandler && deletedCount !== originalCount) this.errorHandler('Warning: Not all the items were deleted')
        return deletedCount
    }
}