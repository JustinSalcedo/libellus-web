import { createContext } from "react";
import { ITask, ModalName, ScheduleRangeSettings, Settings, Theme } from "../types";

export const ViewContext = createContext({
    isModalOn: false,
    launchModal: (value: boolean) => {},
    activeModal: '',
    setActiveModal: (modalName: ModalName) => {}
})

export const SettingsContext = createContext({
    scheduleRange: null as ScheduleRangeSettings,
    setSettings: (settings: Settings) => {},
    theme: 'system' as Theme,
    getTheme: () => 'system' as Theme,
    setTheme: (theme: Theme) => {}
})

export const ScheduleContext = createContext({
    schedule: [] as ITask[],
    setSchedule: (schedule: ITask[]) => {},
    refreshSchedule: (loadOnly?: boolean) => {}
})