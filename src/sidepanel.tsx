import React from "react"
import { render } from "react-dom"

import SidePanelIndex from "./sidepanel/index"

import "./style.css"

// Create a div to render into
const container = document.createElement("div")
container.id = "__plasmo-side-panel"
document.body.appendChild(container)

// Render the side panel
render(<SidePanelIndex />, container)
