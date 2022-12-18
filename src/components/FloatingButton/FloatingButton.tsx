import React, { useContext } from "react"
import { ViewContext } from "../../contexts"
import styles from "./FloatingButton.module.css"

export default function FloatingButton() {
    const { setActiveModal, launchModal } = useContext(ViewContext)

    function handleOnClick() {
        setActiveModal('schedule-form')
        launchModal(true)
    }

    return (
        <div className={styles.area} onClick={handleOnClick}>
            <div className={styles.circle}><span>+</span></div>
        </div>
    )
}