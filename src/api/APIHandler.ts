import { BASE_URL } from "../constants"
import { ITask } from "../types"

export default class APIHandler {
    protected serverUrl = BASE_URL
    protected apiUrl: string
    protected userId: string
    protected errorHandler?: (errorMsg: string) => void

    constructor(userId: string, errorHandler?: (errorMsg: string) => void) {
        this.userId = userId
        this.apiUrl = this.serverUrl
        if (errorHandler) this.errorHandler = errorHandler
        if (!(this.apiUrl && this.userId)) throw new Error("Unable to connect to server");
    }

    protected getError(payload: { errors: any }) {
        // from jg-ui/src/api/Client.ts
        return payload.errors
    }

    protected parseDates(task: ITask): ITask {
        return { ...task, start: new Date(task.start), end: new Date(task.end) }
    }

    private async request(method: string, entryPoint?: string, body?: BodyInit) {
        const requestOptions: RequestInit = {
            method, mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'userid': this.userId
            }
        }

        if (body) requestOptions.body = body
        const url = this.apiUrl + (entryPoint || '')

        try {
            return fetch(url, requestOptions)
        } catch (error) {
            if (this.errorHandler) this.errorHandler(error.toString())
        }
    }

    protected async requestStatus(method: string, entryPoint?: string, body?: BodyInit, status?: number) {
        try {
            const response = await this.request(method, entryPoint, body)
            if (response.status !== (status || 200)) {
                const data = await response.json()
                const { message }: Error = this.getError(data)
                throw new Error(message)
            }
            return true
        } catch (error) {
            if (this.errorHandler) this.errorHandler(error.toString())
        }
    }

    protected async requestData(method: string, entryPoint?: string, body?: BodyInit, status?: number) {
        try {
            const response = await this.request(method, entryPoint, body)
            const data = await response.json()
            if (response.status !== (status || 200)) {
                const { message }: Error = this.getError(data)
                throw new Error(message)
            }
            return data
        } catch (error) {
            if (this.errorHandler) this.errorHandler(error.toString())
        }
    }
}