import { useState, useEffect } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Posts from './components/Posts'
import entriesService from './services/entriesService'
//import { BrowserRouter, Routes, Route } from "react-router-dom"
//(<Route path="/edit/:id" element={<Edit />})

const App = () => {
  const [journalEntries, setJournalEntries] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editModal, setEditModal] = useState(false)
  const [entryToEdit, setEntryToEdit] = useState(null)

  useEffect(() => {
    entriesService
      .getAllEntries()
      .then(intialEntries => {
        setJournalEntries(intialEntries)
      })
      .catch(error => console.log(error))

  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    console.log('t')
    const newEntry = {
      title: postTitle,
      content: postBody
    }
    
    entriesService
      .createEntry(newEntry)
      .then((res) => setJournalEntries(journalEntries.concat(res)))

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
      <Header />
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

export default App
