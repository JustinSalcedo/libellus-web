import React, { ReactNode, useState } from "react"
import FloatingButton from "../../components/FloatingButton"
import Modal from "../../components/Modal"
import { ViewContext } from "../../contexts"
import styles from './Minimal.module.css'

export default function Minimal({ children }: { children: ReactNode }) {
    // const [modalOn, setModalOn] = useState(false)
    const [modalOn, setModalOn] = useState(true)
    const [activeModal, setActiveModal] = useState('settings')

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
            <div className={styles.screen}>
                {children}
            </div>
        </ViewContext.Provider>
    )
}