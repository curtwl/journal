import React from "react"
import { useContext } from "react"
import { LoginContext } from "../components/LoginWrapper"

export default function Account() {
    const loginContext = useContext(LoginContext)
    return (
        <div>
            Change Account Settings for {loginContext.loggedInUser}
        </div>
    )
}