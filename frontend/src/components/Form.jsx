import entriesService from '../services/entriesService'
import { useState, useContext } from 'react'
import { EditModalContext, NotificationContext } from "./ContextProvider"

const Form = ({journalEntries, setJournalEntries}) => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const editModalContext = useContext(EditModalContext)
  const { showSuccess, showError, clearNotification } = useContext(NotificationContext)

  const addEntry = async (event) => {
    event.preventDefault()
    
    const newEntry = {
      title: postTitle,
      content: postBody
    }

    try {
      const res = await entriesService.createEntry(newEntry)
      setJournalEntries(journalEntries.concat(res))
      showSuccess("Entry created!")
      setTimeout(() => clearNotification(), 3000)
    } catch (error) {
      console.error(error)
      showError("Could not create entry")
      setTimeout(() => clearNotification(), 3000)
    }

    setPostTitle('')
    setPostBody('')
  }

  return (
    <form className={`form ${editModalContext.editModal ? 'semi-transparent' : ''}`} onSubmit={addEntry}>
      <label htmlFor="post-title">Title:</label>
      <input id="post-title" value={postTitle} onChange={({ target }) => setPostTitle(target.value)} />
      <label htmlFor="post-body">Body:</label>
      <textarea id="post-body" value={postBody} onChange={({ target }) => setPostBody(target.value)} />
      <p>Use the form above to create a post.</p>
      <button className='submit-btn' type='submit'>Submit</button>
    </form>
  )
}

export default Form