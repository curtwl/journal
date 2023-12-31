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
          showSuccess("Your journal has been updated!")
          setEditedPostTitle('')
          setEditedPostBody('')
        } catch (error) {
          console.error(error)
          showError("Could not edit")
        }
        setTimeout(() => clearNotification(), 3000)
        
        const editModalTimeout = setTimeout(() => {
          editModalContext.closeModal()
        }, 500)
    }

    return (
      <div className="edit-modal">
        <div className="edit-modal-header">
          <button className="modal-close-btn" onClick={editModalContext.closeModal}>X</button>
          {/* <div className="modal-close-btn-container"> */}
          {/* </div> */}
            <h2>Edit your journal entry</h2>
        </div>
        <form className='edit-form' onSubmit={editEntry}>
            <label htmlFor="edit-post-title" className="title-label">Title:</label>
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
    )
}

export default EditForm