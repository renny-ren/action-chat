import React, { useState, useEffect } from "react"
import Routes from "../routes"
import { AppContext } from "./AppContext"
import consumer from "channels/consumer"
import LoginModal from "./user/LoginModal"

const App = (props) => {
  const [appearanceChannel, setAppearanceChannel] = useState()
  const [subscribers, setSubscribers] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    subscribeAppearanceChannel()
  }, [])

  const subscribeAppearanceChannel = () => {
    // HACK: prevent creating multiple subscriptions for a consumer.
    // console.log("----", consumer.subscriptions.subscriptions)
    // if (consumer.subscriptions.subscriptions.length != 0) {
    //   consumer.subscriptions.subscriptions[0].unsubscribe()
    // }
    const channel = consumer.subscriptions.create("AppearancesChannel", {
      received: (data) => {
        console.log("==received=11=", data)
        setSubscribers(data.subscribers)
      },
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("==connected==")
        // if (appearanceChannel) appearanceChannel.send({ type: "appearance" })
      },
      disconnected() {
        // Called when the subscription has been terminated by the server
        console.log("==disconnected==")
      },
    })
    setAppearanceChannel(channel)
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
