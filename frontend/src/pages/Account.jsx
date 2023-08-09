import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext, NotificationContext } from "../components/ContextProvider"
import signupService from '../services/signupService'
import logoutService from '../services/logoutService'
import Notification from "../components/Notification"
export default function Account() {
    const loginContext = useContext(LoginContext)
    const { showSuccess, showError, clearNotification, notificationMessage } = useContext(NotificationContext)
    const navigate = useNavigate()

    // TODO: update to use access token
    const deleteAccountHandler = async () => {
      if (window.confirm('delete account?')) 
        try {
          await signupService.deleteAccount(loginContext.loggedInUser?.id)
          showSuccess("Sorry to see you go!")
          setTimeout(() => clearNotification(), 5000)
          loginContext.setLoggedInUser(null)
          await logoutService.logout()
          navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h4>Change Account Settings for {loginContext.loggedInUser?.username}:</h4>
            <div className="delete-account">
              <button onClick={deleteAccountHandler}>Delete Account</button>
            </div>
            {notificationMessage.message && <Notification />}
        </div>
    )
}