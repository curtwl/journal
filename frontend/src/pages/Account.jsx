import React from "react"
import { useContext } from "react"
import { LoginContext } from "../components/ContextProvider"
import signupService from '../services/signupService'
import logoutService from '../services/logoutService'

export default function Account() {
    const loginContext = useContext(LoginContext)

    const deleteAccountHandler = () => {
        if (window.confirm('delete account?'))
        signupService.deleteAccount(loginContext.loggedInUser?.id)
        loginContext.setLoggedInUser(null)
        logoutService.logout()
    }
    console.log(loginContext.loggedInUser)
    return (
        <div>
            <h4>Change Account Settings for {loginContext.loggedInUser?.username}:</h4>
            <div className="delete-account">
              <button onClick={deleteAccountHandler}>Delete Account</button>
            </div>
        </div>
    )
}