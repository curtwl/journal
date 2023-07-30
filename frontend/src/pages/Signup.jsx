import React from "react"
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { LoginContext } from "../components/ContextProvider"
import signupService from '../services/signupService'
import loginService from '../services/loginService'
import entriesService from '../services/entriesService'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const loginContext = useContext(LoginContext)

    const addUser = async (event) => {
        console.log(username)
        event.preventDefault()
        const userObject = {
          username: username,
          password: password,
        }

        let user = null
        try {
            user = await signupService.signup(userObject)
          } catch (error) {
            // error notification
            console.error(error)
          }
  
        if (user) {
          try {
              const newUser = await loginService.login(userObject)
              entriesService.setToken(user.token)
              loginContext.setLoggedInUser( {username: user.username, id: user.id} )
              navigate('/')
            } catch (error) {
              console.error(error)
            }
          }
    }

    return (
      <form className='signup-form' onSubmit={addUser}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={({ target }) => 
            {
                setUsername(target.value)
            } 
        }/>
        
        <label htmlFor="password">Password:</label>
        <input id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <p>Sign up to create journals!</p>
        <button type='submit'>Submit</button>
      </form>
    )
}