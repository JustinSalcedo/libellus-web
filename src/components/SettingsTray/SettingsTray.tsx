import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { SettingsContext } from '../../contexts'
import { Theme } from '../../types'
import styles from './SettingsTray.module.css'

export default function SettingsTray() {
	const { scheduleRange, setSettings, theme, setTheme, getTheme } = useContext(SettingsContext)

    const [dateRange, setDateRange] = useState(scheduleRange.dateRange)
	const [startDate, setStartDate] = useState(scheduleRange.startDate)
	const [endDate, setEndDate] = useState(scheduleRange.endDate)

    const [note, setNote] = useState('')
	const [noteCode, setNoteCode] = useState('schedule-range')

	useEffect(() => {
		return saveSettings()
	})

    function onDateRadioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setDateRange(value as 'today' | 'custom')
    }

	function onDateChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		if (name === "start") setStartDate(() => {
			const newStartDate = new Date(value)
			if (endDate <= newStartDate) triggerNote('Invalid date range', 'schedule-range')
			else triggerNote('', '')
			return newStartDate
		})
		if (name === "end") setEndDate(() => {
			const newEndDate = new Date(value)
			if (newEndDate <= startDate) triggerNote('Invalid date range', 'schedule-range')
			else triggerNote('', '')
			return newEndDate
		})
	}

	function onThemeRadioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setTheme(value as Theme)
	}

	function saveSettings() {
		// Schedule
		if (dateRange && startDate && endDate && (endDate > startDate) && theme) {
			setSettings({ schedule: { dateRange, startDate, endDate }, theme })
		}
	}

	function triggerNote(note: string, noteCode: string) {
		setNote(note); setNoteCode(noteCode)
	}

    return (
        <>
            <div className={`${styles.container} ${styles['theme-' + getTheme()]}`}>
                <h3>Schedule</h3>
                <div>
                    <p>Timeline date range</p>
                    <div className={styles.spacer}>
                        <div>
                            <input type="radio" name="date-range" id='today' onChange={onDateRadioChange}
                                value='today' checked={dateRange === 'today'} />
                            <label htmlFor="today">Today</label>
                        </div>
                        <div>
                            <input type="radio" name="date-range" id='custom' onChange={onDateRadioChange}
                                value='custom' checked={dateRange === 'custom'} />
                            <label htmlFor="custom">Custom</label>
                        </div>
                    </div>
                    { dateRange === 'custom' ? (<>
						{(note && noteCode === 'schedule-range') ? <div className={styles["note-area"]}>{note}</div> : ''}
						<div className={styles.flexer}>
							<div className={styles.half}>
								<label htmlFor="start">Start at</label>
								<input type="datetime-local" name="start" onChange={onDateChange} value={getLocalDatetime(startDate)} />
							</div>
							<div className={styles.half}>
								<label htmlFor="end">End at</label>
								<input type="datetime-local" name="end" onChange={onDateChange} value={getLocalDatetime(endDate)} />
							</div>
						</div>
					</>) : '' }
                </div>
				<h3>Appearance</h3>
				<div>
					<p>Theme</p>
					<div className={styles.spacer}>
						<div>
							<input type="radio" name="theme" id="light" onChange={onThemeRadioChange}
									value='light' checked={theme === 'light'} />
							<label htmlFor="light">Light</label>
						</div>
						<div>
							<input type="radio" name="theme" id="dark" onChange={onThemeRadioChange}
									value='dark' checked={theme === 'dark'} />
							<label htmlFor="dark">Dark</label>
						</div>
						<div>
							<input type="radio" name="theme" id="system" onChange={onThemeRadioChange}
									value='system' checked={theme === 'system'} />
							<label htmlFor="system">System</label>
						</div>
					</div>
				</div>
            </div>
        </>
    )
}

function getLocalDatetime(date: Date) {
	const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
	const dateNum = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
	const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
	const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
	return `${date.getFullYear()}-${month}-${dateNum}T${hour}:${minute}`
}