import { useEffect, useContext } from "react"
import { NotificationContext } from "./ContextProvider"

const Notification = () => {
  const { notificationMessage, clearNotification } = useContext(NotificationContext)

  useEffect(() => {
    setTimeout(() => clearNotification, 3000)
  }, [])

    if (notificationMessage.message === '') {
      return null
    }
    else if (notificationMessage.type === 'success') {
      return (
        <div className='notification success'>✅ {notificationMessage.message}</div>
      )
    }
    else {
      return (
        <div className='notification error'>❌ {notificationMessage.message}</div>
      )
       
    }
  }
  
  export default Notification