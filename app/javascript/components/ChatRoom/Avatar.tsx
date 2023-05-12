import React, { useState, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import currentUser from "stores/current_user_store"

interface AvatarProps {
  src: string
  nickname: string
  isSelf?: boolean
  setContent?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ src, nickname, setContent, isSelf = true }) => {
  const onMention = (close) => {
    setContent((prevPrompt) => `@${nickname} ${prevPrompt}`)
    close()
  }

  return (
    <>
      {!currentUser.isSignedIn() || isSelf ? (
        <img className="mt-1 inline-block h-10 w-10 rounded-full aspect-square" src={src} />
      ) : (
        <>
          <Popover className="relative mt-1">
            {({ open }) => (
              <>
                <Popover.Button className={`${open ? "" : "text-opacity-90"} outline-none inline-block h-10 w-10`}>
                  <img className="cursor-pointer rounded-full aspect-square mt-1" src={src} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/2 top-1/3 z-10 mt-2 px-4 pb-4 transform sm:px-0 w-max max-w-sm lg:max-w-3xl">
                    {({ close }) => (
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="bg-gray-50 p-2">
                          <button
                            type="button"
                            onClick={() => onMention(close)}
                            className="flow-root px-2 py-1 text-left w-full transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none"
                          >
                            <span className="block text-sm text-gray-600">@{nickname}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      )}
    </>
  )
}

export default Avatar
