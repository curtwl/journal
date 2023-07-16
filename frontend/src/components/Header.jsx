import React from "react"
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { LoginContext } from "../components/LoginWrapper"

// change h2 to ${current route}
const Header = (props) => {
const loginContext = useContext(LoginContext)
 return (
  <div className='header-container'>
    <div className='header-main'>
      <h1><Link to="/" className="header-link">Digital Journal</Link></h1>
      <h2>&nbsp;| Create A Note</h2>
    </div>
    <div className='login'>
      <Link to="/login">{ loginContext?.loggedIn ? 'Logout' : 'Log In' } </Link>
      <Link to="/signup">{ loginContext?.loggedIn ? '' : 'Sign Up' }</Link>
    </div>
  </div>
)}
export default Header