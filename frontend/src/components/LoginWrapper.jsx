import React from "react"
import { useState, createContext } from 'react'

export const LoginContext = createContext(null)
export default function LoginWrapper({children}) {
    const [loggedIn, setLoggedIn] = useState(false)



    let value = { loggedIn, setLoggedIn };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}