import React, { useContext } from "react"
import { ViewContext } from "../../contexts"
// import ScheduleForm from "../ScheduleForm"
import TaskHistory from "../TaskHistory"
import TaskListPrompt from "../TaskListPrompt"
import styles from "./Modal.module.css"

interface IComponent {
    node?: React.ReactNode
    heading: string
}

const COMPONENTS: { [key: string]: IComponent } = {
    "task-history": {
        node: <TaskHistory />,
        heading: "Task history"
    },
    "schedule-form": {
        // node: <ScheduleForm />,
        node: <TaskListPrompt />,
        heading: "Add new schedule"
    },
    "schedule-created": {
        heading: "Schedule created!"
    }
}

export default function Modal({ heading, nodeKey, children }: { heading?: string, nodeKey?: string, children?: React.ReactNode }) {
    const { isModalOn, launchModal } = useContext(ViewContext)

    function renderHeading() {
        if (!(nodeKey || heading)) return ''

        return COMPONENTS[nodeKey].heading || heading
    }

    function renderBody() {
        if (!(nodeKey || children)) return ''

        return COMPONENTS[nodeKey].node || children
    }

    return (
        <div className={styles.modal + ' ' + (isModalOn ? styles.on : '')}>
            <div className={styles['modal-header']}>{renderHeading()}</div>
            <div className="modal-body">{renderBody()}</div>
        </div>
    )
}