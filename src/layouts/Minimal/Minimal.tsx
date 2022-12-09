import React, { ReactNode, useState } from "react"
import Modal from "../../components/Modal"
import { ViewContext } from "../../contexts"
import styles from './Minimal.module.css'

export default function Minimal({ children }: { children: ReactNode }) {
    const [modalOn, setModalOn] = useState(false)
    const [activeModal, setActiveModal] = useState('')

    function handleOnClick() {
        setModalOn(false)
    }
    
    return (
        <ViewContext.Provider value={{
            isModalOn: modalOn, launchModal: setModalOn, activeModal, setActiveModal
        }}>
            <div className={styles.overlay + ' ' + (modalOn ? styles.on : '')} onClick={handleOnClick}></div>
            <Modal nodeKey="task-history"/>
            <div className={styles.screen}>
                {children}
            </div>
        </ViewContext.Provider>
    )
}