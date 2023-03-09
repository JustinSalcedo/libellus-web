import React, { ReactNode, useContext, useState } from "react"
import FloatingButton from "../../components/FloatingButton"
import Modal from "../../components/Modal"
import { SettingsContext, ViewContext } from "../../contexts"
import { ModalName } from "../../types"
import styles from './Minimal.module.css'

export default function Minimal({ children }: { children: ReactNode }) {
    const { getTheme } = useContext(SettingsContext)

    const [modalOn, setModalOn] = useState(false)
    const [activeModal, setActiveModal] = useState('' as ModalName)

    function handleOnClick() {
        setModalOn(false)
        setActiveModal('')
    }
    
    return (
        <ViewContext.Provider value={{
            isModalOn: modalOn, launchModal: setModalOn, activeModal, setActiveModal
        }}>
            <div className={styles.overlay + ' ' + (modalOn ? styles.on : '')} onClick={handleOnClick}></div>
            <Modal nodeKey={activeModal}/>
            <FloatingButton />
            <div className={`${styles.screen} ${styles['theme-' + getTheme()]}`}>
                {children}
            </div>
        </ViewContext.Provider>
    )
}