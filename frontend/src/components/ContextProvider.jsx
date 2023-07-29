import React from "react"
import { useState, createContext } from 'react'

export const LoginContext = createContext(null)
export const EditModalContext = createContext(null)
export const NotificationContext = createContext(null)

export default function ContextProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const loginContextValue  = { loggedInUser, setLoggedInUser }


    const [editModal, setEditModal] = useState(null)
    const closeModal = () => {
      setEditModal(null)
    }
    const editModalContextValue = { editModal, setEditModal, closeModal }


    const [notificationMessage, setNotificationMessage] = useState('')
    const showSuccess = (message) => {
      setNotificationMessage({ message, type: 'success' })
      console.log(notificationMessage)
  }
    const showError = (message) =>
      setNotificationMessage({ message, type: 'error' })
    const clearNotification = () =>
      setNotificationMessage('')
    const notificationContextValue = { notificationMessage, setNotificationMessage,
                                       showSuccess, showError, clearNotification}

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      <LoginContext.Provider value={loginContextValue}>
        <EditModalContext.Provider value={editModalContextValue}>
          {children}
        </EditModalContext.Provider>
      </LoginContext.Provider>
    </NotificationContext.Provider>
  )
}