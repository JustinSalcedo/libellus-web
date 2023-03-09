import { createContext } from "react";
import { ITask, ModalName, ScheduleRangeSettings, Settings } from "../types";

export const ViewContext = createContext({
    isModalOn: false,
    launchModal: (value: boolean) => {},
    activeModal: '',
    setActiveModal: (modalName: ModalName) => {}
})

export const SettingsContext = createContext({
    scheduleRange: null as ScheduleRangeSettings,
    setSettings: (settings: Settings) => {}
})

export const ScheduleContext = createContext({
    schedule: [] as ITask[],
    setSchedule: (schedule: ITask[]) => {},
    refreshSchedule: () => {}
})