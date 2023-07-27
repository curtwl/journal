import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext, createContext } from 'react'
import entriesService from '../services/entriesService'
import Form from '../components/Form'
import Posts from '../components/Posts'
import Notification from "../components/Notification"
import { LoginContext } from "../components/ContextProvider"
import loginService from '../services/loginService'

const EntriesContext = createContext(null)

export default function Home() {
    const [journalEntries, setJournalEntries] = useState([])
    const [notificationMessage, setNotificationMessage] = useState('')

    const loginContext = useContext(LoginContext)
    console.log(loginContext)
  
    // if user has a cookie, log them in on first render. TODO: refresh token
    useEffect(() => {
        async function loginWithCookie() {
            try {
                const user = await loginService.login()
                if (user) {
                  entriesService.setToken(user.token)
                  loginContext.setLoggedInUser( {username: user.username, id: user.id} )
                  console.log(user)
                } 
                } catch (error) {
                    console.error(error)   
            }
        }
        loginWithCookie()
    }, [])

    useEffect(() => {
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
            setNotificationMessage={setNotificationMessage}
          />
        </section>
        <section>
          <div className="relative">
          <Posts 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
            setNotificationMessage={setNotificationMessage}
          />
          </div>
        </section>
        {notificationMessage.message &&<Notification 
          setNotificationMessage={setNotificationMessage}
          notificationMessage={notificationMessage}
        />}
      </main>
    )
  }