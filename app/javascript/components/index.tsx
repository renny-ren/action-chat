import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import App from "./App"

const renderApp = () => {
  const newDiv = document.createElement("div")
  newDiv.classList.add("h-full")
  newDiv.setAttribute("id", "main-container")
  const root = createRoot(document.body.appendChild(newDiv))
  root.render(<App />)
}

document.addEventListener("turbo:load", () => {
  renderApp()
})
