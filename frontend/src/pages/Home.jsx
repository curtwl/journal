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
    console.log(loginContext)
  
    // if user has a cookie, log them in on first render. TODO: refresh token
    useEffect(() => {
        async function tryToLoginWithCookie() {
            try {
                const user = await loginService.loginWithCookie()
                if (user) {
                  entriesService.setToken(user.token)
                  loginContext.setLoggedInUser( {username: user.username, id: user.id} )
                  console.log(user)
                } 
                } catch (error) {
                    console.error(error)   
            }
        }
        tryToLoginWithCookie()

        entriesService
        .getAllEntries()
        .then(intialEntries => {
          setJournalEntries(intialEntries)
        })
        .catch(error => console.log(error))
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
          <div className="relative">
          <Posts 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
          </div>
        </section>
        {notificationMessage.message &&<Notification />}
      </main>
    )
  }