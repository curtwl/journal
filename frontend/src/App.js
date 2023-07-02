import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Posts from './components/Posts'

const App = () => {
  //const journalEntries = new Array(5).fill(0)
  const [journalEntries, setJournalEntries] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('t')
    const newEntry = {
      title: postTitle,
      body: postBody
    }
  
    setJournalEntries(journalEntries.concat(newEntry))
    console.log(journalEntries)
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
      <Posts journalEntries={journalEntries} />
    </div>
  );
}

export default App
