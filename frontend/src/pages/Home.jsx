import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import entriesService from '../services/entriesService'
import Form from '../components/Form'
import Posts from '../components/Posts'
import { LoginContext } from "../components/LoginWrapper"
import loginService from '../services/loginService'

export default function Home() {
    const [journalEntries, setJournalEntries] = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [entryToEdit, setEntryToEdit] = useState(null)

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
  
    const addEntry = async (event) => {
      event.preventDefault()
      
      const newEntry = {
        title: postTitle,
        content: postBody
      }
      console.log(newEntry)

      try {
        const res = await entriesService.createEntry(newEntry)
        setJournalEntries(journalEntries.concat(res))
      } catch (error) {
        console.error(error)
      }
  
      setPostTitle('')
      setPostBody('')
      // setJournalEntries(journalEntries.concat(newEntry))
      console.log(journalEntries)
    }
  
    const editEntryHandler = (entry) => {
      setEntryToEdit(entry)
      setEditModal(true)
    }
  
    const deleteEntryHandler = async (entry) => {
      const noteToDelete = await entriesService.deleteEntry(entry.id)
      console.log(noteToDelete)
      setJournalEntries(journalEntries.filter((e) => e.id !== entry.id))
  
    }
  
    return (
      <div>
        <Form 
          addEntry={addEntry}
          postTitle={postTitle}
          postBody={postBody}
          setPostTitle={setPostTitle}
          setPostBody={setPostBody}
        />
        <Posts 
          journalEntries={journalEntries}
          editEntryHandler={editEntryHandler}
          deleteEntryHandler={deleteEntryHandler} />
      </div>
    )
  }