import React, { Fragment, useState, useEffect, useRef } from "react"
import MessageList from "./MessageList"
import Footer from "./Footer"
import consumer from "channels/consumer"
import { Helmet } from "react-helmet"
import type { ChatMessage } from "./types"
import { message, Tooltip } from "antd"
import * as UserApi from "shared/api/user"

interface ChatRoomProps {}

const ChatRoom: React.FC<ChatRoomProps> = ({}) => {
  const messagesRef = useRef()
  const [messages, setMessages] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [pagination, setPagination] = useState({})
  const [subscribers, setSubscribers] = useState([])
  const [content, setContent] = useState("")
  const [chatChannel, setChatChannel] = useState()

  messagesRef.current = messages

  useEffect(() => {
    const channel = subscribeChatChannel()
    setChatChannel(channel)
  }, [])

  useEffect(() => {
    fetchMessages()
    return () => {
      consumer.disconnect()
    }
  }, [])

  const subscribeChatChannel = () => {
    // HACK: prevent creating multiple subscriptions for a consumer.
    // if (consumer.subscriptions.subscriptions.length != 0) {
    //   consumer.subscriptions.subscriptions[0].unsubscribe()
    // }
    const channel = consumer.subscriptions.create("ChatChannel", {
      received: (data) => {
        console.log("==received==", data)
        addMessage(data)
      },
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("==connected chatchannel==")
      },
      disconnected() {
        // Called when the subscription has been terminated by the server
        console.log("==disconnected chatchannel==")
      },
    })
    return channel
  }

  const addMessage = (data) => {
    setMessages([...messagesRef.current, data])
  }

  const fetchMessages = async (page = 1) => {
    setIsFetching(true)
    const res = await UserApi.fetchMessages(page)
    const data = await res.json
    if (res.ok) {
      setMessages([...data.messages.reverse(), ...messagesRef.current])
      setPagination(data.pagination_meta)
    } else {
      message.error(data.message)
    }
    setIsFetching(false)
  }

  return (
    <>
      <Helmet>
        <title>ChatRoom</title>
      </Helmet>
      <div className="flex flex-col flex-auto h-full p-6 items-center">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full w-full md:max-w-3xl lg:max-w-4xl">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <MessageList
                  messages={messages}
                  fetchMessages={fetchMessages}
                  isFetching={isFetching}
                  pagination={pagination}
                  setContent={setContent}
                />
              </div>
            </div>
            <Footer
              cable={consumer}
              subscribers={subscribers}
              content={content}
              setContent={setContent}
              chatChannel={chatChannel}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
