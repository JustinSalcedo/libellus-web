import React, { useContext, useState } from "react"
import { ViewContext } from "../../contexts"
import styles from "./FloatingButton.module.css"

export default function FloatingButton() {
    const { setActiveModal, launchModal } = useContext(ViewContext)
    const [clicks, setClicks] = useState(0)

    function handleClickOnArea() {
        if (clicks < 3) setClicks(clicks => clicks + 1)
    }

    function handleClickOnButton() {
        setActiveModal('schedule-form')
        launchModal(true)
        setClicks(0)
    }

    return (
        <div className={styles.area} onClick={handleClickOnArea}>
            {clicks > 2 ? <div className={styles.circle} onClick={handleClickOnButton}><span>+</span></div> : ''}
        </div>
    )
}