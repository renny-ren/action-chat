import React, { useState, useRef, useEffect, useContext } from "react"
import currentUser from "stores/current_user_store"
import { MentionsInput, Mention } from "react-mentions"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { AppContext } from "components/AppContext"

interface FooterProps {
  cable: any
  subscribers: any
  content: string
  setContent: () => void
  chatChannel: any
}

const Footer: React.FC<FooterProps> = ({ cable, subscribers, content, setContent, chatChannel }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef(null)
  const { setShowLoginModal } = useContext(AppContext)

  useEffect(() => {
    if (content) inputRef.current.focus()
  }, [content])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("subs", cable.subscriptions)
    if (!content) return

    chatChannel.send({
      content: content,
    })

    setContent("")
    setShowEmojiPicker(false)
    inputRef.current.blur()
  }

  const checkKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.shiftKey) {
        // document.execCommand("insertHTML", false, "<br/><br/>")
      } else {
        handleSubmit(e)
      }
    }
  }

  const handleContentChange = (e, newValue, newPlainTextValue, mentions) => {
    setContent(newPlainTextValue)
  }

  const onMention = (id, display) => {}

  const onClickOutside = (e) => {
    if (e.target.tagName.toLowerCase() === "div") {
      setShowEmojiPicker(false)
    }
  }

  const onEmojiSelect = (item) => {
    inputRef.current.focus()
    setContent(content.concat(item.native))
  }

  const getIconStrokeColor = () => {
    if (document.documentElement.classList.contains("dark")) {
      return content ? "#cdcdcd" : "currentColor"
    } else {
      return content ? "currentColor" : "#cdcdcd"
    }
  }

  return (
    <>
      <div className="flex flex-row items-center h-16 rounded-xl w-full px-4">
        {showEmojiPicker && (
          <div className="pl-2 pb-px lg:mx-auto lg:max-w-3xl">
            <Picker
              data={data}
              onEmojiSelect={onEmojiSelect}
              onClickOutside={onClickOutside}
              locale="zh"
              previewPosition="none"
            />
          </div>
        )}
        <form className="flex-1" onSubmit={handleSubmit}>
          <div className="relative flex h-full flex-1 flex-col">
            {currentUser.isSignedIn() ? (
              <div className="flex flex-col justify-center w-full py-2 flex-grow md:pl-2 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="flex items-center absolute gap-1.5">
                  <button
                    className="z-10 ml-2 md:ml-1 md:hover:bg-gray-100 dark:hover:bg-gray-900 outline-none"
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M512 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z m0-853.333333C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z"
                        fill={showEmojiPicker ? "#8a8a8a" : "#bfbfbf"}
                      ></path>
                      <path
                        d="M640 469.333333c36.266667 0 64-27.733333 64-64s-27.733333-64-64-64-64 27.733333-64 64 29.866667 64 64 64M384 469.333333c36.266667 0 64-27.733333 64-64s-27.733333-64-64-64-64 27.733333-64 64 29.866667 64 64 64M512 725.333333c78.933333 0 151.466667-38.4 194.133333-104.533333 12.8-19.2 8.533333-46.933333-12.8-59.733333-19.2-12.8-46.933333-8.533333-59.733333 12.8-25.6 40.533333-72.533333 66.133333-121.6 66.133333s-96-25.6-123.733333-66.133333c-12.8-19.2-40.533333-25.6-59.733334-12.8-19.2 12.8-25.6 40.533333-12.8 59.733333 44.8 66.133333 117.333333 104.533333 196.266667 104.533333"
                        fill={showEmojiPicker ? "#8a8a8a" : "#bfbfbf"}
                      ></path>
                    </svg>
                  </button>
                </div>
                <MentionsInput
                  className="mentions"
                  inputRef={inputRef}
                  placeholder=""
                  style={{
                    input: {
                      maxHeight: "13rem",
                      margin: 0,
                      width: "100%",
                      resize: "none",
                      borderWidth: 0,
                      backgroundColor: "initial",
                      padding: "0 1.75rem 0 2rem",
                      boxShadow: "none",
                      outline: "2px solid #0000",
                    },
                    highlighter: {
                      border: 0,
                    },
                  }}
                  value={content}
                  onChange={handleContentChange}
                  onKeyDown={checkKeyPress}
                  forceSuggestionsAboveCursor={true}
                >
                  <Mention
                    trigger="@"
                    displayTransform={(id, display) => `@${display}`}
                    appendSpaceOnAdd={true}
                    data={(search) =>
                      subscribers
                        .filter((user) => user.id != currentUser.id())
                        .filter((user) => !user.nickname.startsWith("visitor"))
                        .filter((user) => user.nickname.toLowerCase().indexOf(search.toLowerCase()) != -1)
                        .map((user) => ({ id: user.id, display: user.nickname }))
                    }
                    onAdd={onMention}
                  />
                </MentionsInput>
                <button
                  type="submit"
                  className="absolute p-1 rounded-md text-gray-500 right-1 md:right-2 md:hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent outline-none"
                >
                  <svg
                    stroke={getIconStrokeColor()}
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onClick={() => setShowLoginModal(true)}
                className="cursor-pointer flex flex-col w-full py-2 flex-grow md:pl-2 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-sm"
              >
                <div className="flex h-6 w-full items-center pl-2 pr-3 text-sm text-zinc-500 transition dark:bg-white/5 dark:text-zinc-400 focus:[&amp;:not(:focus-visible)]:outline-none">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-5 w-5 fill-zinc-500/10 stroke-zinc-500 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 16.5c4.142 0 7.5-3.134 7.5-7s-3.358-7-7.5-7c-4.142 0-7.5 3.134-7.5 7 0 1.941.846 3.698 2.214 4.966L3.5 17.5c2.231 0 3.633-.553 4.513-1.248A8.014 8.014 0 0 0 10 16.5Z"
                    ></path>
                    <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.5h5M8.5 11.5h3"></path>
                  </svg>
                  <span className="pl-1">Start chat</span>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Footer
