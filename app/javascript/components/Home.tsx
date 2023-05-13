import React, { Fragment, useState, useEffect, useContext } from "react"
import ChatRoom from "./ChatRoom"
import Header from "./Header"
import { Helmet } from "react-helmet"

const Home = ({}) => {
  return (
    <>
      <Header />
      <div className="h-full relative pt-12 md:pt-14">
        <main className="h-full">
          <ChatRoom />
        </main>
      </div>
    </>
  )
}

export default Home
