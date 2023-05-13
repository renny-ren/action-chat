import React, { useEffect, useState, useContext } from "react"
import currentUser from "stores/current_user_store"
import UserBar from "./user/UserBar"
import { AppContext } from "./AppContext"
import { Avatar } from "antd"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { setShowLoginModal, subscribers } = useContext(AppContext)

  return (
    <>
      <header>
        <div className="hidden lg:flex">
          <a aria-label="Home" href="/"></a>
        </div>
        <div className="fixed inset-x-0 top-0 z-50 flex h-12 md:h-14 items-center justify-between gap-12 px-4 transition sm:px-6 bg-white">
          <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/[.075] dark:bg-white/[.075]"></div>
          <div className="flex items-center">
            <div className="text-slate-700 font-bold">ActionChat</div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:block"></nav>
            <div className="flex items-center">
              {subscribers.length > 1 && (
                <Avatar.Group
                  size="small"
                  maxCount={2}
                  maxStyle={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.5)", fontSize: "12px", borderRadius: "4px" }}
                >
                  {subscribers.map((user, i) => {
                    if (i > 1) {
                      return (
                        <div key={i}>
                          <Avatar shape="square" src={user.avatar_url} />
                          <span className="text-zinc-600 ml-1">{user.nickname}</span>
                          {i === subscribers.length - 1 && (
                            <div className="border-t border-gray-200 mt-2 pt-1 text-xs text-gray-400">
                              Current online members: {subscribers.length}
                            </div>
                          )}
                        </div>
                      )
                    } else {
                      return <Avatar key={i} shape="square" src={user.avatar_url} />
                    }
                  })}
                </Avatar.Group>
              )}
            </div>
            <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
            <div className="text-gray-600">{currentUser.nickname()}</div>
            <div>
              {currentUser.isSignedIn() ? (
                <UserBar />
              ) : (
                <div
                  className="cursor-pointer inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
