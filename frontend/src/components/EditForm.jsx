import { useContext } from 'react'
import entriesService from '../services/entriesService'
import { EditModalContext, NotificationContext } from "./ContextProvider"

const EditForm = ({entryToEdit, editedPostTitle, setEditedPostTitle, editedPostBody, setEditedPostBody, journalEntries, setJournalEntries, setNotificationMessage}) => {
    console.log(editedPostBody)
    const editModalContext = useContext(EditModalContext)
    const { showSuccess, showError, clearNotification } = useContext(NotificationContext)

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
          showError("Could not edit")
          setTimeout(() => clearNotification(), 3000)
        }
    
        setEditedPostTitle('')
        setEditedPostBody('')
        showSuccess("Your journal has been updated!")
        
        const editModalTimeout = setTimeout(() => {
          editModalContext.closeModal()
        }, 500)

        setTimeout(() => {
          clearNotification()
          clearTimeout(editModalTimeout)
        }, 3000)
        console.log(journalEntries)
      }

    return (
      <div className="edit-modal">
        <button className="modal-close-btn" onClick={editModalContext.closeModal}>X</button>
        <div className="edit-modal-container">
          {/* <div className="modal-close-btn-container"> */}
          {/* </div> */}
          <h2 className="edit-modal-header">Edit your journal entry</h2>
          <form className='edit-form' onSubmit={editEntry}>
            <label htmlFor="edit-post-title">Title:</label>
            <input 
              id="edit-post-title" 
              className='edit-post-title'
              value={editedPostTitle} 
              onChange={({ target }) => setEditedPostTitle(target.value)} />
            <label htmlFor="edit-post-body" className="body-label">Body:</label>
            <textarea 
              id="edit-post-body"
              className='edit-post-body'
              value={editedPostBody} 
              onChange={({ target }) => setEditedPostBody(target.value)} />
            <button className='edit-submit-btn' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
}

export default EditForm