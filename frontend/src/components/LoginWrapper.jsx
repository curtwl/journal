import React from "react"
import { useState, createContext } from 'react'

export const LoginContext = createContext(null)
export default function LoginWrapper({children}) {
    const [loggedInUser, setLoggedInUser] = useState(null)

    let value = { loggedInUser, setLoggedInUser }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}