import React from "react"
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

const addUser = () => {
    console.log('test')
}

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
      <form className='signup-form' onSubmit={addUser}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor="password">Password:</label>
        <textarea id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <p>Sign up to create journals!</p>
        <button type='submit'>Submit</button>
      </form>
    )
}