import React from "react"
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoginContext, EditModalContext } from "./ContextProvider"
import logoutService from '../services/logoutService'

const Header = ({ editModal }) => {
  const loginContext = useContext(LoginContext)
  const editModalContext = useContext(EditModalContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  const logoutUser = async () => {
    await logoutService.logout()
    loginContext.setLoggedInUser(null)
    navigate('/')
  }

  return (
    <header onClick={editModalContext.closeModal}>
      <nav className={`header-container ${editModalContext.editModal ?
                      'semi-transparent' : ''}`}>
        <div className='header-main'>
          <h1 className="header-title"><Link to="/" className="header-link">Digital Journal&nbsp;</Link></h1>
          <h2>| {pathsForJSX[pathname]}</h2>
        </div>
        <div className='header-login'>
          {loginContext?.loggedInUser ? 
            <button id="logout-btn" onClick={logoutUser}>Logout</button>
          :
            <Link to="/login">
              { loginContext?.loggedInUser ? 'Logout' : 'Log In' } 
            </Link>
          }

            <Link to={loginContext?.loggedInUser ? "/account" : "/signup"} className="header-signup">
            { loginContext?.loggedInUser ? loginContext.loggedInUser.username : 'Sign Up' }
            </Link>
        </div>
      </nav>
    </header>
)}
export default Header