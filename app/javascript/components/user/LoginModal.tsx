import React, { Fragment, useRef, useState, useContext } from "react"
import { AppContext } from "components/AppContext"
import { Dialog, Transition } from "@headlessui/react"
import { message, Tooltip } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import * as UserApi from "shared/api/user"

interface LoginModalProps {
  isShow: boolean
}

const LoginModal: React.FC<LoginModalProps> = ({ isShow }) => {
  const nameRef = useRef(null)
  const [formErrors, setFormErrors] = useState([])
  const [mode, setMode] = useState("sign_up")
  const [nickname, setNickname] = useState("")
  const { setShowLoginModal } = useContext(AppContext)

  const onSignIn = async (e) => {
    e.preventDefault()
    const res = await UserApi.loginUser({
      username: e.target.elements.username.value,
    })
    const data = await res.json
    if (res.ok) {
      message.success("Login successful!")
      setShowLoginModal(false)
      gon.user_meta = data.user_meta
      localStorage.setItem("username", e.target.elements.username.value)
    } else {
      setFormErrors([data.message])
    }
  }

  const onSignUp = async (e) => {
    e.preventDefault()
    const res = await UserApi.registerUser({
      username: e.target.elements.username.value,
      nickname: nickname,
    })
    const data = await res.json
    if (res.ok) {
      message.success("Registration successful!")
      setShowLoginModal(false)
      gon.user_meta = data.user_meta
      localStorage.setItem("username", e.target.elements.username.value)
    } else {
      setFormErrors(data.message)
    }
  }

  const toggleMode = () => {
    setMode(mode === "sign_in" ? "sign_up" : "sign_in")
    setFormErrors([])
  }

  const onFetchFakeName = async () => {
    const res = await UserApi.fetchFakeName()
    const data = await res.json
    setNickname(data.name)
  }

  return (
    <Transition.Root show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={nameRef} onClose={() => setShowLoginModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 mx-8 w-full sm:max-w-lg">
                <section className="bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="flex items-center mb-6 text-2xl font-bold text-slate-700 dark:text-white">
                      ActionChat
                    </div>
                    {mode === "sign_up" ? (
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up to start chat
                          </h1>
                          <form className="space-y-4 md:space-y-6" onSubmit={onSignUp}>
                            <div>
                              <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                name="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Used for login"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="nickname"
                                className="flex items-center block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Nickname
                                <Tooltip title="Use a random name">
                                  <button
                                    type="button"
                                    onClick={onFetchFakeName}
                                    className="outline-none inline-flex ml-2 text-xs text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <ReloadOutlined />
                                  </button>
                                </Tooltip>
                              </label>
                              <input
                                type="text"
                                name="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Used for display"
                                required
                              />
                            </div>

                            {!!formErrors.length && (
                              <div className="text-orange-600 rounded relative" role="alert">
                                <ul>
                                  {formErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Sign up
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account?
                              <span
                                onClick={toggleMode}
                                className="ml-2 cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                Sign in
                              </span>
                            </p>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                          </h1>
                          <form className="space-y-4 md:space-y-6" onSubmit={onSignIn}>
                            <div>
                              <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Username
                              </label>
                              <input
                                type="username"
                                name="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                              />
                            </div>

                            {!!formErrors.length && (
                              <div className="text-orange-600 rounded relative" role="alert">
                                <ul>
                                  {formErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet?
                              <span
                                onClick={toggleMode}
                                className="ml-2 cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                Sign up
                              </span>
                            </p>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LoginModal
