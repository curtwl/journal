import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext, createContext } from 'react'
import entriesService from '../services/entriesService'
import Form from '../components/Form'
import Posts from '../components/Posts'
import Notification from "../components/Notification"
import { LoginContext, NotificationContext } from "../components/ContextProvider"
import loginService from '../services/loginService'

export default function Home() {
    const [journalEntries, setJournalEntries] = useState([])
    const { notificationMessage } = useContext(NotificationContext)

    const loginContext = useContext(LoginContext)
  
    const checkJWTExpiry = (token) => {
      const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
      const isExpired = Date.now() >= jwtPayload.exp * 1000;
    }
    // if user has a refresh cookie, try to log in with access token
    useEffect(() => {
      async function tryToRefreshToken() {
        try {
          const token = await loginService.refreshTokenAndLogin()
          if (token) {
            console.log(token, 'access token')
            entriesService.setToken(token[0])
            loginContext.setLoggedInUser( {username: token[1].username, id: token[1].id} )
            console.log(loginContext.loggedInUser)
          } 
          } catch (error) {
            console.error(error)   
          }
      }

      async function loadEntries() {
        try {
          const intialEntries = await entriesService.getAllEntries()
          setJournalEntries(intialEntries)
        } catch (error) {
          console.log(error)
        }
      }
      
      if (!loginContext.loggedInUser) {
        console.log('not logged in')
        tryToRefreshToken().then(() => {
          loadEntries()
        }
      )} else {
        
          loadEntries()
      }
        
        console.log(loginContext.loggedInUser)
        //loadEntries()
    }, [])

    return (
      <main>
        <section>
          <Form 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        </section>
        <section>
          <Posts 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        </section>
        {notificationMessage.message && <Notification />}
      </main>
    )
  }