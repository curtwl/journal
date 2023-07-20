import React from "react"
import { useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { LoginContext } from "../components/LoginWrapper"

const Header = () => {
  const loginContext = useContext(LoginContext)
  const { pathname } = useLocation()
  
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  return (
    <div className='header-container'>
      <div className='header-main'>
        <h1><Link to="/" className="header-link">Digital Journal</Link></h1>
        <h2>&nbsp;| {pathsForJSX[pathname]}</h2>
      </div>
      <div className='login'>
        {loginContext?.loggedInUser ? 
          <button id="logout-btn" onClick={() => loginContext.setLoggedInUser(null)}>Logout</button>
        :
          <Link to="/login">
            { loginContext?.loggedInUser ? 'Logout' : 'Log In' } 
          </Link>
        }

        <Link to={loginContext?.loggedInUser ? "/account" : "/signup"}>
          { loginContext?.loggedInUser ? loginContext.loggedInUser : 'Sign Up' }
        </Link>
      </div>
    </div>
)}
export default Header