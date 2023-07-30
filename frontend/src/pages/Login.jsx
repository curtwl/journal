import React from "react"
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import loginService from '../services/loginService'
import entriesService from '../services/entriesService'
import { LoginContext } from "../components/ContextProvider"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [loggedInUser, setLoggedInUser] = useState('')

    const loginContext = useContext(LoginContext)
    console.log(loginContext)
    const navigate = useNavigate()

    const loginUser = async (event) => {
        console.log(username)
        event.preventDefault()
        const userObject = {
          username: username,
          password: password,
        }

        console.log(userObject)
    
        try {
            const user = await loginService.login(userObject)
            if (user) {
              entriesService.setToken(user.token)
              loginContext.setLoggedInUser( {username: user.username, id: user.id} )
              navigate('/')
          }
            console.log(user)
            // console.log(document.cookie, 'cookie')
          } catch (error) {
            console.error(error)
          }
    }

    return (
        
        <form className='signup-form' onSubmit={loginUser}>
            <label htmlFor="username">Username</label>
            <input id="username" spellCheck="false" autoCapitalize="none" autoComplete="off"
            type="text" value={username} onChange={({ target }) => 
                {
                    console.log(username)
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
    )
}