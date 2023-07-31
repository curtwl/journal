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
        <div className="edit-modal-header">
          {/* <div className="modal-close-btn-container"> */}
          <button className="modal-close-btn" onClick={editModalContext.closeModal}>X</button>
          {/* </div> */}
            <h2>Edit your journal entry</h2>
        </div>
        <form className='edit-form' onSubmit={editEntry}>
            <label htmlFor="post-title">Title:</label>
            <input id="post-title" value={editedPostTitle} onChange={({ target }) => setEditedPostTitle(target.value)} />
            <label htmlFor="post-body">Body:</label>
            <textarea id="post-body" value={editedPostBody} onChange={({ target }) => setEditedPostBody(target.value)} />
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
      </div>
    )
}

export default EditForm