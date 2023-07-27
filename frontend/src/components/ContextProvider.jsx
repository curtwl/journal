import React from "react"
import { useState, createContext } from 'react'

export const LoginContext = createContext(null)
export const EditModalContext = createContext(null)

export default function ContextProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const loginContextValue  = { loggedInUser, setLoggedInUser }

    const [editModal, setEditModal] = useState(false)
    const editModalContextValue = { editModal, setEditModal }

  return (
    <LoginContext.Provider value={loginContextValue}>
      <EditModalContext.Provider value={editModalContextValue}>
        {children}
      </EditModalContext.Provider>
    </LoginContext.Provider>
  )
}