import React from "react"
import { useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { LoginContext, EditModalContext } from "./ContextProvider"

const Header = ({ editModal }) => {
  const loginContext = useContext(LoginContext)
  const editModalContext = useContext(EditModalContext)
  const { pathname } = useLocation()
  
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  return (
    <header className={`header-container ${editModalContext.editModal ? 'semi-transparent' : ''}`}>
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
          { loginContext?.loggedInUser ? loginContext.loggedInUser.username : 'Sign Up' }
        </Link>
      </div>
    </header>
)}
export default Header