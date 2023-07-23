import Form from "./Form"
import { useState } from 'react'
import entriesService from '../services/entriesService'

const EditForm = ({entryToEdit, editedPostTitle, setEditedPostTitle, editedPostBody, setEditedPostBody, journalEntries, setJournalEntries, editModal, setEditModal}) => {
    console.log(editedPostBody)

    const editEntry = async (event) => {
        event.preventDefault()
        
        const editedEntry = {
          title: editedPostTitle,
          content: editedPostBody
        }
        console.log(editedEntry)
    
        try {
          const res = await entriesService.updateEntry(entryToEdit.id, editedEntry)
          setJournalEntries(journalEntries.map(e => e.id === entryToEdit.id ? res : e))
        } catch (error) {
          console.error(error)
        }
    
        setEditedPostTitle('')
        setEditedPostBody('')

        setTimeout(() => setEditModal(null), 1000)
        console.log(journalEntries)
      }

    const closeModal = () => {
        setEditModal(null)
    }

    return (
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h2>Edit your journal entry</h2>
          <button className="modal-close-btn" onClick={closeModal}>Cancel</button>
        </div>
        <form className='form' onSubmit={editEntry}>
            <label htmlFor="post-title">Title:</label>
            <input id="post-title" value={editedPostTitle} onChange={({ target }) => setEditedPostTitle(target.value)} />
            <label htmlFor="post-body">Body:</label>
            <textarea id="post-body" value={editedPostBody} onChange={({ target }) => setEditedPostBody(target.value)} />
            <button type='submit'>Submit</button>
        </form>
      </div>
    )
}

export default EditForm