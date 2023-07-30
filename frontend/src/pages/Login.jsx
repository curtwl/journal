import React from "react"
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import loginService from '../services/loginService'
import entriesService from '../services/entriesService'
import { LoginContext, NotificationContext } from "../components/ContextProvider"
import Notification from "../components/Notification"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginContext = useContext(LoginContext)
    const { showSuccess, showError, clearNotification, notificationMessage } = useContext(NotificationContext)
    const navigate = useNavigate()

    const loginUser = async (event) => {
        event.preventDefault()
        const userObject = {
          username: username,
          password: password,
        }
        console.log(userObject)
    
        try {
            const user = await loginService.login(userObject)
            if (!user)
              throw new Error('Username or password incorrect')
            entriesService.setToken(user.token)
            showSuccess('Logged in successfully!')
            loginContext.setLoggedInUser( {username: user.username, id: user.id} )
            navigate('/')
          } catch (error) {
            showError('Username or password incorrect')
            console.error(error)
          }
          setTimeout(() => clearNotification(), 3000)
    }

    return (
        <>
          <form className='signup-form' onSubmit={loginUser}>
              <label htmlFor="username">Username</label>
              <input id="username" spellCheck="false" autoCapitalize="none" autoComplete="off"
              type="text" value={username} onChange={({ target }) => 
                  {
                      setUsername(target.value.trim())
                  } 
              }/>
              
              <label htmlFor="password">Password:</label>
              <input id="password" spellCheck="false" autoCapitalize="none" type="password"
              value={password} onChange={({ target }) => setPassword(target.value)} />
              <p>{ loginContext?.loggedInUser ? `Logged in! Welcome ${loginContext.loggedInUser.username}`
                : 'Login to create journals!'}</p>
              <button type='submit'>Submit</button>
          </form>
          {notificationMessage.message && <Notification />}
        </>
    )
}