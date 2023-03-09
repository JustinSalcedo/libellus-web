import React, { useContext, useState } from "react"
import { ScheduleContext, ViewContext } from "../../contexts"
import styles from "./FloatingButton.module.css"

export default function FloatingButton() {
    const { setActiveModal, launchModal } = useContext(ViewContext)
    const { refreshSchedule } = useContext(ScheduleContext)
    const [clicks, setClicks] = useState(3)

    function handleClickOnArea() {
        if (clicks < 3) setClicks(clicks => clicks + 1)
    }

    function handleClickOnPlus() {
        setActiveModal('schedule-form')
        launchModal(true)
        setClicks(0)
    }

    function handleClickOnReload() {
        refreshSchedule()
        setClicks(0)
    }

    function handleClickOnGear() {
        setActiveModal('settings')
        launchModal(true)
        setClicks(0)
    }

    return (
        <div className={styles.tray}>
            <div className={styles.area} onClick={handleClickOnArea}>
                {clicks > 2 ? <div className={styles.circle} onClick={handleClickOnPlus}><span>+</span></div> : ''}
            </div>
            <div className={styles.area}>
                {clicks > 2 ? <div className={styles.circle} onClick={handleClickOnReload}><span style={{ height: '6rem' }}>⟳</span></div> : ''}
            </div>
            <div className={styles.area}>
                {clicks > 2 ? <div className={styles.circle} onClick={handleClickOnGear}><span style={{ fontSize: '3rem', height: '4.75rem' }}>⚙</span></div> : ''}
            </div>
        </div>
    )
}