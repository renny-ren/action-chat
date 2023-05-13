import React, { useState, useEffect } from "react"
import Routes from "../routes"
import { AppContext } from "./AppContext"
import consumer from "channels/consumer"
import LoginModal from "./user/LoginModal"

const App = (props) => {
  const [subscribers, setSubscribers] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    subscribeAppearanceChannel()
  }, [])

  const subscribeAppearanceChannel = () => {
    const channel = consumer.subscriptions.create("AppearancesChannel", {
      received: (data) => {
        setSubscribers(data.subscribers)
      },
      connected() {
        // Called when the subscription is ready for use on the server
      },
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    })
    return channel
  }

  return (
    <AppContext.Provider value={{ setShowLoginModal, subscribers }}>
      <div className="h-full">
        <Routes />
      </div>
      <LoginModal isShow={showLoginModal} />
    </AppContext.Provider>
  )
}
export default App
