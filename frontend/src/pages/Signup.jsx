import React from "react"
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import signupService from '../services/signupService'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const addUser = async (event) => {
        console.log(username)
        event.preventDefault()
        const userObject = {
          username: username,
          password: password,
        }
    
        try {
            const user = await signupService.signup(userObject)
            console.log(user)
          } catch (error) {
            console.error(error)
          }
    }

    return (
      <form className='signup-form' onSubmit={addUser}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={({ target }) => 
            {
                console.log(username)
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