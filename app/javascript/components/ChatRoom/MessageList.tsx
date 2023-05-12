import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import currentUser from "stores/current_user_store"
import Avatar from "./Avatar"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { Spin, Tooltip } from "antd"

interface MessageListProps {
  messages: []
  fetchMessages: () => void
  isFetching: boolean
  pagination: Object
  setContent: () => void
}

const MessageList: React.FC<MessageListProps> = ({ messages, fetchMessages, isFetching, pagination, setContent }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const scrollableRootRef = useRef<HTMLDivElement | null>(null)
  const lastScrollDistanceToBottomRef = useRef<number>()
  const messagesEndRef = useRef(null)

  const isSelf = (message) => {
    if (currentUser.isSignedIn()) {
      return currentUser.id() === message.user_id
    } else {
      return false
    }
  }

  const fetchMoreData = () => {
    const nextPage = currentPage + 1
    fetchMessages(nextPage)
    setCurrentPage(nextPage)
  }

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: pagination.current < pagination.total && currentPage <= 20,
    onLoadMore: fetchMoreData,
    rootMargin: "400px 0px 0px 0px",
  })

  // Keep the scroll position when new items are added.
  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom
    }
  }, [messages, rootRef])

  useEffect(() => {
    // scrollToBottom()
  }, [messages])

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node)
      scrollableRootRef.current = node
    },
    [rootRef]
  )

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <div
        className="message-list-container overflow-auto"
        style={{ scrollbarGutter: "stable both-edges" }}
        ref={rootRefSetter}
        onScroll={handleRootScroll}
      >
        <div className="sentry text-center" ref={infiniteRef}>
          {isFetching && <Spin />}
        </div>
        <div className="grid grid-cols-12 gap-y-2 overflow-hidden">
          {messages.map((message, i) => {
            return isSelf(message) ? (
              <div key={i} className="col-start-2 md:col-start-4 col-end-13 p-3 rounded-lg">
                <div className="flex items-start justify-start flex-row-reverse">
                  <Avatar src={currentUser.avatarUrl()} />
                  <div className="relative flex flex-col gap-1 items-end max-w-[82%] md:max-w-full">
                    <div className="flex items-baseline mr-3">
                      <div className="text-sm font-medium dark:text-white">{message.user_nickname}</div>
                      <p className="text-xs text-gray-500 ml-2">{message.created_at}</p>
                    </div>
                    <div className="relative mr-2 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-full break-words">
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="col-start-1 col-end-12 md:col-end-10 p-3 rounded-lg">
                <div className="flex flex-row items-start">
                  <Avatar
                    src={message.user_avatar_url}
                    nickname={message.user_nickname}
                    setContent={setContent}
                    isSelf={false}
                  />
                  <div className="relative flex flex-col gap-1 max-w-[98%]">
                    <div className="flex items-baseline">
                      <div className="text-sm font-medium ml-3 dark:text-white">{message.user_nickname}</div>
                      <p className="text-xs text-gray-500 ml-2">{message.created_at}</p>
                    </div>
                    <div className="relative ml-2 mr-4 text-sm bg-white py-2 px-4 shadow rounded-xl break-words whitespace-pre-line max-w-max">
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div ref={messagesEndRef}></div>
        <div className="w-full h-2 sm:h-6 flex-shrink-0"></div>
      </div>
    </>
  )
}

export default MessageList
