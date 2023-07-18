import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from "./components/Layout"
import LoginContext from "./components/LoginWrapper"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <LoginContext>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </LoginContext>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);