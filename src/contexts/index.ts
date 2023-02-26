import { createContext } from "react";
import { ITask } from "../types";

export const ViewContext = createContext({
    isModalOn: false,
    launchModal: (value: boolean) => {},
    activeModal: '',
    setActiveModal: (modalName: string) => {}
})

export const ScheduleContext = createContext({
    schedule: [] as ITask[],
    setSchedule: (schedule: ITask[]) => {},
    refreshSchedule: () => {}
})