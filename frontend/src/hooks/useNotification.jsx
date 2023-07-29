import { useState } from 'react'

export function useNotification() {
  const [notificationMessage, setNotificationMessage] = useState('')

  const showSuccess = (message) => {
    setNotificationMessage({ message, type: 'success' })
    console.log(notificationMessage)
}
  const showError = (message) =>
    setNotificationMessage({ message, type: 'error' })

  const clearNotification = () =>
    setNotificationMessage('')

  return { notificationMessage, showSuccess, showError, clearNotification }
}