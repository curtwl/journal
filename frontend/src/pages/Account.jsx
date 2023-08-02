import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext, NotificationContext } from "../components/ContextProvider"
import signupService from '../services/signupService'
import logoutService from '../services/logoutService'

export default function Account() {
    const loginContext = useContext(LoginContext)
    const { showSuccess, showError, clearNotification, notificationMessage } = useContext(NotificationContext)
    const navigate = useNavigate()

    const deleteAccountHandler = () => {
        if (window.confirm('delete account?'))
        signupService.deleteAccount(loginContext.loggedInUser?.id)
        showSuccess("Sorry to see you go!")
        setTimeout(() => clearNotification(), 5000)
        loginContext.setLoggedInUser(null)
        logoutService.logout()
        navigate('/')
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