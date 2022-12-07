import React, { ReactNode } from "react"
import styles from './Minimal.module.css'

export default function Minimal({ children }: { children: ReactNode }) {
    return (
        <div className={styles.screen}>
            {children}
        </div>
    )
}