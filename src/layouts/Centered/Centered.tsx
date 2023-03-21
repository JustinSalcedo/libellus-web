import { ReactNode, useContext } from "react";
import { SettingsContext } from "../../contexts";
import styles from './Centered.module.css'

export default function Centered({ children }: { children: ReactNode }) {
    const { getTheme } = useContext(SettingsContext)
    
    return (
        <div className={`${styles.screen} ${styles['theme-' + getTheme()]}`}>{children}</div>
    )
}