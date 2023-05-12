import React, { Fragment, useState, createElement, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import currentUser from "stores/current_user_store"
import { message } from "antd"
import * as UserApi from "shared/api/user"

interface UserBarProps {}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const handleLogOut = async (e) => {
  e.preventDefault()
  const res = await UserApi.logoutUser()
  if (res.ok) {
    message.success("successfully logged out")
    setTimeout(() => {
      window.location.href = "/"
    }, 500)
  } else {
    message.success("error")
  }
}

const UserBar: React.FC<UserBarProps> = ({}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="outline-none">
          <img className="inline-block h-8 w-8 rounded-full" src={currentUser.avatarUrl()} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <form onSubmit={handleLogOut}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default UserBar
