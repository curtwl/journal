import EditForm from './EditForm'
import entriesService from '../services/entriesService'
import { useState, useContext } from 'react'
import { EditModalContext, LoginContext, NotificationContext } from "./ContextProvider"

const Posts = ({journalEntries, setJournalEntries}) => {
  const [entryToEdit, setEntryToEdit] = useState(null)
  const [editedPostTitle, setEditedPostTitle] = useState('')
  const [editedPostBody, setEditedPostBody] = useState('')
  const editModalContext = useContext(EditModalContext)
  const loginContext = useContext(LoginContext)
  const { showSuccess, showError, clearNotification } = useContext(NotificationContext)

  const editEntryHandler = (entry) => {
    setEntryToEdit(entry)
    setEditedPostTitle(entry.title)
    setEditedPostBody(entry.content)
    console.log(entry)
    editModalContext.setEditModal(true)
  }

  const deleteEntryHandler = async (entry) => {
    try {
      const noteToDelete = await entriesService.deleteEntry(entry.id)
      console.log(noteToDelete)
      showSuccess("Journal entry deleted successfully")
      setTimeout(() => clearNotification(), 3500)
      setJournalEntries(journalEntries.filter((e) => e.id !== entry.id))
    } catch (error) {
        console.error(error)
        if (error.response?.status === 401) {
          showError("You can only delete your own entries")
        } else {
          showError("Server error. Please try again!")
        }
        setTimeout(() => clearNotification(), 3500)
      }
    }

  const postsHTML = journalEntries.reverse().map((entry) => (
    <div className={`posts-container-element ${editModalContext.editModal ?
                    'semi-transparent' : ''}`} key={entry.id} >
      <div className="title">{entry.title}</div>
      <div className="content">{entry.content}</div>
      <div className="edit-delete">
        <button className="edit" type='submit' onClick={() => editEntryHandler(entry)}>Edit</button> 
        <button className="delete" type='submit' onClick={() => deleteEntryHandler(entry)}>Delete</button>
      </div>
    </div>
  ))

  console.log(entryToEdit)
  return (
    <>
    <div className={`posts-container ${editModalContext.editModal ? 'semi-transparent' : ''}`}>
      {postsHTML}

    </div>
    {editModalContext.editModal && <EditForm 
                        journalEntries={journalEntries}
                        setJournalEntries={setJournalEntries}
                        entryToEdit={entryToEdit}
                        editedPostTitle={editedPostTitle}
                        setEditedPostTitle={setEditedPostTitle}
                        editedPostBody={editedPostBody}
                        setEditedPostBody={setEditedPostBody}
                      />}
    </>
  )
}

export default Posts
