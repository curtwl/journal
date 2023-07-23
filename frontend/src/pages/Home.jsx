import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext, createContext } from 'react'
import entriesService from '../services/entriesService'
import Form from '../components/Form'
import Posts from '../components/Posts'
import { LoginContext } from "../components/LoginWrapper"
import loginService from '../services/loginService'

const EntriesContext = createContext(null)

export default function Home() {
    const [journalEntries, setJournalEntries] = useState([])

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
          />
        </section>
        <section>
          <Posts 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        </section>
      </main>
    )
  }