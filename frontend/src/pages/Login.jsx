import React from "react"
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import loginService from '../services/loginService'
import { setToken } from '../utils/tokenHelper'
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
    
        try {
            const user = await loginService.login(userObject)
            if (!user)
              throw new Error('Username or password incorrect')
            setToken(user.accessToken)
            showSuccess('Logged in successfully!')
            loginContext.setLoggedInUser( {username: user.username, id: user.id} )
            navigate('/')
          } catch (error) {
            showError('Username or password incorrect')
          }
          setTimeout(() => clearNotification(), 3000)
    }

    return (
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={loginUser}>
            <p><strong>Login</strong> to create journals!</p>
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
            <button className='submit-btn' type='submit'>Login</button>
          </form>
          {notificationMessage.message && <Notification />}
        </div>
    )
}