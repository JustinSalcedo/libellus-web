import { ChangeEvent, useContext, useEffect } from 'react'
import { SettingsContext } from '../../contexts'
import ScheduleForm from '../ScheduleForm'
import TaskListPrompt from '../TaskListPrompt'
import styles from './ScheduleEditor.module.css'

export default function ScheduleEditor () {
    const { editor, setEditor, setSettings } = useContext(SettingsContext)

    useEffect(() => {
        return setSettings({ editor })
    })

    function onEditorRadioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setEditor(value as 'form' | 'prompt')
    }

    return (
        <>
            <div className={styles.spacer}>
                <div>
                    <input type="radio" name="editor" id='form' onChange={onEditorRadioChange}
                        value='form' checked={editor === 'form'} />
                    <label htmlFor="form">Form</label>
                </div>
                <div>
                    <input type="radio" name="editor" id='prompt' onChange={onEditorRadioChange}
                        value='prompt' checked={editor === 'prompt'} />
                    <label htmlFor="prompt">Prompt</label>
                </div>
            </div>
            {editor === 'form' ? <ScheduleForm /> : <TaskListPrompt /> }
        </>
    )
}