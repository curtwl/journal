import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext, createContext } from 'react'
import entriesService from '../services/entriesService'
import { setToken, isJWTExpired } from '../utils/tokenHelper'
import Form from '../components/Form'
import Posts from '../components/Posts'
import Notification from "../components/Notification"
import { LoginContext, NotificationContext } from "../components/ContextProvider"
import loginService from '../services/loginService'

export default function Home() {
    const [journalEntries, setJournalEntries] = useState([])
    const { notificationMessage, clearNotification } = useContext(NotificationContext)

    const loginContext = useContext(LoginContext)
  
    // if user has a refresh cookie, try to log in with access token
    useEffect(() => {
      async function tryToRefreshToken() {
        try {
          const token = await loginService.refreshTokenAndLogin()
          if (token) {
            setToken(token[0])
            loginContext.setLoggedInUser( {username: token[1].username, id: token[1].id} )
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
        tryToRefreshToken().then(() => {
          loadEntries()
        }
      )} else {       
          loadEntries()
      }
      return () => {
        clearNotification()
      }
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