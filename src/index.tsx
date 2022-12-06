import React from "react"
import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container)

const Holi = () => {
    return (
        <h1>
            Holi XD
        </h1>
    )
}

root.render(<Holi/>)