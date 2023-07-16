import React from "react"
import { Link } from "react-router-dom"

// change h2 to ${current route}
const Header = (props) => (
  <div className='header-container'>
    <div className='header-main'>
      <h1><Link to="/" className="header-link">Digital Journal</Link></h1>
      <h2>&nbsp;| Create A Note</h2>
    </div>
    <div className='login'>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
)

export default Header